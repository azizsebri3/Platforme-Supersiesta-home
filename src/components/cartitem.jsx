import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useCart } from "../context/cartProvider ";
import "../output.css";

const CartItem = () => {
  const { cartItems, setCartItems } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM yyyy 'at' hh:mm aa");
  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += Number(item.price) ; 
      });
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const removeFromCart = (productId) => {
    alert("u want to remove the product from the shopping Cart ?")
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="py-20 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #13432
        </h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-green-600">
          {formattedDate}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full lg:w-[60%] space-y-4 md:space-y-6 xl:space-y-8">
          {cartItems.map((item , index) => (
            <div
              key={item.id}
              className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full"
            >
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                {index+1}
              </p>
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-23">
                  <img
                    className="w-full hidden md:block"
                    src={item.image}
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col items-start  space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                      {item.desc}
                    </h3>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-xl dark:text-white  xl:text-xl leading-6">
                    د.ت {item.price}
                    {/* <span className="text-red-300 line-through">{item.price}</span> */}
                  </p>
                </div>
                <div className="flex">
                <button
                  type="button"
                  className="font-medium text-[#A5BB08]  hover:text-indigo-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Supprimer
                </button>
              </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-7  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Addition : 
          </h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div class="flex justify-between w-full">
              <p class="text-base dark:text-white leading-4 text-gray-800">
                Totale :
              </p>
              <p class="text-2xl text-bold dark:text-gray-300 leading-4 text-gray-600">
               {subtotal} د.ت 
              </p>
              
            </div>
          </div>
          <Link
            to={"/"}
            class="mt-6 md:mt-0 text-center hover:bg-[#A5BB08] dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base  leading-4 text-gray-800"
          >
            Retourner au Produits
          </Link>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Shipping
          </h3>
          <div class="flex justify-between items-center w-full">
            <p class="text-base dark:text-white leading-4 text-gray-800">
              Shipping
            </p>
            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
            8 د.ت 
            </p>
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
              Total
            </p>
            <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
              { subtotal == 0 ? 0 : subtotal+8 } د.ت 
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <div class="flex w-full justify-center items-center md:justify-start md:items-start">
              <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
