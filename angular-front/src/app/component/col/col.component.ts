import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.css']
})
export class ColComponent implements OnInit {

  db: any;
  tl: any;
  columns: any = [];
  currentIndex = -1;
  newCol = '';
  isDisabled = false;
  type: any;


  constructor(private dbService: DbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.db = this.activatedRoute.snapshot.params.db;
    this.tl = this.activatedRoute.snapshot.params.tl;
    this.retrieveCls(this.db, this.tl);
  }

  retrieveCls(db: any, tl: any) {
    this.dbService.getCols(db, tl).subscribe(data => {
      this.columns = data;
      console.log(this.columns);
    },
      error => {
        console.log(error);
      });
  }

  deleteColumn(item: { column_name: any; }) {
    const r = confirm(`Are you sure to delete "${item.column_name}" column ?`);
    if (r) {
      this.dbService.deleteColumn(this.db, this.tl, item.column_name).subscribe((s) => {
        console.log(s);
        this.retrieveCls(this.db, this.tl);
      });
    }
  }

  addCol() {
    this.isDisabled = true;
    const name = this.newCol.replace(/\s/g, '');
    this.dbService.createCol(this.db, this.tl, name, this.type).subscribe(data => {
      console.log(data);
      this.retrieveCls(this.db, this.tl);
      this.resetForm();
    },
      error => {
        console.log(error);
        this.resetForm();
      });
  }

  changeType(e: any) {
    this.type = e.target.value;
  }

  resetForm() {
    this.newCol = '';
    this.isDisabled = false;
    this.type = '';
  }
}
