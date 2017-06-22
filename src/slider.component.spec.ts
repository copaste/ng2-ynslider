import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    TestBed,
    ComponentFixture,
} from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

// Load the implementations that should be tested
import { WotdSliderComponent } from './slider.component';
import { WotdSliderSlideComponent } from './slide/slider-slide.component';

describe(`WotdSliderComponent`, () => {
    let comp: WotdSliderComponent;
    let fixture: ComponentFixture<WotdSliderComponent>;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WotdSliderComponent,
                WotdSliderSlideComponent
            ],
            providers: [
            ],
            imports: [
                BrowserModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(WotdSliderComponent);
        comp    = fixture.componentInstance;

        fixture.detectChanges();
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

});
