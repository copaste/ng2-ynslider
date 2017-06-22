import {
    Component,
    OnInit,
    OnDestroy,
    AfterContentInit,
    ChangeDetectionStrategy,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    HostListener,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { YnSliderSlideComponent } from './slide/slider-slide.component';

@Component({
    selector: 'yn-slider',
    styleUrls: [
        './slider.component.css'
    ],
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YnSliderComponent implements OnInit, AfterContentInit, OnDestroy {
    @Input()
        public autoplay: boolean = false;
    @Input()
        public initialSlide: number = 0;
    @Input()
        public pager: boolean = false;
    @Input()
        public speed: number = 3000;

    @Output()
        public slideDidChange: EventEmitter<number> = new EventEmitter<number>();

    public translateX: number = 0;
    public slideAnimation: boolean = true;

    private sliderElement: HTMLElement;
    private slides: WotdSliderSlideComponent[] = [];
    private currentSlideIndex: number = this.initialSlide;
    private sliderWidth: number = 0;

    private dragDiff: number = 0;
    private mouseup: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousedown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mouseenter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousedrag: Observable<any>;

    private dragStart$: Subscription;
    private dragEnd$: Subscription;
    private autoplay$: Subscription;

    constructor (
        private sliderElementRef: ElementRef
    ) {
        this.sliderElement = sliderElementRef.nativeElement;

        this.mousedrag = this.mousedown.map((ev) => {
            return {
                left: ev.pageX || (<any> ev).touches[0].pageX,
            };
        })
        .flatMap((dragStart) => this.mousemove.map((pos) => ({
                left: (pos.clientX || (<any> pos).touches[0].clientX) - dragStart.left
            }))
            .takeUntil(this.mouseup)
        );
    }

    public ngAfterContentInit () {
        this.sliderWidth = this.sliderElement.offsetWidth;
    }

    public ngOnInit () {
        this.dragStart$ = this.mousedrag.subscribe((x) => {
            if ((x.left > 0 && this.currentSlideIndex === 0) || (x.left < 0 && this.currentSlideIndex >= this.slides.length - 1)) {
                return this.translateX = this.currentSlideIndex * -100;
            }

            this.dragDiff = x.left / this.sliderWidth * 70;
            this.translateX = this.currentSlideIndex * -100 + this.dragDiff;
            return this.dragDiff;
        });

        this.dragEnd$ = this.mouseup.subscribe((x) => {
            if (this.dragDiff > 8) {
                this.slidePrev();
            }
            if (this.dragDiff < -8) {
                this.slideNext();
            }
        });

        if (this.autoplay) {
            this.startAutoplay();
        }
    }

    public ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.dragStart$.unsubscribe();
        this.dragEnd$.unsubscribe();
        this.autoplay$ && this.autoplay$.unsubscribe();

        // Remove event listeners
        this.sliderElementRef.nativeElement.removeEventListener('mouseenter');
        this.sliderElementRef.nativeElement.removeEventListener('mouseleave');
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
        public onMouseDown (ev: MouseEvent): boolean {
            if (ev.which !== 1) {
                return false;
            }

            this.slideAnimation = false;
            this.mousedown.emit(ev);
            return false; // Call preventDefault() on the event
        }

    @HostListener('document:touchend', ['$event'])
    @HostListener('document :mouseup', ['$event'])
        public onMouseUp (ev: MouseEvent): void {
            this.slideAnimation = true;
            this.mouseup.emit(ev);
        }

    @HostListener('touchmove', ['$event'])
    @HostListener('mousemove', ['$event'])
        public onMouseMove (ev: MouseEvent): void {
            this.mousemove.emit(ev);
        }

    public slideNext (): void {
        this.slideTo(this.currentSlideIndex + 1);
    }

    public slidePrev (): void {
        this.slideTo(this.currentSlideIndex - 1);
    }

    public slideTo (index: number): void {
        if (index >= this.slides.length || index < 0) {
            return;
        }

        this.dragDiff = 0;
        this.translateX = index * -100;
        this.currentSlideIndex = index;
        this.changeActiveSlide();
        this.slideDidChange.emit(index);
    }

    public getActiveIndex(): number {
        return this.currentSlideIndex;
    }

    public addSlide(slide: WotdSliderSlideComponent): void {
        slide.index = this.slides.length;
        this.slides = this.slides.concat([slide]);
        if (this.slides.length === 1 || this.initialSlide === slide.index) {
            slide.active = true;
        }
    }

    private startAutoplay () {
        let autoplayInterval =  Observable.interval(this.speed).takeUntil(this.mousedown);

        this.slideAnimation = true;

        let autoplay$ = autoplayInterval.subscribe((x) => this.slideNext());

        this.autoplay$ = this.mouseup.switchMap(() => autoplayInterval)
            .subscribe((x) => {
                autoplay$ && autoplay$.unsubscribe();
            });

        this.sliderElementRef.nativeElement.addEventListener('mouseenter', (ev) => this.mouseenter.emit(ev));
        this.sliderElementRef.nativeElement.addEventListener('mouseleave', (ev) => this.mouseleave.emit(ev));
    }

    private changeActiveSlide(): void {
        this.slides = this.slides.map((s) => { s.active = this.currentSlideIndex === s.index; return s; });
    }
}
