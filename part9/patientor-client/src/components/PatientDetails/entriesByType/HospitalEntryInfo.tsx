import {Diagnosis, HospitalEntry} from "../../../types.ts";
import {LocalHospital} from '@mui/icons-material';
import {TableContainer} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface HospitalEntryProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[]
}

const HospitalEntryInfo: React.FC<HospitalEntryProps> = ({entry, diagnoses}) => {
    const {date, description, diagnosisCodes, discharge, specialist} = entry;
    return (
        <TableContainer component={Paper} sx={{marginTop: 2, border: '2px solid black'}}>
            <Table sx={{"& .MuiTableCell-root": {padding: "4px 8px"}, "& .MuiTableRow-root": {height: "24px"}}}>
                <TableHead>
                    <TableRow>
                        <TableCell><LocalHospital/></TableCell>
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
                        <TableCell>Discharged on:</TableCell>
                        <TableCell>{discharge.date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Reason for discharge:</TableCell>
                        <TableCell>{discharge.criteria}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Diagnosed by:</TableCell>
                        <TableCell>{specialist}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HospitalEntryInfo;