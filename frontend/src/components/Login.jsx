
const Login = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {
    return (
      <div className="login-view">
        <h2>Login</h2>
        <p>Demo credentials: bob - bob12</p>
        <form onSubmit={handleSubmit}>
          <div>
             username
            <input
              id='username'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
             password
            <input
              id='password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }


export default Login;