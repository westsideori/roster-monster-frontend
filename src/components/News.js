const News = () => {
    return (
        <div className="w3-display-container w3-card-4 w3-display-middle">
            <h1>Player News</h1>
            <iframe style={{height: "75vh", width: "75vw"}} is="x-frame-bypass" title="news" src="https://basketball.fantasysports.yahoo.com/nba/playernotes"></iframe>
        </div>
    )
}

export default News;