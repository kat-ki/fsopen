import {Diagnosis, HealthCheckEntry, HealthCheckRating} from "../../../types.ts";
import {Favorite, MedicalInformation} from '@mui/icons-material';
import {TableContainer} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[]
}

const HealthCheckEntryInfo: React.FC<HealthCheckEntryProps> = ({entry, diagnoses}) => {
    const {date, description, healthCheckRating, diagnosisCodes, specialist} = entry;

    const getHeartColor = (healthCheckRating: HealthCheckRating): string => {
        switch (healthCheckRating) {
            case HealthCheckRating.Healthy:
                return 'green';
            case HealthCheckRating.LowRisk:
                return 'orange';
            case HealthCheckRating.HighRisk:
                return 'red';
            case HealthCheckRating.CriticalRisk:
                return 'darkred';
            default:
                return 'grey';
        }
    };

    return (
        <TableContainer component={Paper} sx={{marginTop: 2, border: '2px solid green'}}>
            <Table sx={{"& .MuiTableCell-root": {padding: "4px 8px"}, "& .MuiTableRow-root": {height: "24px"}}}>
                <TableHead>
                    <TableRow>
                        <TableCell><MedicalInformation/></TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Date:</TableCell>
                        <TableCell>{date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description:</TableCell>
                        <TableCell>{description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Health Rating:</TableCell>
                        <TableCell>
                            <Favorite sx={{color: getHeartColor(healthCheckRating)}}/>
                        </TableCell>
                    </TableRow>
                    {diagnosisCodes && (
                        <TableRow>
                            <TableCell>Diagnosis Codes:</TableCell>
                            <TableCell>
                                <ul>
                                    {diagnosisCodes?.map((code, index) => (
                                        <li key={index}>{code} {diagnoses?.map(d => d.code === code ? d.name : '')}</li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Diagnosed by:</TableCell>
                        <TableCell>{specialist}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default HealthCheckEntryInfo;
