import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core'

function InformationForm({onSend}) {
    
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    
    return (
        <form onSubmit={event => {
            event.preventDefault();
            onSend({checkin, checkout});
        }}>
            <TextField
                id="checkin"
                value={checkin}
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Check - in"
                variant="outlined"
                margin="dense"
                onChange={event => setCheckin(event.target.value)}
                fullWidth
                required
                autoFocus
            />
            <TextField
                id="checkin"
                value={checkout}
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Check - out"
                variant="outlined"
                margin="dense"
                onChange={event => setCheckout(event.target.value)}
                fullWidth
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Próximo
            </Button>
        </form>
    );
}

export default InformationForm;