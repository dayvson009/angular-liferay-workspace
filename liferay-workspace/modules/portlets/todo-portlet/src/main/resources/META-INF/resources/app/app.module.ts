import { NgModule, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component.js';
import { AppConfig } from './app.config.js';

export function createAppModule(portletNamespace: string) {
    @NgModule({
        imports: [BrowserModule, FormsModule],
        declarations: [AppComponent],
        providers: [{ provide: AppConfig, useFactory: () => new AppConfig(portletNamespace) }],
        entryComponents: [AppComponent]
    })
    class AppModule {
        constructor(
            private resolver: ComponentFactoryResolver,
            private appConfig: AppConfig
        ) { }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppComponent);
            (<any>factory).factory.selector = "todo-app#" + this.appConfig.portletNamespace;
            appRef.bootstrap(factory);
        }
    }

    return AppModule;
}