import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MainmapComponent } from './mainmap/mainmap.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MyPointersComponent } from './my-pointers/my-pointers.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainmapComponent, MyPointersComponent, MapLayoutComponent],
  imports: [
    CommonModule,
    LeafletModule,
    MapsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MapsModule { }
