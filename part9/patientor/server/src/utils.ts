import {Request, Response, NextFunction} from "express";
import {Diagnosis, NewPatientEntry} from "./types";
import {z} from "zod";
import {NewPatientEntrySchema} from "./schemas";


export const parseNewEntry = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({error: error.issues});
    } else {
        next(error);
    }
};

export const addNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientEntrySchema.parse(object);
}

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};


