import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const app_routes: Routes = [
];

const routes = RouterModule.forRoot(app_routes);

@NgModule({
  imports: [
    routes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
