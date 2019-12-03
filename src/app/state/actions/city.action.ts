import { createAction, props } from '@ngrx/store';
import { City } from 'src/models/city';

export enum CityActionTypes {
    FETCH_CITY = "[CITY] Fetch City",
    FETCH_CITY_SUCCESS = "[CITY] Fetch City Success",
    FETCH_CITY_FAILURE = "[CITY] Fetch City Failed"
}

export const FetchCity = createAction(
    CityActionTypes.FETCH_CITY
)

export const FetchCitySuccess = createAction(
    CityActionTypes.FETCH_CITY_SUCCESS,
    props<{ cities: City[] }>()
)

export const FetchCityFailure = createAction(
    CityActionTypes.FETCH_CITY_FAILURE,
    props<{ error: any }>()
)