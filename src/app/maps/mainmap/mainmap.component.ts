import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { tileLayer } from 'leaflet';

@Component({
  selector: 'app-mainmap',
  templateUrl: './mainmap.component.html',
  styleUrls: ['./mainmap.component.css']
})
export class MainmapComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    var mymap = L.map('mapid').setView([50.288599, 18.677326], 17);
    mymap.addLayer(tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }))
    mymap.locate({setView: true, maxZoom: 16});
  }
}
