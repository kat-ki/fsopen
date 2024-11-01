import express, {Request, Response} from 'express';
import patientsService from "../services/patientsService";
import {errorMiddleware, parseDiagnosisCodes, parseNewEntry} from "../utils";
import {Entry, EntryWithoutId, NewPatientEntry, Patient} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getPatients();
    res.send(patients);
});
router.post('/', parseNewEntry, async (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = await patientsService.addPatient(req.body);
    res.json(addedPatient);
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
router.post('/:id/entries', async (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
    const {id} = req.params;
    const entryData = req.body;
    entryData.diagnosisCodes = parseDiagnosisCodes(req.body);
    try {
        const newEntry = await patientsService.addMedicalEntry(id, entryData);
        res.json(newEntry);
    } catch (error: unknown) {
        console.log('failed to add new medical entry. line 38 router')
        /* let errorMessage = 'Something went wrong.';
         if (error instanceof Error) {
             errorMessage += ' Error: ' + error.message;
         }
         res.status(400).send(errorMessage);*/
    }
});


router.use(errorMiddleware);

export default router;