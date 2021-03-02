import '../App.css';
import React from 'react'
import NavBar from './NavBar'
import MainPage from './MainPage'
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { useState, useEffect } from 'react'

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

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token)
      fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          // set the user in state
          setCurrentUser(user)
        });
    }
  }, []);

  // useEffect(() => {
  //   // GET /me
  //   const token = localStorage.getItem("token")
  //   console.log(token)
  //   fetch("http://localhost:3000/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((r) => {
  //       return r.json().then((data) => {
  //         if (r.ok) {
  //           return data;
  //         } else {
  //           throw data;
  //         }
  //       });
  //     })
  //     .then((user) => {
  //       // response => set user in state
  //       setCurrentUser(user);
  //     });
  // }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={10}>
                <MainPage setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </Grid>
          </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
