import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/get-category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            if (data.success) {
                setCategories(data.category)
            } else {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Somethine went wrong while getting categories')
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])
    
    return (
        <CategoryContext.Provider value={{categories}}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => {
    return useContext(CategoryContext);
};

export { useCategory, CategoryProvider }