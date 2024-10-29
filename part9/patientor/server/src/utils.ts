import {Request, Response, NextFunction} from "express";
import {Gender, NewPatientEntry} from "./types";
import {z} from "zod";
export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.object({})).optional()
});

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
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

export const addNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientEntrySchema.parse(object);
}


