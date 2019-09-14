import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';

import { RegisteredCarsService } from './services/registered-cars.service';
import { UnregisteredCarsService } from './services/unregistered-cars.service';
import { MyCarsService } from './services/my-cars.service';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { PaymentsService } from './services/payments.service';
import { TitleService } from './services/title.service';


export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 6 // this code enables only horizontal direction
    },
    pinch: {
      enable: false
    },
    rotate: {
      enable: false
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    RegisteredCarsService,
    UnregisteredCarsService,
    AuthService, MyCarsService,
    ProfileService,
    PaymentsService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
