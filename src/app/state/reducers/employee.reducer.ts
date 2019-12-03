import { Employee } from 'src/models/employee';
import { Action } from "@ngrx/store/src/models";
import * as EmployeeActions from 'src/app/state/actions/employee.action';
import { createReducer, on, createSelector } from "@ngrx/store";
import { EmployeeAppState } from '../app.state';

export interface EmployeeState {
    list: Employee[],
    loading: boolean,
    error: Error
}

export const initialEmployeeState = {
    list: [],
    loading: false,
    error: undefined
};

export const reducer = createReducer(
    initialEmployeeState,
    on(EmployeeActions.FetchEmployee, state =>
        (console.log('FetchEmployee reducer called'), {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.FetchEmployeeSuccess, (state, { employees }) => (
        (console.log('FetchEmployeeSuccess reducer called'),
            {
                ...state,
                list: employees,
                loading: false
            })),
    ),

    on(EmployeeActions.FetchEmployeeFailure, (state, { error }) => (
        (console.log('FetchEmployeeFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EmployeeActions.FetchEmployeeByID, state => (
        console.log('FetchEmployeeByID reducer called'),
        {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.FetchEmployeeByIDSuccess, (state, { employee }) => (
        (console.log('FetchEmployeeByIDSuccess reducer called'),
            {
                ...state,
                list: [employee],
                loading: false
            })),
    ),

    on(EmployeeActions.FetchEmployeeByIDFailure, (state, { error }) => (
        (console.log('FetchEmployeeByIDFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EmployeeActions.AddEmployee, state =>
        (console.log('AddEmployee reducer called'), {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.AddEmployeeSuccess, (state, { employee }) =>
        (console.log('AddEmployeeSuccess reducer called'), {
            ...state,
            list: [...state.list, employee],
            loading: false,
        })),

    on(EmployeeActions.AddEmployeeFailure, (state, { error }) => (
        (console.log('AddEmployeeFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        }))),

    on(EmployeeActions.EditEmployee, state =>
        (console.log('EditEmployee reducer called'), {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.EditEmployeeSuccess, (state, { employee }) => (
        (console.log('EditEmployeeSuccess reducer called'), {
            ...state,
            list: [...state.list, employee],
            loading: false,
        }))),

    on(EmployeeActions.EditEmployeeFailure, (state, { error }) => (
        (console.log('EditEmployeeFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        }))),

    on(EmployeeActions.DeleteEmployee, state =>
        (console.log('DeleteEmployee reducer called'), {
            ...state,
            loading: true,

        })),

    on(EmployeeActions.DeleteEmployeeSuccess, (state, { id }) =>
        (console.log('DeleteEmployeeSuccess reducer called'), {
            ...state,
            list: state.list.filter(item => item.employeeId !== id),
            loading: false,
        })),
);

export function employeeReducer(state: EmployeeState | undefined, action: Action) {
    return reducer(state, action);
}

const getEmployeeFeatureState = (state: EmployeeAppState) => state.employee;

export const getEmployees = createSelector(
    getEmployeeFeatureState,
    (state: EmployeeState) => state.list
);

export const getEmployeeByID = createSelector(
    getEmployeeFeatureState,
    (state: EmployeeState) => state.list[0]
);