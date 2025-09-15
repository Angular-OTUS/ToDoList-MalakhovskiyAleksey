import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIf]'
})
export class ShowIf implements OnChanges {

  @Input() appShowIf : boolean = false 

  private  hasView : boolean = false

  constructor ( 
    private templateRef : TemplateRef<HTMLElement>,
    private  viewContainerRef : ViewContainerRef
  ) {

   }

   public ngOnChanges(changes: SimpleChanges): void {
     
    if ( 'appShowIf' in changes )  {
      if ( this.appShowIf && ! this.hasView )  {
        this.viewContainerRef.createEmbeddedView ( this.templateRef )
        this.hasView = true
      } else if ( ! this.appShowIf && this.hasView )  {
        this.viewContainerRef.clear()
        this.hasView = false
      }
    }
   }
}
