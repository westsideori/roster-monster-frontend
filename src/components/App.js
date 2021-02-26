import '../App.css';
import React from 'react'
import NavBar from './NavBar'
import MainPage from './MainPage'
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import {useState} from 'react'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
    secondary: {
      main: "#212121",
    },
  },
});



function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <NavBar currentUser={currentUser} />
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={10}>
                <MainPage setCurrentUser={setCurrentUser}/>
            </Grid>
          </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
