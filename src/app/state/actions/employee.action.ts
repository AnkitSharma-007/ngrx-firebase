import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/models/employee';

export enum EmployeeActionTypes {
    FETCH_EMPLOYEE = "[EMPLOYEE] Fetch Employee",
    FETCH_EMPLOYEE_SUCCESS = "[EMPLOYEE] Fetch Employee Success",
    FETCH_EMPLOYEE_FAILURE = "[EMPLOYEE] Fetch Employee Failed",
    FETCH_EMPLOYEE_BY_ID = "[EMPLOYEE] Fetch Employee By ID",
    FETCH_EMPLOYEE_BY_ID_SUCCESS = "[EMPLOYEE] Fetch Employee By ID Success",
    FETCH_EMPLOYEE_BY_ID_FAILURE = "[EMPLOYEE] Fetch Employee By ID Failed",
    ADD_EMPLOYEE = '[EMPLOYEE] Add',
    ADD_EMPLOYEE_SUCCESS = "[EMPLOYEE] Add Employee Success",
    ADD_EMPLOYEE_FAILURE = "[EMPLOYEE] Add Employee Failed",
    EDIT_EMPLOYEE = '[EMPLOYEE] EDIT',
    EDIT_EMPLOYEE_SUCCESS = "[EMPLOYEE] EDIT Employee Success",
    EDIT_EMPLOYEE_FAILURE = "[EMPLOYEE] EDIT Employee Failed",
    DELETE_EMPLOYEE = "[EMPLOYEE] Delete Employee",
    DELTE_EMPLOYEE_SUCCESS = "[EMPLOYEE] Delete Employee Success",
    DELETE_EMPLOYEE_FAILURE = "[EMPLOYEE] Delete Employee Failed"
}

export const FetchEmployee = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE
)

export const FetchEmployeeSuccess = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE_SUCCESS,
    props<{ employees: Employee[] }>()
)

export const FetchEmployeeFailure = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE,
    props<{ error: any }>()
)

export const FetchEmployeeByID = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE_BY_ID,
    props<{ id: string }>()
)

export const FetchEmployeeByIDSuccess = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE_BY_ID_SUCCESS,
    props<{ employee: Employee }>()
)

export const FetchEmployeeByIDFailure = createAction(
    EmployeeActionTypes.FETCH_EMPLOYEE_BY_ID_FAILURE,
    props<{ error: any }>()
)

export const AddEmployee = createAction(
    EmployeeActionTypes.ADD_EMPLOYEE,
    props<{ employee: Employee }>()
)

export const AddEmployeeSuccess = createAction(
    EmployeeActionTypes.ADD_EMPLOYEE_SUCCESS,
    props<{ employee: Employee }>()
)

export const AddEmployeeFailure = createAction(
    EmployeeActionTypes.ADD_EMPLOYEE_FAILURE,
    props<{ error: any }>()
)

export const EditEmployee = createAction(
    EmployeeActionTypes.EDIT_EMPLOYEE,
    props<{ id: string, employee: Employee }>()
)

export const EditEmployeeSuccess = createAction(
    EmployeeActionTypes.EDIT_EMPLOYEE_SUCCESS,
    props<{ employee: Employee }>()
)

export const EditEmployeeFailure = createAction(
    EmployeeActionTypes.EDIT_EMPLOYEE_FAILURE,
    props<{ error: any }>()
)

export const DeleteEmployee = createAction(
    EmployeeActionTypes.DELETE_EMPLOYEE,
    props<{ id: string }>()
)
export const DeleteEmployeeSuccess = createAction(
    EmployeeActionTypes.DELTE_EMPLOYEE_SUCCESS,
    props<{ id: string }>()
)