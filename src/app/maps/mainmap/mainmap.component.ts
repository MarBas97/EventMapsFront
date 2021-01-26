import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogData, PointerCreatorDialog } from '@app/dialogs/add-pointer-dialog.component';
import { MyPointer } from '@app/models';
import { AccountService } from '@app/services';
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
  private highlightedPointer = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  private highlightedPointerId = null;

  constructor(private pointerService: MapPointersService, private accountService: AccountService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
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

    const that = this;

    if (this.route.snapshot.queryParams.lat && this.route.snapshot.queryParams.lng) {
      this.map = L.map('mapid').setView([this.route.snapshot.queryParams.lat, this.route.snapshot.queryParams.lng], 17);
      this.map.addLayer(tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }));
      this.highlightedPointerId = this.route.snapshot.queryParams.id;
      const center = this.map.getCenter();
      this.getPointers(that, center);
    } else {
      this.map = L.map('mapid').setView([50.288599, 18.677326], 17);
      this.map.addLayer(tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }));
      this.map = this.map.locate({ setView: true, maxZoom: 16 });
    }



    this.map.on('moveend', (event) => {
      const center = event.target.getCenter();
      this.getPointers(that, center);
    });

    this.map.on('click', (event: any) => {
      const dialogRef = that.dialog.open(PointerCreatorDialog, {
        width: '250px',
        data: { description: '' }
      });

      dialogRef.afterClosed().subscribe((result: DialogData) => {
        if (result) {
          that.pointerService.addPointer(event.latlng.lng, event.latlng.lat, result.description).subscribe(
            (response) => {
              if (response.id > -1) {
                L.marker([event.latlng.lat, event.latlng.lng]).addTo(that.map)
                  .bindPopup(result.description + '<br>' + 'Likes: ' + 0);
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

  private getPointers(that, center): void {
    that.pointerService.getAreaPointers(center.lng, center.lat).subscribe(
      (pointers) => {
        for (const pointer of pointers) {
          if (that.pointers.findIndex(p => p.id === pointer.id) === -1) {
            const marker: any = +this.highlightedPointerId !== pointer.id
              ? L.marker([pointer.latitude, pointer.longitude])
              : L.marker([pointer.latitude, pointer.longitude], {icon: this.highlightedPointer});
            marker.id = pointer.id;

            marker.addTo(that.map)
              .bindPopup(pointer.description + '<br>' + 'Polubienia: ' + pointer.likes);
            marker.on('click', function (e) {
                if (pointer.created_by === that.accountService.userValue) {
                  console.log('Cannot like own pointer');
                  this.openPopup();
                  return;
                }
                that.pointerService.addLike(pointer.id)
                  .subscribe(value => {
                    if ((value as any).result === 'success') {
                      console.log('git');
                      pointer.likes = pointer.likes + 1;
                      that.map.eachLayer((layer: any) => {
                        if (layer.id && layer.id === pointer.id) {
                          layer._popup._content = pointer.description + '<br>' + 'Polubienia: ' + pointer.likes;
                          this.openPopup();
                        }
                      });
                    }
                    else {
                      console.log('nie git');
                    }
                  });
              });
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
            marker.on('mouseout', function (e) {
                this.closePopup();
            });
            that.pointers.push(pointer);
          }
        }
      }
    );
  }
}
