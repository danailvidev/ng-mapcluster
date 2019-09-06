import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MapComponent } from './map/map.component';

const routes: Routes = [
    { path: '', component: MapComponent }
];

export const LayoutRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class LayoutComponents {
    public static components = [
        MapComponent
    ];
}
