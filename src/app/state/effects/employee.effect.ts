import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EmployeeService } from "src/app/services/employee.service";
import { mergeMap, map, catchError, tap, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import * as EmployeeActions from 'src/app/state/actions/employee.action';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffect {
    constructor(
        private actions$: Actions,
        private _employeeService: EmployeeService,
        private _router: Router,
    ) { }

    loadEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.FetchEmployee),
            switchMap(() =>
                this._employeeService.getAllEmployees().pipe(
                    map((employees) => EmployeeActions.FetchEmployeeSuccess({ employees })),
                    catchError(error => of(EmployeeActions.FetchEmployeeFailure({ error })))
                )
            )
        ),
    )

    loadEmployeeByID$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.FetchEmployeeByID),
            switchMap(({ id }) =>
                this._employeeService.getEmployeeById(id).pipe(
                    map((employee) => EmployeeActions.FetchEmployeeByIDSuccess({ employee })),
                    catchError(error => of(EmployeeActions.FetchEmployeeByIDFailure({ error })))
                )
            )
        ),
    )

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.AddEmployee),
            mergeMap(({ employee }) =>
                of(this._employeeService.saveEmployee(employee)).pipe(
                    map(() => EmployeeActions.AddEmployeeSuccess({ employee })),
                    tap(() => this._router.navigate(['/fetch-employee'])),
                    catchError(error => of(EmployeeActions.AddEmployeeFailure({ error })))
                ),
            )
        )
    )

    editEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.EditEmployee),
            mergeMap(({ id, employee }) =>
                of(this._employeeService.updateEmployee(id, employee)).pipe(
                    map(() => EmployeeActions.EditEmployeeSuccess({ employee })),
                    tap(() => this._router.navigate(['/fetch-employee'])),
                    catchError(error => of(EmployeeActions.EditEmployeeFailure({ error })))
                ),
            )
        )
    )

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.DeleteEmployee),
            mergeMap(({ id }) =>
                of(this._employeeService.deleteEmployee(id)).pipe(
                    map(() => EmployeeActions.DeleteEmployeeSuccess({ id })),
                )
            ),
        )
    )
}
