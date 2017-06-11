import { Routes } from '@angular/router';
import { IndexPageComponent } from './components/index';
import { IcheckPageComponent } from './components/index';

export const MAIN_ROUTING: Routes = [
  { path: '', component:IndexPageComponent },
  { path: 'icheck', component:IcheckPageComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
