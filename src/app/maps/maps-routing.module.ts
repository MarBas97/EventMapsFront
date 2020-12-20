import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainmapComponent } from './mainmap/mainmap.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import { MyPointersComponent } from './my-pointers/my-pointers.component';

const routes: Routes = [
    {
        path: '', component: MapLayoutComponent,
        children: [
            { path: 'mypointers', component: MyPointersComponent },
            { path: 'main', component: MainmapComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapsRoutingModule { }