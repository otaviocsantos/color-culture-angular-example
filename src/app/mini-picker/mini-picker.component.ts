import { Component, Input, Output, EventEmitter, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Color, RGB, HSL, CMYK, LAB } from 'color-culture';

@Component({
  selector: 'mini-picker',
  templateUrl: './mini-picker.component.html',
  styleUrls: ['./mini-picker.component.css']
})

export class MiniPickerComponent implements OnDestroy {

  model = RGB.MODEL;
  colorWeb = '';

  @Input() showAlpha: boolean;
  @Input() showModelSelector = true;
  @Input() showHex = true;
  @Input() showSample = true;
  @Input() showValues = true;
  @Input() showLabels = true;

  @Output() update = new EventEmitter();

  private mousedown = false;
  private trackHeight = 20;
  private trackWidth = 80;


  fills;
  ranges: number[];
  private _color: Color;
  public get color(): Color {
    return this._color;
  }
  @Input() public set color(value: Color) {

    this._color = value;
    this.trackHeight = this.height / (this.color.channels.length - (this.showAlpha ? 0 : 1));

    this.selectModel(this._color.model);
    this.refresh();

  }

  height = 80;



  constructor(private element: ElementRef) {

    this.ranges = [];

    this._color = new RGB();

    this.trackHeight = this.height / (this.color.channels.length - (this.showAlpha ? 0 : 1));

    this.refresh();


  }
  copy: Color;
  createHSLFills() {
    this.copy = this.color.to('hsl');
    this.copy.channels[1] = 100;
    this.copy.channels[2] = 50;
    this.copy.channels[3] = 100;

    this.fills = [];
    this.fills[0] = [
      { i: 0, c: 'rgba(255, 0, 0, 1)' },
      { i: 0.17, c: 'rgba(255, 255, 0, 1)' },
      { i: 0.34, c: 'rgba(0, 255, 0, 1)' },
      { i: 0.51, c: 'rgba(0, 255, 255, 1)' },
      { i: 0.68, c: 'rgba(0, 0, 255, 1)' },
      { i: 0.85, c: 'rgba(255, 0, 255, 1)' },
      { i: 1, c: 'rgba(255, 0, 0, 1)' }
    ];

    this.fills[1] = [
      { i: 0, c: 'rgba(128, 128, 128, 1)' },
      { i: 1, c: this.copy.rgba }
    ];

    this.fills[2] = [
      { i: 0, c: 'rgba(0, 0, 0, 1)' },
      { i: 0.5, c: this.copy.rgba },
      { i: 1, c: 'rgba(255, 255, 255, 1)' }
    ];
  }



  createCMYKFills() {

    this.fills = [];
    this.fills[0] = [
      { i: 0, c: 'cyan' },
      { i: 1, c: 'cyan' }
    ];
    this.fills[1] = [
      { i: 0, c: 'magenta' },
      { i: 1, c: 'magenta' }
    ];
    this.fills[2] = [
      { i: 0, c: 'yellow' },
      { i: 1, c: 'yellow' }
    ];
    this.fills[3] = [
      { i: 0, c: 'black' },
      { i: 1, c: 'black' }
    ];
  }


  createRGBFills() {

    this.fills = [];
    this.fills[0] = [
      { i: 0, c: 'red' },
      { i: 1, c: 'red' }
    ];
    this.fills[1] = [
      { i: 0, c: 'green' },
      { i: 1, c: 'green' }
    ];
    this.fills[2] = [
      { i: 0, c: 'blue' },
      { i: 1, c: 'blue' }
    ];

  }



  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent, index: number) {
    this.mousedown = true;
    this.setChannel(this.ranges[index] * evt.offsetX / this.trackWidth, index);

  }

  onMouseMove(evt: MouseEvent, index: number) {
    if (this.mousedown) {
      this.setChannel(this.ranges[index] * evt.offsetX / this.trackWidth, index);
    }
  }

  updateBars() {
    if (this.color.model === 'hsl') {
      this.createHSLFills();
    }
    if (this.color.model === 'cmyk') {
      this.createCMYKFills();
    }
    if (this.color.model === 'rgb') {
      this.createRGBFills();
    }
    const a = this.element.nativeElement.querySelector('#' + this.color.model + '-list');
    if (a) {
      this.color.channels.map((o, i, l) => {

        this.draw(a.childNodes[i], this.color.channels[i] / this.ranges[i], i);
      });
    }
  }

  draw(canvas, value, index) {
    if (canvas instanceof HTMLCanvasElement) {
      const ctx = canvas.getContext('2d');
      if (ctx) {

        ctx.clearRect(0, 0, this.trackWidth, this.trackHeight);
        const gradient = ctx.createLinearGradient(0, 0, this.trackWidth, 0);
        this.fills[index]
          .map((o) => {
            gradient.addColorStop(o.i, o.c);
          });

        if (value) {
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.rect(0, 0, value * this.trackWidth, this.trackHeight);
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  selectModel(value) {

    this.model = value;

    switch (this.model) {
      case RGB.MODEL:
        this._color = this._color.to(RGB.MODEL, false);
        this.ranges = [255, 255, 255, 1];
        this.createRGBFills();
        break;

      case HSL.MODEL:
        this.fills = [];

        this._color = this._color.to(HSL.MODEL, false);
        this.ranges = [360, 100, 100, 1];
        this.createHSLFills();

        break;

      case CMYK.MODEL:
        this._color = this._color.to(CMYK.MODEL, false);
        this.ranges = [100, 100, 100, 100, 1];
        this.createCMYKFills();

        break;

      case LAB.MODEL:
        this._color = this._color.to(LAB.MODEL, false);
        break;

      default:
        throw new Error('Color model not recognised');
    }

  }


  setChannel(value = 0, index = 0) {
    value = value * 1;
    if (isNaN(value)) {
      throw new Error('Channel set value invalid');
    }
    index = index * 1;
    if (isNaN(index) || index < 0 || index > this._color.channels.length) {
      throw new Error('Index set value invalid');
    }
    this._color.channels[index] = value;
    this.refresh();
  }

  refresh() {
    this.colorWeb = this._color.rgba;
    this.update.emit(this._color);
    this.updateBars();

  }

  ngOnDestroy() {

  }

}
