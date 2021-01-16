import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MainmapComponent } from './mainmap/mainmap.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MyPointersComponent } from './my-pointers/my-pointers.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointerCreatorDialog } from '@app/dialogs/add-pointer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [MainmapComponent, MyPointersComponent, MapLayoutComponent, PointerCreatorDialog],
  imports: [
    CommonModule,
    LeafletModule,
    MapsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    PointerCreatorDialog
  ],
})
export class MapsModule { }
