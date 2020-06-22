const pgp = require("pg-promise")();

exports.findAll = (req, res) => {
  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
  );
  db.any(
    "SELECT oid, datname, datistemplate  FROM pg_database WHERE datistemplate = $1",
    [false]
  )
    .then((data) => {
      //console.log("DATA:", data);
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};

exports.createDB = (req, res) => {
  console.log(req.body.db)
  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
  );
  if (!req.body.db) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let dbName = req.body.db;
  let query = `CREATE DATABASE "${dbName}"`;
  db.none(query)
    .then((data) => {
      console.log("DATA:", data);
      res.status(200).send({
        message: "DB Created",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the DB.",
      });
    })
    .finally(db.$pool.end);
};

exports.deleteDB = (req, res) => {
  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
  );
  if (!req.params.q) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let dbName = req.params.q;
  db.task((t) => {
    return t
      .oneOrNone(
        "UPDATE pg_database SET datallowconn = 'false' WHERE datname = $1;",
        dbName
      )
      .then(() => {
        return t.any(
          "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1;",
          dbName
        );
      });
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the DB.",
    });
    return;
  });
  db.none("DROP DATABASE $1:name", [dbName])
    .then((data) => {
      //console.log("DATA:", data);
      res.status(200).send({
        message: "DB Deleted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Deleting the DB.",
      });
    })
    .finally(db.$pool.end);
};

exports.getTables = (req, res) => {
  if (!req.params.q) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.params.q}`
  );

  db.func("version").catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while create table DB",
    });
    return;
  });

  db.any(
    "SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'"
  )
    .then((data) => {
      //console.log("DATA:", data);
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};

exports.createTable = (req, res) => {
  if (!req.body.table || !req.body.db) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.body.db}`
  );

  db.func("version").catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while create table DB",
    });
  });

  let query = `CREATE TABLE ${req.body.table} ()`;
  db.none(query)
    .then((data) => {
      res.status(200).send({
        message: "Table Created",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};

exports.deleteTable = (req, res) => {
  if (!req.body.table || !req.body.db) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.body.db}`
  );

  db.func("version").catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while create table DB",
    });
    return;
  });

  let query = `DROP TABLE ${req.body.table}`;
  db.none(query)
    .then((data) => {
      res.status(200).send({
        message: "Table Deleted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
  return;
};

exports.getColumn = (req, res) => {
  if (!req.params.db || !req.params.table) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.params.db}`
  );

  db.func("version").catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while create table DB",
    });
    return;
  });

  let query = `select column_name,data_type,ordinal_position from information_schema.columns where table_name = '${req.params.table}'`;
  db.any(query)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};

exports.createColumn = (req, res) => {
  if (
    !req.body.db ||
    !req.body.table ||
    !req.body.columnName ||
    !req.body.columnType
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.body.db}`
  );

  db.func("version")
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while create table DB",
      });
      return;
    })
    .finally(db.$pool.end);

  let query = `ALTER TABLE "${req.body.table}" ADD ${req.body.columnName} ${req.body.columnType}`;
  db.any(query)
    .then((data) => {
      res.status(200).send({
        message: "Column Created",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};

exports.deleteColumn = (req, res) => {
  if (!req.body.db || !req.body.table || !req.body.columnName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const db = pgp(
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${req.body.db}`
  );

  db.func("version").catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while create table DB",
    });
    return;
  });

  let query = `ALTER TABLE "${req.body.table}" DROP COLUMN ${req.body.columnName}`;
  db.any(query)
    .then((data) => {
      res.status(200).send({
        message: "Column Deleted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching DB",
      });
    })
    .finally(db.$pool.end);
};
