import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [meeple, setMeeple] = useState(JSON.parse(localStorage.getItem("meeple") || "{}" ));
    let token = localStorage.getItem("token");
    const meepleId = meeple._id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeeple= async () => {
            if (token) {
                try {
                    const response = await fetch(`http://localhost:3001/api/meeples/${meepleId}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setMeeple(data);
                } catch (error) {
                    console.error("Error fetching current meeple", error);
                }
            }
        };

        fetchMeeple();
    }, [meepleId, token]);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3001/api/meeples/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("meeple", JSON.stringify(data.meeple));
                setMeeple(data.meeple);
            }
        } catch (error) {
            console.error("Error during login: ", error);
        }
    }


    const signup = async ({ name, surname, nickname, email, password }) => {
        try {
            const response = await fetch ("http://localhost:3001/api/meeples/signup", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, surname, nickname, email, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("meeple", JSON.stringify(data.meeple));
                setMeeple(data.meeple);
            }
        } catch (error) {
            console.error("Error during sign-up", error)
        }
    };

    const googleLogin = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("accessToken");
        if (token) {
            localStorage.setItem("token", token);
            const decodedToken = jwtDecode(token);

            try {
                const response = await fetch(`http://localhost:3001/api/meeples/email/${decodedToken.email}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                localStorage.setItem("meeple", JSON.stringify(data));
                setMeeple(data);
            } catch (error) {
                console.error("Error fetching meeple data", error);
            }
        }
    }

    const logout = () => {
        if (meeple && meeple.googleId) {
            window.location.href = "'https://accounts.google.com/logout';"
        }
        localStorage.removeItem("token");
        localStorage.removeItem("meeple");
        setMeeple(JSON.parse(localStorage.getItem("meeple") || "{}" ));
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ meeple, login, googleLogin, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};