import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbsComponent } from './component/dbs/dbs.component';
import { TbsComponent } from './component/tbs/tbs.component';
import { ColComponent } from './component/col/col.component';

const routes: Routes = [
  { path: '', redirectTo: 'db', pathMatch: 'full' },
  { path: 'db', component: DbsComponent },
  { path: 'tb/:name', component: TbsComponent },
  { path: 'cl/:db/:tl', component: ColComponent },
  { path: '*', redirectTo: 'db', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
