import { EmployeeState } from "./reducers/employee.reducer";
import { CityState } from './reducers/city.reducer';

export interface EmployeeAppState {
    readonly employee: EmployeeState;
}

export interface CityAppState {
    readonly city: CityState;
}

