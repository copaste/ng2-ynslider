import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import { YnSliderComponent } from './slider.component';
import { YnSliderSlideComponent } from './slide/slider-slide.component';

export * from './slider.component';
export * from './slide/slider-slide.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        YnSliderComponent,
        YnSliderSlideComponent
    ],
    exports: [
        YnSliderComponent,
        YnSliderSlideComponent
    ],
})
export class YnSliderModule {

}