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
import { CarHistoryComponent } from './car-history/car-history.component';
import { StatsComponent } from './stats/stats.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { AddRentalComponent } from './add-rental/add-rental.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PickUserComponent } from './pick-user/pick-user.component';
import { UserServiceService } from './user-service.service';
import { PostTestComponent } from './post-test/post-test.component';

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
  {
    path: 'stats',
    component: StatsComponent,
    data: {title: 'Statystyki'}
  },
  {
    path: 'postTest',
    component: PostTestComponent,
    data: {title: "Post test"}
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
    ShowRentalsComponent,
    CarHistoryComponent,
    StatsComponent,
    EditCarComponent,
    AddRentalComponent,
    AddUserComponent,
    PickUserComponent,
    PostTestComponent
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
  providers: [
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
