import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
	{
		path: 'dashboard', loadChildren: "./components/dashboard/dashboard.module#DashboardModule"
	},
	{ path: 'search', loadChildren: "./components/search/search.module#SearchModule" },
	{ path: '**', redirectTo: '/dashboard/home' }
];

@NgModule({
	imports: [RouterModule, RouterModule.forRoot(routes, {useHash: true})],
	exports: [
		RouterModule
	]
})
export class RoutingModule { }
