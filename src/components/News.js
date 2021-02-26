import {Grid} from '@material-ui/core'

const News = () => {
    return (
        <Grid container justify="center" alignItems="center" direction="column">
            <h1>Player News</h1>
            <iframe style={{height: "75vh", width: "75vw"}} is="x-frame-bypass" title="news" src="https://basketball.fantasysports.yahoo.com/nba/playernotes"></iframe>
        </Grid>
    )
}

export default News;