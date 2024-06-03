import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [meeple, setMeeple] = useState(JSON.parse(localStorage.getItem("meeple") || "{}" ));
    // const [token, setToken] = useState(localStorage.getItem("token"));
    let token = localStorage.getItem("token");
    const meepleId = meeple._id;

    useEffect(() => {
        const fetchMeeple= async () => {
            if (token) {
                try {
                    const response = await fetch(`http://localhost:3001/api/meeples/${meeple._id}`, { //! modificare endpoint
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
                //setToken(data.token);
                setMeeple(data.meeple); //! da verificare se il backend restituisce i dati dell'utente insieme al token
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
                //setToken(data.token);
                setMeeple(data.meeple);  //! da verificare se il backend restituisce i dati dell'utente insieme al token
            }
        } catch (error) {
            console.error("Error during sign-up", error)
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("meeple");
        //setToken("");
        setMeeple(JSON.parse(localStorage.getItem("meeple") || "{}" )); //! da verificare
    }

    return (
        <AuthContext.Provider value={{ meeple, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};