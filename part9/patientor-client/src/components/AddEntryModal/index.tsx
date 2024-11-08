import {EntryWithoutId} from "../../types.ts";
import {Alert, Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import AddEntryForm from "./AddEntryForm.tsx";
import Diagnoses from "../../services/diagnoses.ts";


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
    id: string,
    diagnoses: Diagnoses[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, id, diagnoses }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Create new entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} id={id} diagnoses={diagnoses}/>
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;