import { NgModule, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service.js';

import { AppComponent } from './app.component.js';
import { AppConfig } from './app.config.js';
import { AppRoutingModule, routedComponents } from './app-routing.module.js';
import { HeroService } from './hero.service.js';
import { HeroSearchComponent } from './hero-search.component.js';

export function createAppModule( portletNamespace: string ) {
    @NgModule( {
        imports: [
            BrowserModule,
            FormsModule,
            AppRoutingModule,
            HttpModule,
            InMemoryWebApiModule.forRoot( InMemoryDataService, { delay: 600 })
        ],
        declarations: [
            AppComponent,
            HeroSearchComponent,
            routedComponents
        ],
        providers: [
            { provide: AppConfig, useFactory: () => new AppConfig( portletNamespace ) },
            HeroService,
            {provide: APP_BASE_HREF, useValue : '/' }
        ],
        entryComponents: [AppComponent]
    })
    class AppModule {
        constructor(
            private resolver: ComponentFactoryResolver,
            private injector: Injector,
            private appConfig: AppConfig
        ) { }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppComponent);
            const appComponentRef = factory.create(this.injector, [], "toh-app#" + this.appConfig.portletNamespace);
            appRef.attachView(appComponentRef.hostView);
        }
    }

    return AppModule;
}
