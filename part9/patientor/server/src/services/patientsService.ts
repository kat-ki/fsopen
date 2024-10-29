import patients from '../data/patients';
import {NewPatientEntry, Patient, NonSensitivePatient} from "../types";
import {v1 as uuid} from 'uuid'

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsExcludingSSN = (): NonSensitivePatient[] => {
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

const getPatientById = (id: string): Patient | undefined=> {
    return patients.find(patient => patient.id === id);
}

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}

export default {getPatients, getPatientsExcludingSSN, addPatient, getPatientById}