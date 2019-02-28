import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'color-culture';

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  @Input() public color: Color;
  @Input() public label: string;
  @Input() public selected: boolean;

  constructor() { }

  ngOnInit() {
  }

}
