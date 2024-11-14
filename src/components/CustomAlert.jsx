import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useWindowSize } from 'react-use';

function CustomAlert({ type, message, duration=5000 }) {
    const [open, setOpen] = useState(true);
    const { width } = useWindowSize();
    // severity = success, info, warning, error || variant = standard, outline, filled

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                variant={"standard"}
                sx={{ width: '100%', fontFamily: 'inherit', fontSize: '1.6rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert