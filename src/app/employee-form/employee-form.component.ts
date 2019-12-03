import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { City } from 'src/models/city';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeAppState, CityAppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { AddEmployee, EditEmployee, FetchEmployeeByID } from '../state/actions/employee.action';
import { getCities } from '../state/reducers/city.reducer';
import { FetchCity } from '../state/actions/city.action';
import { Observable } from 'rxjs';
import { getEmployeeByID } from '../state/reducers/employee.reducer';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  title = 'Create';
  employeeId: string;
  errorMessage: any;
  employee = new Employee();
  cityList$: Observable<City[]>;
  error$: Observable<Error>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<EmployeeAppState>,
    private cityStore: Store<CityAppState>
  ) {
    if (this.route.snapshot.params['id']) {
      this.employeeId = this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {
    this.cityStore.dispatch(FetchCity());
    this.cityList$ = this.cityStore.pipe(select(getCities));

    if (this.employeeId) {
      this.title = 'Edit';
      this.store.dispatch(FetchEmployeeByID({ id: this.employeeId }));
      this.store.pipe(select(getEmployeeByID)).subscribe(
        (result: Employee) => {
          if (result) {
            this.employee = result;
          }
        }
      )
    }
  }

  onEmployeeFormSubmit() {
    if (this.employeeId) {
      this.store.dispatch(EditEmployee({ id: this.employeeId, employee: this.employee }));
    } else {
      this.store.dispatch(AddEmployee({ employee: this.employee }));
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
