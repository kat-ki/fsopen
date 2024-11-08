import {Diagnosis, OccupationalHealthcareEntry} from "../../../types.ts";
import {Work} from '@mui/icons-material';
import {TableContainer} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface OccupationalEntryProps {
    entry: OccupationalHealthcareEntry,
    diagnoses: Diagnosis[]
}

const OccupationalEntryInfo: React.FC<OccupationalEntryProps> = ({entry, diagnoses}) => {
    const {date, description, diagnosisCodes, employerName, sickLeave, specialist} = entry;
    return (
        <TableContainer component={Paper} sx={{marginTop: 2, border: '2px solid orange'}}>
            <Table sx={{"& .MuiTableCell-root": {padding: "4px 8px"}, "& .MuiTableRow-root": {height: "24px"}}}>
                <TableHead>
                    <TableRow>
                        <TableCell><Work/></TableCell>
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
                    {diagnosisCodes && (
                        <TableRow>
                            <TableCell>Diagnosis Codes:</TableCell>
                            <TableCell>
                                <ul>
                                    {diagnosisCodes.map((code, index) => (
                                        <li key={index}>{code} {diagnoses?.map(d => d.code === code ? d.name : '')}</li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Employer:</TableCell>
                        <TableCell>{employerName}</TableCell>
                    </TableRow>
                    {sickLeave && (
                        <>
                            <TableRow>
                                <TableCell>Sick leave start:</TableCell>
                                <TableCell>{sickLeave.startDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sick leave end:</TableCell>
                                <TableCell>{sickLeave.endDate}</TableCell>
                            </TableRow>
                        </>
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

export default OccupationalEntryInfo;