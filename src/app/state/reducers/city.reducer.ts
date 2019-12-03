import { createReducer, on, createSelector, Action } from "@ngrx/store";
import * as CityActions from 'src/app/state/actions/city.action';
import { City } from 'src/models/city';
import { CityAppState } from '../app.state';

export interface CityState {
    list: City[],
    error: Error
}

export const initialCityState = {
    list: [],
    error: undefined
};

const reducer = createReducer(
    initialCityState,
    on(CityActions.FetchCity, state => (
        (console.log('FetchCity reducer called'), {
            ...state,
        }))),

    on(CityActions.FetchCitySuccess, (state, { cities }) => (
        (console.log('FetchCitySuccess reducer called'), {
            ...state,
            list: cities
        }))),

    on(CityActions.FetchCityFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
)

export function cityReducer(state: CityState | undefined, action: Action) {
    return reducer(state, action);
}

const getCityFeatureState = (state: CityAppState) => state.city;

export const getCities = createSelector(
    getCityFeatureState,
    (state: CityState) => state.list
);