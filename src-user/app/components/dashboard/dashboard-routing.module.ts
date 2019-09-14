import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', loadChildren: "../home/home.module#HomeModule" },
            { path: 'sell', loadChildren: "../sell/sell.module#SellModule" },
            { path: 'payments', loadChildren: "../payments/payments.module#PaymentsModule" },
            { path: 'profile/:id', loadChildren: "../profile/profile.module#ProfileModule" },
            { path: 'search-results', loadChildren: "../search-results/search-results.module#SearchResultsModule" },
            { path: 'favourites', loadChildren: "../favourites/favourites.module#FavouritesModule" },
            { path: 'settings', loadChildren: "../settings/settings.module#SettingsModule" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }