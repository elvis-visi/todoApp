
import { Link } from 'react-router-dom';

const Login = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {
    return (
      <div className="login-view">
        <h2>Sign in</h2>
        <p>Demo credentials: bob - bob12</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id='username'
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div>
        
            <input
              id='password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
        <p>New to TodoApp? <Link to="/register" className="register-link">Create an account.</Link></p>
      </div>
    )
  }


export default Login;