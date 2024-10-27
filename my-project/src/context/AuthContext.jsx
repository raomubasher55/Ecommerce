import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "", });
  const [users, setUsers] = useState([]);


  //get all user
  const getAllUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-all-user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while getting all user')
    }
  }

  //delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': auth.token
        },
      })
      const data = await response.json();
      if (data.success) {
        toast.success('user delete successfully');
        getAllUser();
      }
    } catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while getting all user')
    }
  }



  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.accessToken,
        tokenType: parseData.tokenType
      })
    }
  }, []);


  useEffect(() => {
    if (auth.token && auth?.user?.role ==1) {
      getAllUser();
    }
  }, [auth.token]);
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      users,
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
