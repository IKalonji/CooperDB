import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appConsoleView]'
})
export class ConsoleViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
