import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarListComponent } from './car-list/car-list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { HomeComponent } from './home/home.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { ShowRentalsComponent } from './show-rentals/show-rentals.component';

const appRoutes: Routes = [
  {
    path: 'cars',
    component: CarListComponent,
    data: { title: 'Lista Aut' }
  },
  {
    path: 'add-car',
    component: AddCarComponent,
    data: { title: 'Dodaj Auto'}
  },
  {
    path: 'car/:id',
    component: CarDetailComponent,
    data: {title: 'Szczegóły auta'}
  },
  {
    path: 'myRentals',
    component: ShowRentalsComponent,
    data : {title: 'Moje wypozyczone auta'}
  },
  { path: '',
    component: HomeComponent,
    data: {title: 'Gdynia Car Rent'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarListComponent,
    AddCarComponent,
    HomeComponent,
    CarDetailComponent,
    ShowRentalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
