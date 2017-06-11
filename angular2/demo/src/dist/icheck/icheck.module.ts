import { NgModule } from '@angular/core';
import { AllCheckService } from './allcheck.service';
import { IcheckDirective } from './icheck.directive';

@NgModule({
  imports: [],
  exports: [IcheckDirective],
  declarations: [IcheckDirective],
  providers: [AllCheckService]
})
export class IcheckModule { }
