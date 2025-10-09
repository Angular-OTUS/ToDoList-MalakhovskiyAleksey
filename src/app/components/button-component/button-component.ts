import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {

  @Input() buttonTitle : string = "initial"
  @Input() buttonClasses : string = ""
  @Input() buttonOpacity : number = 1.0
  @Input() disabled : boolean = false
  
  @Output() actionEvent = new EventEmitter()
  
  action ( )  {
    this.actionEvent.emit ()
  }

}
