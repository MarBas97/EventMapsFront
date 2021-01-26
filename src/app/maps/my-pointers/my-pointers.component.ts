import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPointer, Pointer } from '@app/models';
import {MapPointersService} from '@app/services/map-pointers.service';

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

  public userPointers: MyPointer[];


  constructor(private mapPointerService: MapPointersService, private router: Router) { }

  ngOnInit(): void {
    this.userPointers = this.pointers;

    this.dateSearchControl.disable();
    this.dateSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });
    this.nameSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });
    this.likesSearchControl.valueChanges.subscribe((x) => {
      this.filterSearchValues();
    });

    this.mapPointerService.getUserPointers().subscribe(value => {this.userPointers = value; this.pointers = this.userPointers;});
  }

  public showOnMap(pointer: Pointer): void {
    console.log(pointer);

    this.router.navigate(['map/main'], {queryParams: {lat: pointer.latitude,  lng: pointer.longitude, id: pointer.id} });
  }

  public filterSearchValues(): void {
    this.userPointers = this.pointers.filter((x) => {
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
