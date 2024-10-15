import patients from '../data/patients';
import {Patient, PatientExcludingSSN} from "../types";

export const getPatients = (): Patient[] => {
    return patients;
}

export const getPatientsExcludingSSN = (): PatientExcludingSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }
    });
}

export default {getPatients, getPatientsExcludingSSN}