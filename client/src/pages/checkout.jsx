import React, { useState, useEffect } from "react";
import "../output.css";
import { useCart } from "../context/cartProvider ";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};
    if (!formData.email) {
      errors.email = "Le champ Courriel est requis";
    }
    if (!formData.phone) {
      errors.phone = "Le champ Numéro de Télephone est requis";
    }
    if (!formData.address) {
      errors.address = "Le champ Adresse de facturation est requis";
    }

    // Set errors and prevent form submission if there are errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Proceed with form submission
      console.log("Form submitted:", formData);
      // You can add your logic to submit the form data here
    }
  };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fromCart = queryParams.get("fromCart");

    if (!fromCart) {
      // If user didn't come from the cart page, redirect them back to the cart page
      navigate("/cart");
    }
  }, [location.search, navigate]);

  return (
    <div>
      <div className="flex flex-col items-center pt-40 border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Conforama
        </a>
        <img src={logo} className="w-8 h-auto ml-2 mt-1" alt="Company Logo" />
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Résumé de la commande</p>
          <p className="text-gray-400">
            Vérifiez vos articles. Et choisissez un mode de livraison approprié.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.image}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  {/* <span className="float-right text-gray-400">{item.size}</span> */}
                  <p className="text-lg font-bold">{item.price} د.ت</p>
                  <p className="text-xl font-normal">
                    Quantité : {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg font-medium">Modes de livraison</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img className="w-14 object-contain" src={logo} alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Livraison Conforama
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Livraison : 2-4 jours
                  </p>
                  <p className="text-slate-500 text-sm leading-6">
                    Le paiement à la livraison
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Détails de paiement</p>
          <p className="text-gray-400">
            Finalisez votre commande en fournissant vos coordonnées de paiement.
          </p>
          <div className>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Courriel
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${
                    formErrors.email ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]`}
                  placeholder="votre.email@gmail.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              <label
                htmlFor="phone"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Numéro de Télephone
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]"
                  placeholder="Votre numéro de téléphone"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <label
                htmlFor="address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Adresse de facturation
              </label>
              <div className="relative flex-shrink-0 sm:w-full">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]"
                  placeholder="Adresse"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.address}
                  </p>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Expédition
                  </p>
                  <p className="font-semibold text-gray-900">8,00 د.ت</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalPrice} د.ت
                </p>
              </div>
              {/* Rest of the form fields */}
              <button className="mt-4 mb-8 w-full  rounded-md bg-[#A5BB08] hover:bg-[#87A922] px-6 py-3 font-medium text-white">
                Passer la commande
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
