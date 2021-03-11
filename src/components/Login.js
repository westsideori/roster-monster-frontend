import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setCurrentUser, currentUser }) => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_RAILS_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          // set errors to show errors in the form
          setErrors(data.errors);
        } else {
          // use the response to set state
          const { user, token } = data;
          localStorage.setItem("token", token);
          setCurrentUser(user);
          history.push("/rosters");
        }
      });
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <form onSubmit={handleLogin}>
        <Grid container>
          <Grid container item xs={4} />

          <Grid container item xs={4} spacing={3}>
            <Grid item>
              <Typography variant="h3" color="primary">
                Login
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid container xs={12} item direction="column">
              {errors.map((error, index) => {
                return (
                  <Grid item key={index}>
                    <Typography variant="body1" color="error">
                      {error}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={4} />
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
