import { Component, OnInit } from '@angular/core';
import { MyPointer, Pointer } from '@app/models';
import { Pointers } from '../mockPointers';

@Component({
  selector: 'app-my-pointers',
  templateUrl: './my-pointers.component.html',
  styleUrls: ['./my-pointers.component.css']
})
export class MyPointersComponent implements OnInit {


  pointers: MyPointer[]

  constructor() { }

  ngOnInit(): void {
    this.pointers = Pointers;
  }

  showOnMap(pointer: Pointer) {
    
  }
}
