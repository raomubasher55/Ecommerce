import React, { useState } from 'react'
import UserMenu from '../../Components/Layout/UserMenu'
import Layout from '../../Components/Layout/Layout'
import { useProduct } from '../../context/ProductContext'
import { toast } from 'react-toastify'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'
import ResponsiveUserMenu from '../../Components/Layout/ResponsiveUserMenu'

const WishList = () => {
  const { images, wishList, setWishList } = useProduct();
  const { cart, setCart } = useCart();   
   const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const moveToCart = (id) => {
    let myWishList = [...wishList];
    let cartItem;

    let newWishList = myWishList.filter((item => {
      if (item._id !== id) {
        return true;
      }
      else {
        cartItem = item;
      }
    }));
    setWishList(newWishList);

    localStorage.setItem('wishList', JSON.stringify(newWishList));


    if (cartItem) {
      setCart((pre) => [...pre, cartItem]);

      let currentCartitem = JSON.parse(localStorage.getItem('cart')) || [];

      currentCartitem.push(cartItem);

      localStorage.setItem('cart', JSON.stringify(currentCartitem));
    }
  }

  const toggleOnUserMenu = () => {
    setUserMenu(!userMenu)
}


  return (
    <Layout title='Wish List'>
      <div className="pt-20 grid grid-cols-5 gap-4">
        <div className="md:col-span-1 md:block none">
          <UserMenu />
        </div>
        {userMenu &&  <ResponsiveUserMenu toggleOnUserMenu={toggleOnUserMenu} />}
        <div className="md:col-span-4 col-span-5 w-full">
          <div className="container mx-auto p-4">
            <div className='flex flex-row   ' >
              <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleOnUserMenu(true)}  ><TiThMenu className='text-xl' /></div>
              <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">User Profile</h1>
            </div>
            <div className="space-y-4">
              {wishList.length > 0 ?
                wishList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center">
                      <img src={images[item._id] ? '/' + images[item._id] : `https://placehold.co/100x100`} alt="Blue Hoodie" className="md:w-24 md:h-24 w-12 h-12 rounded-md mr-4" crossOrigin="anonymous" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-sm text-muted-foreground">Quantity: 3</p>

                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">45 $</p>
                      <button onClick={() => moveToCart(item._id)} className="bg-blue-600 text-white hover:bg-blue-700 mt-2 md:p-2 p-1 md:text-md text-sm rounded-lg">Add to Cart</button>
                    </div>
                  </div>
                ))
                : (
                  <div>
                    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold text-foreground">Wishlist</h2>
                      <div className="flex flex-col items-center mt-4">
                        {/* <img src="/images/cart.png" alt="cartimage " /> */}
                        <img aria-hidden="true" alt="empty-cart-illustration" src="https://openui.fly.dev/openui/150x150.svg?text=🛒" />
                        <p className="mt-4 text-xl font-medium text-muted-foreground">Unfortunately, Your WishList is Empty</p>
                        <p className="text-sm text-muted-foreground">Please Add Somethings in your Cart</p>
                      </div>
                      <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Continue Shopping</button>
                    </div>

                  </div>
                )
              }
              {/* <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="flex items-center">
                  <img src="https://placehold.co/100x100" alt="Smart Apple Watch" className="mr-4 rounded-lg" />
                  <div>
                    <p className="font-semibold">Smart Apple Watch</p>
                    <p className="text-sm text-muted-foreground">Order id: 2323492398297348723</p>
                    <p className="text-sm text-muted-foreground">Color: Blue</p>
                    <p className="text-sm text-muted-foreground">Size: M</p>
                    <p className="text-sm text-muted-foreground">Quantity: 3</p>
                    <p className="text-sm text-muted-foreground">Place on: 21 Dec 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">Paid</p>
                  <p className="text-lg font-bold">55 $</p>
                  <button className="bg-accent text-accent-foreground hover:bg-accent/80 mt-2 p-2 rounded">Order</button>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default WishList
