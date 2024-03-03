import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {DOCUMENT, NgIf} from "@angular/common";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment.development";
import {ClienteService} from "./services/cliente.service";

function initializeKeycloak(keycloak: KeycloakService){
  return () => {
    console.log(keycloak)
    keycloak.init({
        config: environment.keycloak,
        initOptions:{
          onLoad: "login-required",
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer '
      }
    )
  }
}

const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
}

const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}

// const ClienteServiceProvider: Provider ={
//   provide: ClienteService
// }


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakInitializerProvider,
    KeycloakBearerInterceptorProvider,
    KeycloakService,
    provideRouter(routes,withViewTransitions(),withComponentInputBinding()),
    provideClientHydration(),
    provideAnimations(),
    {
      provide: Document, useExisting: DOCUMENT
    }
  ]
};
