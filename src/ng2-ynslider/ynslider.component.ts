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

import { Observable, Subscription, interval } from 'rxjs';
import { map, flatMap, switchMap, takeUntil } from 'rxjs/operators';

import { YnSliderSlideComponent } from './slide/slider-slide.component';

@Component({
    selector: 'yn-slider',
    templateUrl: './ynslider.component.html',
    styleUrls: [
        './ynslider.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YnSliderComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input()
    public set options(opt) {
        Object.assign(this.opt, opt);
    }

    @Input()
    public autoplay = false;
    @Input()
    public initialSlide = 0;
    @Input()
    public pager = false;
    @Input()
    public navigation = true;
    @Input()
    public speed = 3000;

    @Output()
    public slideDidChange: EventEmitter<number> = new EventEmitter<number>();

    public opt = {
        height: 360,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: false,
        interval: 5000,
        activeSlideIndex: 0,
        partialMode: true,
    };

    public translateX = 0;
    public slideAnimation = true;
    public sliderWidth = 0;
    public sliderInnerWidth = 0;
    public get singleSlideWidth() {
        // calculated in percentage
        return 100 / this.slides.length;
    }
    public slideScroll = 0;

    public slides: YnSliderSlideComponent[] = [];
    public currentSlideIndex: number = this.initialSlide;
    private sliderElement: HTMLElement;
    private lazyLoadedImages = 0;

    private dragDiff = 0;
    private mouseup: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousedown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mouseenter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mouseleave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    private mousedrag: Observable<any>;

    private dragStart$: Subscription;
    private dragEnd$: Subscription;
    private autoplay$: Subscription;

    constructor(
        private sliderElementRef: ElementRef
    ) {
        this.sliderElement = sliderElementRef.nativeElement;

        this.mousedrag = this.mousedown.pipe(
            map((ev) => {
                return {
                    left: (((ev  as any).touches && (ev  as any).touches[0]) || ev).pageX,
                };
            }),
            flatMap((dragStart) => this.mousemove.pipe(
                map((pos) => ({
                    left: ((pos as any).touches && ((pos as any).touches[0]) || pos).clientX - dragStart.left
                })),
                takeUntil(this.mouseup)
                )
            )
        );
    }

    @HostListener ('window:resize', ['$event'])
    public onResize(ev) {
        this.sliderWidth = this.sliderElement.offsetWidth;
        this.sliderInnerWidth = this.sliderWidth * this.slides.length;
    }

    public ngAfterContentInit() {
        this.sliderWidth = this.sliderElement.offsetWidth;
        this.sliderInnerWidth = this.sliderWidth * this.slides.length;

        // Init first 3 slides if lazyloading is enabled
        this.lazyLoadImages();
    }

    public ngOnInit() {
        this.dragStart$ = this.mousedrag.subscribe(
            (x) => {
                if (
                    (x.left > 0 && this.currentSlideIndex === 0) ||
                    (x.left < 0 && this.currentSlideIndex >= Math.ceil((this.slides.length - 1) / this.opt.slidesToShow))
                ) {
                    return this.translateX = this.currentSlideIndex * (-100 / this.slides.length);
                }

                this.dragDiff = (x.left / this.sliderWidth) * this.singleSlideWidth;
                this.translateX = -1 * this.currentSlideIndex * this.singleSlideWidth + this.dragDiff;
                return this.dragDiff;
            }
        );

        this.dragEnd$ = this.mouseup.subscribe(
            (x) => {
                if (this.dragDiff > 2) {
                    this.slidePrev();
                } else if (this.dragDiff < -2) {
                    this.slideNext();
                } else {
                    this.translateX = this.currentSlideIndex * this.singleSlideWidth * -1;
                }
            }
        );

        this.sliderWidth = this.sliderElement.offsetWidth;

        if (this.autoplay) {
            this.startAutoplay();
        }
    }

    public ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this.dragStart$.unsubscribe();
        this.dragEnd$.unsubscribe();
        this.autoplay$ && this.autoplay$.unsubscribe();

        if (this.autoplay) {
            // Remove event listeners
            this.sliderElementRef.nativeElement.removeEventListener('mouseenter', this.mouseenter);
            this.sliderElementRef.nativeElement.removeEventListener('mouseleave', this.mouseleave);
        }
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): boolean {
        if (ev.which && ev.which !== 1) {
            return false;
        }

        this.slideAnimation = false;
        this.mousedown.emit(ev);
        return false; // Call preventDefault() on the event
    }

    @HostListener('document:touchend', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        this.slideAnimation = true;
        this.mouseup.emit(ev);
    }

    @HostListener('touchmove', ['$event'])
    @HostListener('mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        this.mousemove.emit(ev);
    }

    public slideNext(): void {
        this.slideTo(this.currentSlideIndex + 1);
        this.lazyLoadImages();
    }

    public slidePrev(): void {
        this.slideTo(this.currentSlideIndex - 1);
    }

    public slideTo(index: number): void {
        if (index >= this.slides.length || index < 0) {
            return;
        }

        this.dragDiff = 0;
        this.translateX = index * (-100 / this.slides.length);
        this.currentSlideIndex = index;
        this.toggleSlideActiveClass();
        this.slideDidChange.emit(index);
    }

    public getActiveIndex(): number {
        return this.currentSlideIndex;
    }

    public addSlide(slide: YnSliderSlideComponent): void {
        slide.index = this.slides.length;
        this.slides = this.slides.concat([slide]);
        if (this.slides.length === 1 || this.initialSlide === slide.index) {
            slide.active = true;
        }
    }

    public removeSlide(slide: YnSliderSlideComponent) {
        this.slides = this.slides.filter((s) => s !== slide);
    }

    private lazyLoadImages() {
        if (this.currentSlideIndex % 2 === 0) {
            this.lazyLoadedImages += 3;
            this.slides
                .filter((img) => img.lazyLoadImg && !img.lazyLoadImg.loaded && img.index < this.lazyLoadedImages)
                .map((img) => img.lazyLoadImg.loadImage());
        }
    }

    private startAutoplay() {
        const autoplayInterval = interval(this.speed).pipe(takeUntil(this.mousedown));

        this.slideAnimation = true;

        const autoplay$ = autoplayInterval.subscribe((x) => this.slideNext());

        this.autoplay$ = this.mouseup.pipe(switchMap(() => autoplayInterval))
            .subscribe(
                (x) => autoplay$ && autoplay$.unsubscribe()
            );

        this.sliderElementRef.nativeElement.addEventListener('mouseenter', (ev) => this.mouseenter.emit(ev));
        this.sliderElementRef.nativeElement.addEventListener('mouseleave', (ev) => this.mouseleave.emit(ev));
    }

    private toggleSlideActiveClass(): void {
        this.slides = this.slides.map((s) => { s.active = this.currentSlideIndex === s.index; return s; });
    }
}
