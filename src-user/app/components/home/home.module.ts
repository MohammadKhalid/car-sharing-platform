import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MyCarsComponent } from '../my-cars/my-cars.component';
import { RegisteredCarsComponent } from '../registered-cars/registered-cars.component';
import { UnregisteredCarsComponent } from '../unregistered-cars/unregistered-cars.component';
import { MatTabsModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  declarations: [
    HomeComponent,
    MyCarsComponent,
    RegisteredCarsComponent,
    UnregisteredCarsComponent
  ]
})
export class HomeModule { }
