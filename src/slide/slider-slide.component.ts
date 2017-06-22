import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    HostBinding
} from '@angular/core';

import { YnSliderComponent } from '../slider.component';

@Component({
    selector: 'yn-slider-slide',
    styleUrls: [
        './slider-slide.component.css'
    ],
    templateUrl: './slider-slide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YnSliderSlideComponent implements OnInit {
    public index: number;

    @HostBinding('class.active')
        public active: boolean = false;
    @HostBinding('style.left')
        public posLeft: string = '';

    constructor(
        private sliderComp: YnSliderComponent
    ) {}

    public ngOnInit(): void {
        this.sliderComp.addSlide(this);
        this.posLeft = (this.index * 100) + '%';
    }
}
