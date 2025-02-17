import { createContext, useContext, useState } from "react";

// Context 생성
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [id, setId] = useState(null);

    return (
        <AuthContext.Provider value={{ id, setId }}>
            {children}
        </AuthContext.Provider>
    );
};

// Context를 쉽게 사용할 수 있도록 하는 Hook
export const useAuth = () => useContext(AuthContext);
