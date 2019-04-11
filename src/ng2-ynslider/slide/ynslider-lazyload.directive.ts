import {Directive, OnChanges, Input, ElementRef, Renderer2, SimpleChange} from '@angular/core';

// TODO: add loader while loading the image

@Directive({
  selector: '[ynSliderLazyload]'
})
export class LazyloadDirective implements OnChanges {

  public get loaded(): boolean {
    return this._loaded;
  }

  @Input('carouselLazyload')
    private lazySrc = '';

  private _loaded = false;
  private imgSrc = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.imgSrc = el.nativeElement.getAttribute('src') || this.lazySrc;
    renderer.removeAttribute(el.nativeElement, 'src');
  }

  public ngOnChanges(changes) {
    if (changes.lazySrc.currentValue) {
      this.loadImage();
    }
  }

  public loadImage(): void {
    if (!this.lazySrc) { return; }

    this._loaded = true;

    if (this.el.nativeElement.parentElement.classList.contains('bg-transfer')) {
      this.renderer.setStyle(this.el.nativeElement.parentElement, 'backgroundImage', 'url(' + (this.imgSrc || this.lazySrc || '') + ')');
    }

    this.renderer.setAttribute(this.el.nativeElement, 'src', this.lazySrc);
  }
}
