import {Request, Response, NextFunction} from "express";
import {NewPatientEntry} from "./types";
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
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

export const addNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientEntrySchema.parse(object);
}


