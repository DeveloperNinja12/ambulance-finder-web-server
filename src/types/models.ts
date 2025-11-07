import type doctorsData from '../jsonData/available-doctors-data.json';
import type ambulancesData from '../jsonData/available-ambulances-data.json';

export namespace Models {
    export type Doctor = (typeof doctorsData)[number];
    export type Ambulance = (typeof ambulancesData)[number];
}


