import {Request, Response, NextFunction} from "express";
import {NewDiaryEntry, Visibility, Weather} from "./types";
import {z} from "zod";

export const NewEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
});

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
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

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return NewEntrySchema.parse(object);
}

export default toNewDiaryEntry;
