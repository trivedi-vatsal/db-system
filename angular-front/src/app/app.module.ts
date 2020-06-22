import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbsComponent } from './component/dbs/dbs.component';
import { TbsComponent } from './component/tbs/tbs.component';
import { ColComponent } from './component/col/col.component';

@NgModule({
  declarations: [
    AppComponent,
    DbsComponent,
    TbsComponent,
    ColComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
