import { Component, OnInit, Input } from '@angular/core';
import { Culture } from 'color-culture';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {

  @Input() value: Culture;

  constructor() { }

  ngOnInit() {
  }

}
