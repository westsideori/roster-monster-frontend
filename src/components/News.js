import { Grid, Typography } from "@material-ui/core";

const News = () => {
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item xs={12}>
        <Typography variant="h3" color="primary">
          Player News
        </Typography>
        <iframe
          style={{ height: "75vh", width: "75vw" }}
          is="x-frame-bypass"
          title="news"
          src="https://basketball.fantasysports.yahoo.com/nba/playernotes"
        ></iframe>
      </Grid>
    </Grid>
  );
};

export default News;
