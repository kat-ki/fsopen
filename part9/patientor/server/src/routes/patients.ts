import express, {Request, Response} from 'express';
import patientsService from "../services/patientsService";
import {errorMiddleware, parseNewEntry} from "../utils";
import {NewPatientEntry, Patient} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsExcludingSSN());
});

router.post('/', parseNewEntry, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;