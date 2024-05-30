 import React, { createContext, useState, useContext, useEffect } from "react";

 const AuthContext = createContext();

 export const useAuth = () => useContext(AuthContext);

 export const AuthProvider = ({ children }) => {
    const [meeple, setMeeple] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const fetchMeeple= async () => {
            if (token) {
                try {
                    const response = await fetch("endpoint", { //! modificare endpoint
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
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch("endpoint", { //! modificare endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                //setMeeple(data.meeple); //! da verificare se il backend restituisce i dati dell'utente insieme al token
            }
        } catch (error) {
            console.error("Error during login: ", error);
        }
    }

    const signup = async ({ name, surname, nickname, email, password }) => {
        try {
            const response = await fetch ("endpoint", { //! modificare endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, surname, nickname, email, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                //setMeeple(data.meeple);  //! da verificare se il backend restituisce i dati dell'utente insieme al token
            }
        } catch (error) {
            console.error("Error during sign-up", error)
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setMeeple(null); //! da verificare
    }

    return (
        <AuthContext.Provider value={{ meeple, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
 };