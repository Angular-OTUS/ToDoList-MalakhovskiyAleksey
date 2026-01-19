import { Component, input, output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-button-component',
  imports: [TranslocoModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {

  buttonTitle = input("initial")
  buttonClasses = input ("")
  buttonOpacity = input (1.0)
  disabled = input(false)
  
  actionEvent =  output<void>()
  
  action ( )  {
    this.actionEvent.emit ()
  }

}
