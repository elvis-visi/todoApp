import { Link } from "react-router-dom";

const Register = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    handleNameChange,
    username,
    password,
    name
}) => {
    return (
        <div className="auth-view">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="auth-input-group">
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter username"
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="auth-button">Register</button>
            </form>
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in →</Link></p>
        </div>
    );
};

export default Register;
