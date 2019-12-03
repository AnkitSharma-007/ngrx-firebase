import { Component, OnInit } from '@angular/core';
import { EmployeeAppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { EmployeeService } from '../services/employee.service';
import { FetchEmployee, DeleteEmployee } from '../state/actions/employee.action';
import { getEmployees } from '../state/reducers/employee.reducer';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empList$: Observable<Employee[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;

  constructor(private store: Store<EmployeeAppState>) { }

  ngOnInit() {
    this.store.dispatch(FetchEmployee());
    this.empList$ = this.store.pipe(select(getEmployees));
    this.loading$ = this.store.select(store => store.employee.loading);
  }

  delete(employeeID) {
    if (confirm('Are you sure you want to delete this employee record ??')) {
      this.store.dispatch(DeleteEmployee({ id: employeeID }));
    }
  }
}
