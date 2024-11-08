import {z} from "zod";
import {Gender, HealthCheckRating} from "./types";

const DiagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
});

const BaseEntrySchema = z.object({
    id: z.string(),
    date: z.string(),
    description: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema
});

const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional()
});

const EntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema
]);

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(EntrySchema).optional()
});