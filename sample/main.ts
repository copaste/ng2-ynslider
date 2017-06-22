import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SampleComponent } from './SampleComponent';
import { YnSliderModule } from '../src/index';

@Component({
    selector: 'app',
    template: `
<div class="container">
    <sample-component></sample-component>
</div>
`
})
export class SampleApp {

}

@NgModule({
    imports: [
        BrowserModule,
        YnSliderModule
    ],
    declarations: [
        SampleComponent
    ],
    bootstrap: [
        SampleApp
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ]
})
export class SampleModule {

}

platformBrowserDynamic().bootstrapModule(SampleModule);