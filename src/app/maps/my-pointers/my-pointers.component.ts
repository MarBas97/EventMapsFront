import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyPointer, Pointer } from '@app/models';

@Component({
  selector: 'app-my-pointers',
  templateUrl: './my-pointers.component.html',
  styleUrls: ['./my-pointers.component.css']
})
export class MyPointersComponent implements OnInit {


  public subscribedControl: any;
  public dateSearchControl: FormControl = new FormControl('');
  public nameSearchControl: FormControl = new FormControl('');
  public likesSearchControl: FormControl = new FormControl('');
  public searchControl: FormControl = new FormControl('');

  public pointers: MyPointer[] = [];
  public visiblePointers: MyPointer[] = [];

  constructor() { }

  ngOnInit(): void {
    this.visiblePointers = this.pointers;

    this.dateSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });
    this.nameSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });
    this.likesSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });
  }

  showOnMap(pointer: Pointer) {

  }

  public filterSearchValues(): void {
    this.visiblePointers = this.pointers.filter((x) => {
      let canBeVisible = true;
      if (this.dateSearchControl.value !== '') {
        if (!x.created_on.toLocaleDateString().startsWith(this.dateSearchControl.value)) {
          canBeVisible = canBeVisible && false;
        }
      }
      if (this.nameSearchControl.value !== '') {
        if (!x.description.startsWith(this.nameSearchControl.value)) {
          canBeVisible = canBeVisible && false;
        }
      }
      if (this.likesSearchControl.value !== '') {
        if (!x.likes.toString().startsWith(this.likesSearchControl.value)) {
          canBeVisible = canBeVisible && false;
        }
      }

      return canBeVisible;
    });
  }
}
