import { Button, Container, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InformationForm from './InformationForm';
import ValuePaid from './ValuePaid';
import ClipboardJS from 'clipboard';
import MyButton from './MyButton';

function CompleteForm({ onSend }) {

    const [actualStep, setActualStep] = useState(0);
    const [dataCollected, setDataCollected] = useState({});
    const forms = [
        <InformationForm onSend={dataCollect} />,
        <ValuePaid onSend={dataCollect} />,
        <Typography variant="h2" component={description} align="center"></Typography>
    ];

    useEffect(() => {
        if (actualStep === forms.length - 1) {
            onSend(dataCollected);
        }
    });

    function dataCollect(data) {
        setDataCollected({ ...dataCollected, ...data });
        next();
    }

    function next() {
        setActualStep(actualStep + 1);
    }

    function initialStep() {
        setActualStep(0);
    }

    var clipboard = new ClipboardJS('.btn');

    clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    function description() {
        const dataCheckin = fixDate(dataCollected.checkin);
        const dataCheckout = fixDate(dataCollected.checkout);
        const tax = taxCalc(dataCollected.valuePaid);

        function fixDate(date) {
            return date.split('-').reverse().join('/');
        }

        function taxCalc(valueP) {
            let dot = '.';
            let comma = ',';

            function splitString(stringToSplit, separator) {
                return stringToSplit.split(separator).join('');
            }

            let value1 = splitString(valueP, comma);
            let value2 = splitString(value1, dot);

            let valorCalculado = (parseFloat(value2)) * 0.001845;
            return parseFloat(valorCalculado);
        }

        return (
            <Container id="description">
                <h4>HOSPEDAGEM NO PERÍODO DE {dataCheckin} À {dataCheckout}</h4>
                <br />
                <br />
                <br />
                <h4>VALOR APROXIMADO DOS TRIBUTOS (18,45%) R${tax.toFixed(2)} - FONTE IBPT</h4>
                <Container
                    align="center"
                    style={{ 
                        "display": "flex", 
                        "justify-content": "space-between", 
                        "align-items": "stretch",
                        "margin-top": "50px",
                        "padding": "0"
                    }}
                >
                    <Button
                        data-clipboard-target="#description"
                        data-clipboard-demo
                        className="btn"
                        id="btnCopy"
                        variant="contained"
                        color="primary"
                        spacing="20px"
                        align="center"

                    >
                        COPIAR DESCRIÇÃO
                    </Button>
                    <MyButton
                        className='btn'
                        variant="contained"
                        onClick={initialStep}
                        align="center"
                    >
                        NOVA DESCRIÇÃO
                    </MyButton>
                </Container>
            </Container>
        );
    }

    return (
        <>
            <Stepper activeStep={actualStep}>
                <Step><StepLabel>Período</StepLabel></Step>
                <Step><StepLabel>Pagamento</StepLabel></Step>
                <Step><StepLabel>Descrição</StepLabel></Step>
            </Stepper>
            {forms[actualStep]}
        </>
    );
}

export default CompleteForm;