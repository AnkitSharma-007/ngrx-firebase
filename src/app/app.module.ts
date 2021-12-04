import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EmployeeEffect } from "./state/effects/employee.effect";
import { EffectsModule } from "@ngrx/effects";
import { employeeReducer } from "./state/reducers/employee.reducer";

import { HomeComponent } from "./home/home.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { cityReducer } from "./state/reducers/city.reducer";
import { CityEffect } from "./state/effects/city.effect";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeFormComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    StoreModule.forRoot({
      employee: employeeReducer,
      city: cityReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([EmployeeEffect, CityEffect]),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "add-employee", component: EmployeeFormComponent },
      { path: "employee/edit/:id", component: EmployeeFormComponent },
      { path: "**", component: HomeComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
