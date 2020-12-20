import { Component, Input, OnInit } from '@angular/core';
import { MyPointer, Pointer } from 'src/app/models';

@Component({
  selector: 'app-pointer-view',
  templateUrl: './pointer-view.component.html',
  styleUrls: ['./pointer-view.component.css']
})
export class PointerViewComponent implements OnInit {

  constructor() { }

  @Input() pointer: Pointer;

  ngOnInit(): void {
  }
}
