
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, PointerCreatorDialog } from '@app/dialogs/add-pointer-dialog.component';
import { MyPointer } from '@app/models';
import { MapPointersService } from '@app/services/map-pointers.service';
import * as L from 'leaflet';
import { tileLayer, icon, Marker } from 'leaflet';

@Component({
  selector: 'app-mainmap',
  templateUrl: './mainmap.component.html',
  styleUrls: ['./mainmap.component.css']
})
export class MainmapComponent implements OnInit {

  private map: L.Map;
  private pointers: MyPointer[] = [];

  constructor(private pointerService: MapPointersService, public dialog: MatDialog) {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }


  ngOnInit(): void {

    this.map = L.map('mapid').setView([50.288599, 18.677326], 17);
    this.map.addLayer(tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }))
    this.map = this.map.locate({ setView: true, maxZoom: 16 });

    const that = this;
    this.map.on('moveend', (event) => {
      const center = event.target.getCenter();
      that.pointerService.getAreaPointers(center.lng, center.lat).subscribe(
        (pointers) => {
          for (const pointer of pointers) {
            if (that.pointers.findIndex(p => p.id === pointer.id) === -1) {
              L.marker([pointer.latitude, pointer.longitude]).addTo(that.map)
                .bindPopup(pointer.description + '\n' + 'Likes: ' + pointer.likes);
              that.pointers.push(pointer);
            }
          }
        }
      );
    });

    this.map.on('click', (event: any) => {
      const dialogRef = that.dialog.open(PointerCreatorDialog, {
        width: '250px',
        data: {description: ''}
      });

      dialogRef.afterClosed().subscribe((result: DialogData) => {
        if (result) {
          that.pointerService.addPointer(event.latlng.lng, event.latlng.lat, result.description).subscribe(
            (response) => {
              if (response.id > -1) {
                L.marker([event.latlng.lat, event.latlng.lng]).addTo(that.map)
                .bindPopup(result.description + '\n' + 'Likes: ' + 0);
                that.pointers.push(
                  {
                    id: 0,
                    latitude: event.latlng.lat,
                    longitude: event.latlng.lng,
                    description: result.description,
                    likes: 0,
                    created_on: new Date(),
                    created_by: null
                  }
                );
              }
            }
          );
        }
      });
    });
  }

}
