 import React, { createContext, useState, useContext, useEffect } from "react";

 const AuthContext = createContext();

 export const useAuth = () => useContext(AuthContext);

 export const AuthProvider = ({ children }) => {
    const [meeple, setMeeple] = useState(null);

    useEffect(() => {
        const fetchUser= async () => {
            try {
                const response = await fetch("endpoint");
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMeeple(data);
            } catch (error) {
                console.error("Error fetching current meeple", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ meeple, setMeeple }}>
            {children}
        </AuthContext.Provider>
    );
 };