import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

function ValuePaid({ onSend }) {

    const [valuePaid, setValuePaid] = useState("");
    const moneyMask = value => {
        return value
            .replace(/\D/g, "") // permite digitar apenas numero
            .replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos digitos
            .replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 13 digitos
            .replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 10 digitos
            .replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 7 digitos
            .replace(/(\d{1})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos ultimos 4 digito
    }

    return (

        <form onSubmit={event => {
            event.preventDefault();
            onSend({valuePaid});
        }}>
            <TextField
                id="valuepaid"
                value={valuePaid}
                type="money"
                label="Valor pago"
                variant="outlined"
                margin="dense"
                onChange={event => setValuePaid(moneyMask(event.target.value))}
                fullWidth
                required
                autoFocus
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Gerar Descrição NF
            </Button>
        </form>
    );
}

export default ValuePaid;