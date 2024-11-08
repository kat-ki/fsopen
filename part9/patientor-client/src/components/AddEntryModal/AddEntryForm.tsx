import {FormEvent, useState} from "react";
import {Diagnosis, EntryWithoutId, HealthCheckRating} from "../../types.ts";
import {
    Box,
    Button, Checkbox,
    FormControl,
    Grid,
    InputLabel, ListItemText,
    MenuItem, OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Diagnoses from "../../services/diagnoses.ts";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    id: string,
    diagnoses: Diagnoses[]
}

interface RatingOption {
    value: HealthCheckRating;
    label: string;
}

const ratingOptions: RatingOption[] = Object.keys(HealthCheckRating)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
        value: HealthCheckRating[key as keyof typeof HealthCheckRating],
        label: key
    }));

const AddEntryForm = ({onCancel, onSubmit, diagnoses}: Props) => {
    const [entryType, setEntryType] = useState<string>('');

    const [date, setDate] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [specialist, setSpecialist] = useState<string>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    const [rating, setRating] = useState<HealthCheckRating | ''>('');

    const [dischargeDate, setDischargeDate] = useState<string>();
    const [dischargeCriteria, setDischargeCriteria] = useState<string>();

    const [employer, setEmployer] = useState<string>();
    const [sickLeaveStart, setSickLeaveStart] = useState<string>();
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>();

    const selectEntryType = (event: SelectChangeEvent<string>) => {
        setEntryType(event.target.value);
    };

    const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {target: {value},} = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };
    const addEntry = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newEntry;
        switch (entryType) {
            case "healthCheck":
                newEntry = {
                    type: "HealthCheck",
                    date,
                    description,
                    specialist,
                    diagnosisCodes,
                    healthCheckRating: rating
                };
                break;
            case "hospital":
                newEntry = {
                    type: "Hospital",
                    date,
                    description,
                    specialist,
                    diagnosisCodes,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
                break;
            case "occupation":
                newEntry = {
                    type: "OccupationalHealthcare",
                    date,
                    description,
                    specialist,
                    diagnosisCodes,
                    employerName: employer,
                    sickLeave: {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd
                    }
                };
                break;
            default:
                throw new Error('Invalid entry type')
        }
        onSubmit(newEntry);
    };
    const renderExtraFields = (entryType) => {
        switch (entryType) {
            case 'healthCheck':
                return (
                    <Select style={{marginTop: 20}}
                            label="Rating"
                            required
                            fullWidth
                            value={rating}
                            onChange={(event) => setRating(event.target.value as HealthCheckRating)}
                            displayEmpty>
                        <MenuItem
                            value=""
                            disabled>
                            Select Health Rating
                        </MenuItem>
                        {ratingOptions.map(option =>
                            <MenuItem
                                key={option.label}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>)}
                    </Select>
                );
            case 'hospital':
                return (
                    <>
                        <InputLabel htmlFor="discharge-date-field">Discharge date</InputLabel>
                        <TextField
                            id="discharge-date-field"
                            type="date"
                            required
                            fullWidth
                            value={dischargeDate}
                            onChange={({target}) => setDischargeDate(target.value)}
                        />
                        <TextField
                            label="Criteria for discharge"
                            required
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({target}) => setDischargeCriteria(target.value)}
                        />
                    </>

                );
            case 'occupation':
                return (
                    <>
                        <TextField style={{marginTop: 20}}
                                   label="Employer"
                                   required
                                   fullWidth
                                   value={employer}
                                   onChange={({target}) => setEmployer(target.value)}
                        />
                        <InputLabel htmlFor="discharge-date-field">
                            Sick leave Start
                        </InputLabel>
                        <TextField
                            type="date"
                            fullWidth
                            value={sickLeaveStart}
                            onChange={({target}) => setSickLeaveStart(target.value)}
                        />
                        <InputLabel htmlFor="discharge-date-field">
                            Sick leave End
                        </InputLabel>
                        <TextField
                            type="date"
                            fullWidth
                            value={sickLeaveEnd}
                            onChange={({target}) => setSickLeaveEnd(target.value)}
                        />
                    </>
                );
            default:
                return;
        }
    }

    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <FormControl sx={{m: 3}} fullWidth variant="standard">
                    <InputLabel id="entry-type-label">Choose entry type</InputLabel>
                    <Select labelId="entry-type-label" value={entryType} onChange={selectEntryType}>
                        <MenuItem value="healthCheck">Health Check</MenuItem>
                        <MenuItem value="hospital">Hospital</MenuItem>
                        <MenuItem value="occupation">Occupation</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {entryType &&
                <form onSubmit={addEntry}>
                    <TextField
                        type="date"
                        required
                        fullWidth
                        value={date}
                        onChange={({target}) => setDate(target.value)}
                    />
                    <TextField
                        label="Description"
                        required
                        fullWidth
                        value={description}
                        onChange={({target}) => setDescription(target.value)}
                    />
                    <TextField
                        label="Specialist"
                        required
                        fullWidth
                        value={specialist}
                        onChange={({target}) => setSpecialist(target.value)}
                    />
                    <InputLabel id="demo-multiple-checkbox-label">Codes</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        fullWidth
                        multiple
                        value={diagnosisCodes}
                        onChange={handleDiagnosisCodeChange}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {diagnoses?.map((d: Diagnosis, i: number) => (
                            <MenuItem key={i} value={d.code}>
                                <Checkbox checked={diagnosisCodes?.includes(d.code)}/>
                                <ListItemText primary={`${d.code} ${d.name}`}/>
                            </MenuItem>
                        ))}
                    </Select>

                    {renderExtraFields(entryType)}

                    <Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{float: "left"}}
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button style={{float: "right"}}
                                    type="submit"
                                    variant="contained">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            }
        </div>
    );
};

export default AddEntryForm;