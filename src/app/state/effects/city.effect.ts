import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EmployeeService } from 'src/app/services/employee.service';
import * as CityActions from 'src/app/state/actions/city.action';
import { map, catchError, tap, switchMap } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable()
export class CityEffect {
    constructor(
        private actions$: Actions,
        private _employeeService: EmployeeService,
    ) { }

    loadCity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CityActions.FetchCity),
            switchMap(() =>
                this._employeeService.getCityList().pipe(
                    map((cities) => CityActions.FetchCitySuccess({ cities })),
                    catchError(error => of(CityActions.FetchCityFailure({ error })))
                )
            )
        ),
    )
}