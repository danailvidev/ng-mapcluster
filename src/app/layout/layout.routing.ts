import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    { path: '', component: LayoutComponent }
];

export const LayoutRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class LayoutComponents {
    public static components = [
        MapComponent,
        FooterComponent,
        LayoutComponent
    ];
}
