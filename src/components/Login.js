const Login = () => {

    return (
        <div className="w3-display-container w3-display-middle w3-card-4" style={{width: '25%'}}>
                
            <form className="w3-container">
                <h2>Login</h2>
                <label className="w3-text-brown"><b>Username:</b></label>
                <input className="w3-input w3-border w3-sand" name="username" type="text"/>
                <label className="w3-text-brown"><b>Password:</b></label>
                <input className="w3-input w3-border w3-sand" name="password" type="password"/>
                <br></br>
                <button className="w3-btn w3-brown">Login</button>
            </form>

        </div>
    )
}

export default Login;