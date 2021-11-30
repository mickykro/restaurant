import logo from './logo.svg';
import { Grid } from '@material-ui/core';
import { Home } from './Screens/Home';
import './App.css';

function App() {
  return (<Grid container direction='column' alignItems='center'
    style={{
      backgroundImage: "url(https://www.pixeden.com/media/k2/galleries/220/002-wood-melamine-subttle-pattern-background-pat.jpg)",
      backgroundSize: 'auto',
      position: 'absolute',
      height:'100%',
      backgroundRepeat: 'repeat'
    }}>
    <h1>Poalim Restaurant</h1>
    <Home />
  </Grid >
  );
}

export default App;

