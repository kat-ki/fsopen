import patients from '../data/patients';
import {NewPatientEntry, Patient, PatientExcludingSSN} from "../types";
import {v1 as uuid} from 'uuid'

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsExcludingSSN = (): PatientExcludingSSN[] => {
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

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}

export default {getPatients, getPatientsExcludingSSN, addPatient}