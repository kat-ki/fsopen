import {Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from "../../../types.ts";
import HospitalEntryInfo from "./HospitalEntryInfo.tsx";
import {FC} from "react";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo.tsx";
import OccupationalEntryInfo from "./OccupationalEntryInfo.tsx";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface EntryProps {
    entry: Entry
    diagnoses: Diagnosis[]
}

const EntryDetails: FC<EntryProps> = ({entry, diagnoses}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryInfo entry={entry as HealthCheckEntry} diagnoses={diagnoses}/>;
        case "Hospital":
            return <HospitalEntryInfo entry={entry as HospitalEntry} diagnoses={diagnoses}/>
        case "OccupationalHealthcare":
            return <OccupationalEntryInfo entry={entry as OccupationalHealthcareEntry} diagnoses={diagnoses}/>
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;

