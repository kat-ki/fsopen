import express, {Request, Response} from 'express';
import patientsService from "../services/patientsService";
import {errorMiddleware, parseNewEntry} from "../utils";
import {NewPatientEntry, Patient} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getPatientsExcludingSSN();
    res.send(patients);
});

router.get('/:id', async (req: Request, res: Response<Patient | { message: string }>) => {
    const {id} = req.params;
    try {
        const patientFound = await patientsService.getPatientById(id);
        if (!patientFound) {
            res.status(404).send({message: 'Patient not found'});
        } else {
            res.send(patientFound);
        }
    } catch (error) {
        res.status(500).send({message: 'Internal server error'});

    }
})

router.post('/', parseNewEntry, async (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = await patientsService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;