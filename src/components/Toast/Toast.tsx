import { Alert, Snackbar } from "@mui/material";
import { ToastProps } from "./Interface";

const Toast = ({open, close, messageText, severity}:ToastProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        close();
    };


    return (
        <Snackbar open={open} autoHideDuration={400000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {messageText}
            </Alert>
        </Snackbar>
    );
}

export default Toast;