import { z } from 'zod';
import {NewPatientEntrySchema} from "./utils";

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type PatientExcludingSSN = Omit<Patient, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;
/*
export interface Patient extends NewPatientEntry {
    id: string
}*/
