import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DbsComponent } from '../component/dbs/dbs.component';

const baseUrl = 'http://localhost:8080/api/dbs/';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  getTables(data: any) {
    return this.http.get(baseUrl + 'getTable/' + data);
  }

  getCols(db: any, table: any) {
    return this.http.get(baseUrl + `getColumn/${db}/${table}`);
  }

  deleteDB(db: any) {
    return this.http.delete(baseUrl + `deleteDB/${db}`);
  }

  deleteTable(db, table) {
    const body = { db, table }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: reqHeader,
      body,
    };
    return this.http.delete(baseUrl + `deleteTable`, httpOptions);
  }

  deleteColumn(db, table, columnName) {
    const body = { db, table, columnName };
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: reqHeader,
      body,
    };
    return this.http.delete(baseUrl + `deleteColumn`, httpOptions);
  }

  createDB(db: any) {
    const body = { db };
    return this.http.post(baseUrl + `createDB`, body);
  }

  createTable(db: any, table: any) {
    const body = { db, table };
    return this.http.post(baseUrl + `createTable`, body);
  }

  createCol(db: any, table: any, columnName: any, columnType: any) {
    const body = { db, table, columnName, columnType };
    return this.http.post(baseUrl + `createColumn`, body);
  }
}
