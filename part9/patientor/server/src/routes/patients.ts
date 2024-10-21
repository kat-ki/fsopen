import express from 'express';
import patientsService from "../services/patientsService";
import addNewPatientEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsExcludingSSN());
});

router.post('/:id', (req, res) => {
    try {
        const newPatient = addNewPatientEntry(req.body);
        const addedPatientEntry = patientsService.addPatient(newPatient);
        res.json(addedPatientEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;