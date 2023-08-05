import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValuesValidatorDirective} from "./directives/values-validator.directive";
import {RouterLink} from "@angular/router";
import {ShortTextPipe} from "./pipes/short-text.pipe";

@NgModule({
  declarations: [
    ValuesValidatorDirective,
    ShortTextPipe
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    ShortTextPipe
  ]
})
export class SharedModule { }
