import { useState, useEffect , createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "",});

    useEffect(() => {
      const data =localStorage.getItem('auth');
      if(data){
        const parseData = JSON.parse(data);
        setAuth({
            ...auth,
            user: parseData.user,
            token: parseData.accessToken,
            tokenType: parseData.tokenType
        })
      }
    }, [])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
