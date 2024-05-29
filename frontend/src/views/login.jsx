import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate.push("/");
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