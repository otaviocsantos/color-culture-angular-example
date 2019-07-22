import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Color, CMYK } from 'color-culture';

@Component({
  selector: 'app-color-functions',
  templateUrl: './color-functions.component.html',
  styleUrls: ['./color-functions.component.css']
})
export class ColorFunctionsComponent implements OnInit, AfterViewInit {

  @ViewChild('cmykPicker', { static: true }) cmykPicker;
  stringed = `Color('Turquoise')`;
  currentColor = new CMYK([71.42857142857143, 0, 7.142857142857142, 12.15686274509804, 1]);
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cmykPicker.color = this.currentColor;
  }

  updateColor(event) {
    this.currentColor.channels = event.channels;

    this.stringed = `RGB('${this.currentColor.rgb().rgba}')`;
  }

}
