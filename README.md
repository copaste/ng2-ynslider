# ng2-ynslider
Simple slider/carousel for your angular2 applications.
Does not depend of jquery.
Please star a project if you liked it, or create an issue if you have problems with it.

## Installation

1. Install npm module:
    
    `npm install ng2-ynslider --save`

## Usage

Import `YnSliderModule` in your app.
There are two components you can use in your components.

First is a `yn-slider`:

```html
<yn-slider
    [autoplay]="true"
    [initialSlide]="0"
    [pager]="false"
    [speed]="3000"
    (slideDidChange)="onSlideChange($event)"
>
    <yn-slider-slide *ngFor="let img of images; let i = index;">
        <div class="wrap">
            <img [attr.src]="img.src"/>
            <p>{{ img.description }}
        </div>
    </yn-slider-slide>
</yn-slider>
```

* `autoplay` - Autoplay the slides
* `speed` - The speed of the autoplay in ms
* `initialSlide` - Start from specific slide
* `pager` - Show/Hide the dotted pager
* `(slideDidChange)` - event emitted when slide changed

## Sample

Using simple yn-slider:

```typescript
import { Component } from '@angular/core';
import { YnSliderModule } from 'ng2-ynslider';

@Component({
    selector: "app",
    template: `
    <div class="container">
        <yn-slider
            [autoplay]="false"
            [initialSlide]="0"
            [pager]="false"
            [speed]="3000"
            (slideDidChange)="someActionOnChange()"
        >
            <yn-slider-slide *ngFor="let img of images; let i = index;">
                <div class="wrap">
                    <img [attr.src]="img.src"/>
                    <p>{{img.description}}
                </div>
            </yn-slider-slide>
        </yn-slider>
    </div>
    `
})
export class App {
}

@NgModule({
    imports: [
        // ... modules
        YnSliderModule
    ],
    declarations: [
        App
    ],
    bootstrap: [
        App
    ]
})
export class AppModule {

}
```
