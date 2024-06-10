import { useState, useEffect, createContext, useContext , useCallback } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { toast } from "react-toastify";


const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const user = localStorage.getItem('auth');
  const parsedData = JSON.parse(user)
  const token = parsedData.accessToken;

  //get Single Product
  const getSingleProduct = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/single-product/${params.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (data.success) {
        setSingleProduct(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while getting single products')
    }
  }, [params.slug]);

  //Get All Products
  const getAllProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/get-product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (data.success) {
        setProducts(data?.products);
        const ids = data?.products.map(product => product._id);
        getImages(ids)
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
      toast.error('Somethine went wrong while getting products')
    }
  }

  //Create Products
  const createProduct = async (name, description, quantity, price, category, image, shipping) => {
    const productData = new FormData();
    productData.append('name', name)
    productData.append('description', description)
    productData.append('price', price)
    productData.append('quantity', quantity)
    productData.append('shipping', shipping)
    productData.append('image', image)
    productData.append('category', category)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/create-product/`, {
      method: "POST",
      // credentials: "include",
      headers: {
        'Authorization': token
      },
      body: productData
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getAllProducts();
      navigate('/dashboard/admin/products')
    } else {
      console.log(data);
      if (data.errors) {
        toast.error(data.errors[0].msg, {
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

    }
  };

  //Get Images
  const getImages = async (ids) => {
    const img = {};
    try {
      for (const id of ids) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/product-images/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        // console.log(data);
        img[id] = data.Image;
      }
      setImages(img)  
    }
    catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while getting images')
    }
  }

  //update Product
  const updateProduct = async (name, description, quantity, price, category, image, shipping , id) => {
    const productData = new FormData();
    productData.append('name', name)
    productData.append('description', description)
    productData.append('price', price)
    productData.append('quantity', quantity)
    productData.append('shipping', shipping)
    productData.append('image', image)
    productData.append('category', category || '')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/update-product/${id}`, {
      method: "PUT",
      // credentials: "include",
      headers: {
        'Authorization': token
      },
      body: productData
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getAllProducts();
      navigate('/dashboard/admin/products')
    } else {
      console.log(data);
      if (data.errors) {
        toast.error(data.errors[0].msg, {
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

    }
  };

  //delete Product
  const deleteProduct = async (id)=>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': token
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getAllProducts();
      navigate('/dashboard/admin/products')
    } else {
      console.log(data);
      if (data.errors) {
        toast.error(data.errors[0].msg, {
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

    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);


  return (
    <ProductContext.Provider value={{ products, createProduct, images , singleProduct , updateProduct , deleteProduct }} >
      {children}
    </ProductContext.Provider>
  );
};
const useProduct = () => {
  return useContext(ProductContext);
}

export { useProduct, ProductProvider }