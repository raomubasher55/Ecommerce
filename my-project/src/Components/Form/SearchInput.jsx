import React from 'react'
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';


const SearchInput = () => {
    const {value , setValue}= useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/search/${value.keyword}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            setValue({...value , results: data.result});
            navigate('/search')
        } catch (error) {
            console.log(error);
          }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                       
                    </div>
                    {/* <input value={value.keyword}  onChange={(e)=> setValue({...value, keyword:e.target.value})} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required /> */}
                    <input type="search" value={value.keyword} onChange={(e)=> setValue({...value , keyword:e.target.value})} placeholder="search" className="px-4 py-1 border rounded-full bg-input text-foreground" />
                    {/* <button type="submit" className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}

                </div>
            </form>
        </div>
    )
}

export default SearchInput
