import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'
import { provideRouter,   withViewTransitions, withComponentInputBinding, withPreloading} from '@angular/router'
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http'
import { QuicklinkStrategy } from 'ngx-quicklink'
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideEventPlugins} from '@taiga-ui/event-plugins'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter (
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withPreloading(QuicklinkStrategy)
    ),
    provideHttpClient ( 
                        withInterceptors([]),
                        withInterceptorsFromDi(),
                        withJsonpSupport()
                      ),
    provideAnimations(),
    provideEventPlugins(),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
}
