import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef, HostListener, ComponentRef, Renderer2 } from '@angular/core';
import { PopUpTitle } from '../components/pop-up-title/pop-up-title';

@Directive({
  selector: '[appTextTitle]',
  exportAs: 'textTitleEl'
})
export class TextTitle {

  @Input() id: string = ""
  @Input() text: string = ""

  private componentRef: ComponentRef<PopUpTitle> | null = null

  @HostListener("mouseenter") onMouseEnter() {

    if (!this.componentRef) {

      this.componentRef = this.viewContainerRef.createComponent(PopUpTitle)
      this.componentRef.instance.id = this.id
      this.componentRef.instance.text = this.text
      this.componentRef.instance.x = this.elementRef.nativeElement.getBoundingClientRect().left
        + (this.elementRef.nativeElement.getBoundingClientRect().right - this.elementRef.nativeElement.getBoundingClientRect().left) / 10
      this.componentRef.instance.top = this.elementRef.nativeElement.getBoundingClientRect().top - 45
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement)

    }
  }
  @HostListener("mouseleave") onMouseLeave() {

    if (this.componentRef) {
      this.componentRef.destroy()
      this.componentRef = null
    }

  }

  constructor(private elementRef: ElementRef<HTMLElement>,
    /*private templateRef     : TemplateRef<HTMLElement>,*/
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {

  }

}
