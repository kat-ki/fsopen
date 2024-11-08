import {useParams} from "react-router-dom";
import {Diagnosis, Entry, EntryWithoutId, Gender, Patient} from "../../types.ts";
import patientService from "../../services/patients.ts";
import diagnosesService from "../../services/diagnoses.ts";
import {useEffect, useState} from "react";
import {Male, Female, Transgender} from '@mui/icons-material';
import EntryDetails from "../PatientDetails/entriesByType/EntryDetails.tsx";
import {Button} from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";


const PatientDetails = () => {
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (id) {
            const fetchPatient = async (id: string) => {
                try {
                    const patientData = await patientService.getPatientById(id);
                    setPatient(patientData);
                } catch (err) {
                    console.log('Failed to fetch patient data. Unknown id');
                }
            };

            fetchPatient(id);
        } else {
            console.log('Problem occurred reading ID');
        }
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const diagnosesData = await diagnosesService.getAllDiagnoses();
                setDiagnoses(diagnosesData);
            } catch (err) {
                console.log('Failed to fetch diagnoses data');
            }
        };

        fetchDiagnoses();
    }, []);

    if (!patient) return <div>No patient found</div>
    const openEntryModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (id: string, values: EntryWithoutId) => {
        try {
            const entry = await patientService.createEntry(id, values);
            setPatient((prevPatient: Patient) => ({
                ...prevPatient,
                entries: patient.entries?.concat(entry)
            }));
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    }

    return (
        <div>
            <h3>{patient.name} {patient.gender === Gender.Male ? <Male/> : patient.gender === Gender.Female ?
                <Female/> : <Transgender/>}</h3>
            <p><b>SSN: </b>{patient.ssn}</p>
            <p><b>Date of Birth: </b>{patient.dateOfBirth}</p>
            <p><b>Occupation: </b>{patient.occupation}</p>

            <Button variant="contained" onClick={() => openEntryModal()}>
                Add New Entry
            </Button>

            {patient.entries && patient.entries.length > 0 ? <h3>Entries:</h3> : ''}
            {patient.entries?.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
            ))}

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={(values) => submitNewEntry(id, values)}
                diagnoses={diagnoses}
                error={error}
                onClose={closeModal}
            />
        </div>
    );
};

export default PatientDetails;