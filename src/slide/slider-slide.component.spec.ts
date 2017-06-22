import { NO_ERRORS_SCHEMA, ReflectiveInjector, ElementRef } from '@angular/core';
import {
    async,
    TestBed,
    ComponentFixture,
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

// Load the implementations that should be tested
import { WotdSliderComponent } from '../slider.component';
import { WotdSliderSlideComponent } from './slider-slide.component';

class MockElementRef implements ElementRef {
    public nativeElement: HTMLElement = {} as any;
}

describe(`WotdSliderSlideComponent`, () => {
    let comp: WotdSliderSlideComponent;
    let fixture: ComponentFixture<WotdSliderSlideComponent>;
    let injector = ReflectiveInjector.resolveAndCreate([WotdSliderComponent]);

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WotdSliderComponent,
                WotdSliderSlideComponent
            ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef },
                WotdSliderComponent
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
        fixture = TestBed.createComponent(WotdSliderSlideComponent);
        comp    = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

});
