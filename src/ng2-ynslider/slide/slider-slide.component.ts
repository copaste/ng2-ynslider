import {
    Component,
    OnInit,
    OnDestroy,
    AfterContentInit,
    ContentChild,
    HostBinding,
    ChangeDetectionStrategy
} from '@angular/core';

import { YnSliderComponent } from '../ynslider.component';
import { LazyloadDirective } from './ynslider-lazyload.directive';

@Component({
    selector: 'yn-slider-slide',
    styleUrls: [
        './slider-slide.component.css'
    ],
    templateUrl: './slider-slide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YnSliderSlideComponent implements OnInit, OnDestroy, AfterContentInit {
    public index: number;

    @ContentChild(LazyloadDirective)
    public lazyLoadImg: LazyloadDirective;
    @HostBinding('class.active')
    public active = false;
    @HostBinding('style.width.px')
    public get width() {
        if (this.cache[this.sliderComp.sliderWidth]) {
            return this.cache[this.sliderComp.sliderWidth];
        }

      //  const slideWidth = this.sliderComp.sliderWidth / this.sliderComp.opt.slidesToShow;
        const partialSize = this.sliderComp.opt.partialMode ? (this.sliderComp.sliderWidth * 0.05) : 0;
        return this.cache[this.sliderComp.sliderWidth] =
            (this.sliderComp.sliderWidth - partialSize) / this.sliderComp.opt.slidesToShow ;
    }

    private cache = [];

    constructor(
        private sliderComp: YnSliderComponent,
    ) {}

    public ngOnInit() {
        this.sliderComp.addSlide(this);
    }

    public ngAfterContentInit() {
    }

    public ngOnDestroy() {
        this.sliderComp.removeSlide(this);
    }
}
