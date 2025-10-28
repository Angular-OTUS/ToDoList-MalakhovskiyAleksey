import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'
import { provideRouter,   withViewTransitions, withComponentInputBinding} from '@angular/router'
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter (
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideHttpClient ( 
                        withInterceptors([]),
                        withInterceptorsFromDi(),
                        withJsonpSupport()
                      )
  ]
}
