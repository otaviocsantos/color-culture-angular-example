import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { CMYK, Color, HSL, RGB, Culture, Relation, LAB } from 'color-culture';
import { MiniPickerComponent } from '../mini-picker/mini-picker.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, AfterViewInit {


  simple: Culture = new Culture();
  cmykSource: Color = new RGB('Gold');
  cmykPickerInit: Color = new CMYK([20, 80, 10, 16.25, 1]); // new CMYK([100, 10, 0, 0, 5]);
  @ViewChild('cmykPicker') cmykPicker: MiniPickerComponent;


  chained: Culture = new Culture();
  labSource: Color = new LAB([15, 33, 11, 1]);
  rgbPickerInit: Color = new RGB([20, 25, 18, 0]);
  @ViewChild('rgbPicker') rgbPicker: MiniPickerComponent;

  hslPickerInit: Color = new HSL([30, 0, 30, 0]);
  @ViewChild('hslPicker') hslPicker: MiniPickerComponent;

  constructor() {
    const origin = this.chained.addColor(this.labSource);
    const rgbRelation = this.chained.addRelation(this.rgbPickerInit, origin);
    this.chained.addRelation(this.hslPickerInit, rgbRelation);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.cmykPicker.color = this.cmykPickerInit;
    this.rgbPicker.color = this.rgbPickerInit;
    this.hslPicker.color = this.hslPickerInit;

    const simpleRelation0 = this.simple.addColor(this.cmykSource);
    this.simple.addRelation(this.cmykPicker.color, simpleRelation0);

  }

  updateRGB(event) {
    this.chained.items[1].modifier.channels = event.channels;
  }

  updateHSL(event) {
    this.chained.items[2].modifier.channels = event.channels;

  }


}
