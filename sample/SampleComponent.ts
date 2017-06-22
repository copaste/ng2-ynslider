import {Component} from "@angular/core";

@Component({
    selector: "sample-component",
    template: `
    <yn-slider [autoplay]="false"
           [initialSlide]="0"
           [pager]="false"
           [speed]="3000"
           (slideDidChange)="someActionOnChange()">
           <yn-slider-slide *ngFor="let img of images; let i = index;">
            <div class="wrap">
                <img [attr.src]="img.src"/>
                <p>{{img.description}}
            </div>
           </yn-slider-slide>
</yn-slider>
`
})
export class SampleComponent {
    private images = [{
           src: 'https://www.metaslider.com/wp-content/uploads/2014/11/mountains1.jpg',
            description: 'Title 1'
        },
        {
            src: 'https://bdthemes.net/demo/joomla/framed/images/sampledata/master-slider-sample/simple-slider.jpg',
            description: 'Title 2'
        },
        {
            src: 'http://www.greatfun.cc/images/sliders/full_slider/slide4.jpg',
            description: 'Title 3'
        },
        {
            src: 'http://www.dessign.net/largeslidertheme/wp-content/uploads/slider-image4.jpg',
            description: 'Title 4'
        },
        {
            src: 'https://exhibition.events/wp-content/uploads/2014/11/city-landscape-slider.jpg',
            description: 'Title 5'
    }];
}