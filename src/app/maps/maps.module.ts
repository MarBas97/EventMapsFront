import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MainmapComponent } from './mainmap/mainmap.component';
import { MapsRoutingModule } from './maps-routing.module';
import { PointerViewComponent } from './pointer-view/pointer-view.component';
import { MyPointersComponent } from './my-pointers/my-pointers.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';



@NgModule({
  declarations: [MainmapComponent, PointerViewComponent, MyPointersComponent, MapLayoutComponent],
  imports: [
    CommonModule,
    LeafletModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
