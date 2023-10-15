import * as React from "react";
import {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Button, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export enum DialogBoxMode {
    RESET_PASS = "Reset Password",
    DELETE_USER = "Delete User",
    DELETE_ROLE = "Delete Role",
}

export type DialogBoxData = {
    open: boolean;
    dialogTitle: string;
    dialogContext: string;
    txtId: string;
    txtLabel: string;
    txtType: string;
    actionBtnName: string;
    errorMessages: string[];
    id: number | null;
    value?: string;
}

export type DialogBoxAction = {
    onClose: React.Dispatch<SetStateAction<boolean>>;
    onCancel: React.Dispatch<SetStateAction<boolean>>;
    onConfirm: (args: number) => void;
}

type Props = {
    mode: DialogBoxMode;
    data: DialogBoxData;
    action: DialogBoxAction
}

const DialogBox = ({mode, data, action}: Props) => {
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>(" ");

    useEffect(() => {
        setInput("");
        setError(" ");
        setTimeout(()=>{
            if (document.getElementById(`${data.txtId}`) !== null) {
                // @ts-ignore
                document.getElementById(`${data.txtId}`).focus();
            }
        },500);

    },[data.open])

    const handleCancel = () => {
        action.onCancel(false);
        setInput("");
        setError(" ");
    }

    const handleAction = () => {
        if (error !== " ") {
            // @ts-ignore
            document.getElementById(`${data.txtId}`).focus();
            return;
        }
        if (!input) {
            // @ts-ignore
            document.getElementById(`${data.txtId}`).focus();
            setError(data.errorMessages[0]);
            return;
        }
        if (data.id !== null) {
            if (mode === DialogBoxMode.DELETE_USER) {
                action.onConfirm(data.id);
            } else if (mode === DialogBoxMode.RESET_PASS) {
                action.onConfirm(data.id);
            } else if (mode === DialogBoxMode.DELETE_ROLE) {
                action.onConfirm(data.id);
            }
        }
    }

    return (
        <>
            <Dialog fullWidth maxWidth={"xs"} open={data.open} onClose={() => {action.onClose(false)}}>
                <DialogTitle variant="h6">{data.dialogTitle}</DialogTitle>
                <DialogContent>
                    {
                        (mode === DialogBoxMode.DELETE_USER || mode === DialogBoxMode.RESET_PASS) && <DialogContentText pb={1} variant={"body1"}>
                            Please enter <i>{data.value}</i> as the email address.
                        </DialogContentText>
                    }
                    {
                        mode === DialogBoxMode.DELETE_ROLE && <DialogContentText pb={1} variant={"body1"}>
                            Please enter <i>{data.value}</i> as the role name.
                        </DialogContentText>
                    }
                    <DialogContentText>
                        {data.dialogContext}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id={data.txtId}
                        label={data.txtLabel}
                        type={data.txtType}
                        fullWidth
                        variant="standard"
                        error={(error !== " ")}
                        value={input}
                        helperText={error}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const {value} = event.target;
                            if (value.trim() === "") {
                                setError(data.errorMessages[0]);
                            }
                            else if (value !== data.value) {
                                setError(data.errorMessages[1]);
                            }
                            else (setError(" "));
                            setInput(value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleCancel}>Cancel</Button>
                    <Button variant={"contained"} onClick={handleAction}>{data.actionBtnName}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogBox;