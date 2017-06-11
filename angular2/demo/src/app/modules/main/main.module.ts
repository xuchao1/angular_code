import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { MAIN_ROUTING } from './main-routing';
import { MAIN_COMPONETS,MAIN_COMPONETS_EXPORT } from "./index"

import { IcheckModule } from 'dist/icheck/icheck.module';

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTING),IcheckModule,FormsModule,CommonModule],
  exports: [MAIN_COMPONETS_EXPORT],
  declarations: [MAIN_COMPONETS],
  providers: []
})
export class MainModule { }
