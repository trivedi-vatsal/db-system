module.exports = (app) => {
  const dbs = require("../controllers/db.controller.js");
  var router = require("express").Router();

  router.get("/", dbs.findAll);

  router.post("/createDB", dbs.createDB);

  router.delete("/deleteDB/:q", dbs.deleteDB);

  router.get("/getTable/:q", dbs.getTables);

  router.post("/createTable", dbs.createTable);

  router.delete("/deleteTable", dbs.deleteTable);

  router.get("/getColumn/:db/:table", dbs.getColumn);

  router.post("/createColumn", dbs.createColumn);

  router.delete("/deleteColumn", dbs.deleteColumn);

  app.use("/api/dbs", router);
};
