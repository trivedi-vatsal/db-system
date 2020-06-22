import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-tbs',
  templateUrl: './tbs.component.html',
  styleUrls: ['./tbs.component.css']
})
export class TbsComponent implements OnInit {

  db: any;
  tables: any;
  currentIndex = -1;
  newTable = '';
  isDisabled = false;

  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.db = this.activatedRoute.snapshot.params.name;
    this.retrieveTbs(this.db);
  }

  retrieveTbs(name: any) {
    console.log(name)
    this.dbService.getTables(name).subscribe(
      (val) => {
        this.tables = val;
        console.log(val);
      },
      error => {
        console.log(error);
      });
  }

  setTable(item: any) {
    this.router.navigate(['/cl/', this.db, item.table_name]);
  }

  deleteTable(item: any) {
    const r = confirm(`Are you sure to delete "${item.table_name}" table ?`);
    if (r) {
      this.dbService.deleteTable(this.db, item.table_name).subscribe((s) => {
        console.log(s);
        this.retrieveTbs(this.db);
      });
    }
  }

  addTable() {
    this.isDisabled = true;
    const name = this.newTable.replace(/\s/g, '');
    this.dbService.createTable(this.db, name).subscribe(data => {
      console.log(data);
      this.retrieveTbs(this.db);
      this.newTable = '';
      this.isDisabled = false;
    },
      error => {
        console.log(error);
        this.newTable = '';
        this.isDisabled = false;
      });
  }
}
