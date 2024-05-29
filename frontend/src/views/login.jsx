import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // React-router-dom hook to navigate between pages and access navigated pages history
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        history.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label> Email </label>
                <input 
                    type="email" 
                    value="{email}"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label> Password </label>
                <input 
                    type="password" 
                    value="{password}"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit"> Login </button>
        </form>
    );
};

export default Login;