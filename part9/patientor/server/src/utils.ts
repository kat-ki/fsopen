import {NewPatientEntry} from "./types";

const addNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: object.name,
            dateOfBirth: object.dateOfBirth,
            ssn: object.ssn,
            gender: object.gender,
            occupation: object.occupation
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
}

export default addNewPatientEntry;

/*
{
    "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": "other",
    "occupation": "Technician"
}*/
