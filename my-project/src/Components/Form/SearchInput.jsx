import React, { useState } from 'react'
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import { useProduct } from '../../context/ProductContext';


const SearchInput = () => {
    const [query, setQuery] = useState('');
    // const { value, setValue } = useSearch();
    const navigate = useNavigate();
    const { productsList ,images } = useProduct();
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/search/${value.keyword}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const data = await response.json();
    //         setValue({ ...value, results: data.result });
    //         navigate('/search')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    const filterSearchData = productsList ? productsList.filter((obj) => 
        obj.name.toLowerCase().includes(query) || obj.description.toLowerCase().includes(query)
      ).slice(0, 8) : "";   


    // console.log(filterSearchData);
    const handleOnChange = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
    };

    return (
        <div>
            {/* <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                       
                    </div>
                    <input type="search" value={value.keyword} onChange={(e)=> setValue({...value , keyword:e.target.value})} placeholder="search" className="px-4 py-1 border rounded-full bg-input text-foreground" />
                   
                    <button type="submit" className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

                </div>
            </form> */}



            <div className="bg-card text-card-foreground p-4 rounded-lg max-w-lg mx-auto  ">
                <div className="relative">
                    <input
                        type="search"
                        value={query}
                        onChange={handleOnChange}
                        placeholder="search"
                        className="px-4 py-1 border rounded-full bg-input text-foreground"
                    />

                </div>

                <div className=" flex justify-center">
                    {query && <div className="block absolute bg-white shadow-lg w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
                        {filterSearchData.length > 0 ?
                            <>
                                {filterSearchData.map((item, index) => {
                                    return (
                                        <div key={index} className="py-2 px-2 cursor-pointer"
                                            onClick={() =>{ navigate(`/product/${item.slug}`); setQuery(false)}}>
                                            <div className="flex items-center gap-2">
                                                <img className="w-10" src={`/${images[item._id]}`} alt="image " />
                                                {item.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <>
                                <div className="flex justify-center">
                                    <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                                </div>
                            </>}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchInput
