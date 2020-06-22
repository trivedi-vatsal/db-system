import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-dbs',
  templateUrl: './dbs.component.html',
  styleUrls: ['./dbs.component.css']
})
export class DbsComponent implements OnInit {

  list: any;
  currentIndex = -1;
  newDB = '';
  isDisabled = false;

  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    this.retrieveDbs();
  }

  retrieveDbs() {
    this.dbService.getAll().subscribe(data => {
      this.list = data;
      console.log(this.list);
    },
      error => {
        console.log(error);
      });
  }

  setDB(item: any) {
    this.router.navigate(['/tb', item.datname]);
  }

  deleteDB(item) {
    const r = confirm(`Are you sure to delete "${item.datname}" database ?`);
    if (r) {
      this.dbService.deleteDB(item.datname).subscribe((s) => {
        console.log(s);
        this.retrieveDbs();
      });
    }
  }

  addDB() {
    this.isDisabled = true;
    const name = this.newDB.replace(/\s/g, '');
    this.dbService.createDB(name).subscribe(data => {
      console.log(data);
      this.retrieveDbs();
      this.newDB = '';
      this.isDisabled = false;
    },
      error => {
        console.log(error);
        this.newDB = '';
        this.isDisabled = false;
      });
  }
}
