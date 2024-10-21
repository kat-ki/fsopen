import {Gender, NewPatientEntry} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}
const parseTextField = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing field data');
    }
    return text;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
}
const addNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseTextField(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseTextField(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseTextField(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
}

export default addNewPatientEntry;

