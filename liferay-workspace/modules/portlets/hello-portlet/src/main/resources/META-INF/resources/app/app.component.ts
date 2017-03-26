import { Component } from '@angular/core'

import { AppConfig } from './app.config.js';

@Component( {
    selector: 'hello-app',
    template: `
    <div>
      <h2>Hello {{name}} portlet</h2>
    </div>
    <div>
        {{portletNamespace}}
    </div>
  `,
})
export class AppComponent {
    name: string;
    portletNamespace: string;

    constructor(appConfig: AppConfig) {
        this.name = 'Angular';
        this.portletNamespace = appConfig.portletNamespace;
    }
}
