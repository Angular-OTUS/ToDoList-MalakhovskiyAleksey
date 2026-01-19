import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { provideRouter, withViewTransitions, withComponentInputBinding, withPreloading } from '@angular/router'
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http'
import { QuicklinkStrategy } from 'ngx-quicklink'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideEventPlugins } from '@taiga-ui/event-plugins'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './services/transloco-loader';
import { provideTransloco, TranslocoOptions } from '@jsverse/transloco'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withPreloading(QuicklinkStrategy)
    ),
    provideHttpClient(
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
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ru'],
        defaultLang: 'ru',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        failedRetries: 3,
        missingHandler: {
          allowEmpty: true,
          logMissingKey: true,
        },
      },
      loader: TranslocoHttpLoader
    })
  ]
}
