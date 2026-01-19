import { Component, inject, OnInit, signal } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive, Router  } from '@angular/router'
import { TabsModule } from 'primeng/tabs'
import { CommonModule } from '@angular/common'
import { LangDefinition, TranslocoModule, TranslocoService } from "@jsverse/transloco"
import { ToDoStatusService } from './services/to-do-status-service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,TabsModule,CommonModule,TranslocoModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title = signal('otus-tut')
 
  translocoService = inject ( TranslocoService )
  toDoStatusService = inject ( ToDoStatusService )
 
  al = this.translocoService.getAvailableLangs()
  availableLangs = signal(this.al)
  currentLang = signal(this.translocoService.getDefaultLang())

  setLang ( lang : string | LangDefinition ) : void {
    this.translocoService.setActiveLang(lang.toString())
    this.currentLang.update ( () => this.translocoService.getActiveLang() )
  }
}
