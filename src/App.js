import './App.css';
import { Container, Typography } from '@material-ui/core';
import CompleteForm from './components/CompleteForm';

function App() {
  return (
    <Container maxWidth="sm" component="article">
      <Typography variant="h3" component="h2" align="center">_____________________</Typography>
      <Typography variant="h3" component="h1" align="center">NF Premium Flats</Typography>
      <CompleteForm onSend={onSendForm} />
    </Container>
  );
}

function onSendForm(data) {
  console.log(data);
}

export default App;
