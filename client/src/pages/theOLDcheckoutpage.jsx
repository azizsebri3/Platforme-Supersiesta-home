// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";
// import axios from "axios";
// import validator from "validator";
// import { useCart } from "../context/cartProvider";
// import { useAppContext } from "../context/AppContext";
// import DialogCustomAnimation from "../components/dialog";
// import Loading from "../components/loading";
// import OtpPage from "./OtpPage";
// import logo from "../assets/logo.png";
// import "../output.css";
// import { useOtp } from "../context/OtpContext";

// const Checkout = () => {
//   const { cartItems, totalPrice, setCartItems } = useCart();
//   const { loading, setLoading } = useAppContext();
//   const { setOtp  , otpCorrect} = useOtp();
//   const [showDialog, setShowDialog] = useState(false);
//   const [showOtpPage, setShowOtpPage] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     prenom: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     prenom: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const location = useLocation();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const queryParams = new URLSearchParams(location.search);
//   //   const fromCart = queryParams.get("fromCart");
//   //   const fromOtp = queryParams.get("fromOtp");

//   //   if (!fromCart && !fromOtp ) {
//   //     navigate("/cart");
//   //   }
//   // }, [location.search, navigate]);

//   useEffect(() => {
//     const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (savedCartItems && !cartItems) {
//       setCartItems(savedCartItems);
//     }
//   }, [cartItems, setCartItems]);

//   useEffect(() => {
//     const formStored = localStorage.getItem("form");
//     if (formStored) {
//       setFormData(JSON.parse(formStored));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setFormErrors({ ...formErrors, [name]: "" });
//     localStorage.setItem(
//       "form",
//       JSON.stringify({ ...formData, [name]: value })
//     );
//   };

//   const addOrder = async () => {
//     try {
//       setLoading(true);
//       const data = {
//         client: formData,
//         products: cartItems.map((item) => ({
//           product: item.id,
//           quantity: item.quantity,
//         })),
//         totalPrice: totalPrice,
//         date: formattedDate,
//       };

//       const response = await axios.post("http://localhost:5001/addOrder", data);

//       setLoading(false);
//       if (response.status === 201) {
//         setShowDialog(true);
//         setTimeout(() => {
//           navigate("/");
//           localStorage.clear();
//           window.location.reload();
//         }, 1500);
        
//         console.log("Order placed successfully:", data);
//       } else {
//         console.error("Failed to place order:", response.statusText);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error placing order:", error.message);
//     }
//   };

//   const generateOTP = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:5001/generateOTP", {
//         email: formData.email,
//       });
//       if (response.status === 200) {
//         setOtp(response.data.otp);
//         setLoading(false);
//         setShowOtpPage(true);
//       } else {
//         console.error("Failed to generate OTP:", response.statusText);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error generating OTP:", error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowDialog(false);
//     setLoading(true);

//     let errors = {};
//     if (!formData.name.trim()) {
//       errors.name = "Le nom est requis";
//     }
//     if (!formData.prenom.trim()) {
//       errors.prenom = "Le prénom est requis";
//     }
//     if (!formData.email.trim()) {
//       errors.email = "L'email est requis";
//     } else if (!validator.isEmail(formData.email)) {
//       errors.email = "L'email est invalide";
//     }
//     if (!formData.phone.trim()) {
//       errors.phone = "Le numéro de téléphone est requis";
//     } else if (!/^\d{8}$/.test(formData.phone)) {
//       errors.phone = "Le numéro de téléphone doit comporter 8 chiffres";
//     }
//     if (!formData.address.trim()) {
//       errors.address = "L'adresse est requise";
//     }
//     setFormErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       try {
//         if(!otpCorrect){
//         const res = await axios.get(
//           `http://localhost:5001/clients/${formData.email}`
//         );
        
//         if (res.status === 200) {
//           addOrder();
//         } else if (res.status === 404) {
//           generateOTP(); // Generate OTP if email not found
//         }
//       }
//       else{
//         addOrder()
//       }
        
//       } catch (error) {
//         if (error.response && error.response.status === 404 && !otpCorrect) {
//           generateOTP(); // Generate OTP if email not found
//         } else {
//           console.error("Error:", error.message);
//           setLoading(false);
//         }
//       }
//     } else {
//       setLoading(false);
//     }
//   };

//   const formattedDate = format(new Date(), "do MMMM yyyy 'à' hh:mm aa", {
//     locale: fr,
//   });
//   return (
//     <div className="relative">
//       {!otpCorrect && showOtpPage  && (
//         <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-brightness-50 flex justify-center items-center">
//           <OtpPage email={formData.email} />
//         </div>
//       )}
//       <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
//         <Link
//           to={"/"}
//           className="inline-flex items-center border-black px-3 py-1.5 rounded-md text-black hover:bg-indigo-50"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="h-8 w-8 mr-2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M7 16l-4-4m0 0l4-4m-4 4h18"
//             ></path>
//           </svg>
//           <span className="font-bold text-xl text-black">Conforama</span>
//           <img src={logo} className="w-8 h-auto ml-2 mt-1" alt="Company Logo" />
//         </Link>
//       </div>
//       <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
//         <div className="px-4 pt-8">
//           <p className="text-[#a5bb08] text-xl font-bold">{formattedDate}</p>
//           <p className="text-xl font-medium">Résumé de la commande</p>
//           <p className="text-gray-400">
//             Vérifiez vos articles. Et choisissez un mode de livraison approprié.
//           </p>
//           <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col rounded-lg bg-white sm:flex-row"
//               >
//                 <img
//                   className="m-2 h-24 w-28 rounded-md border object-cover object-center"
//                   src={item.image}
//                   alt=""
//                 />
//                 <div className="flex w-full flex-col px-4 py-4">
//                   <span className="font-semibold">{item.name}</span>
//                   {/* <span className="float-right text-gray-400">{item.size}</span> */}
//                   <p className="text-lg font-bold">{item.price} د.ت</p>
//                   <p className="text-xl font-normal">
//                     Quantité : {item.quantity}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <p className="mt-8 text-lg font-medium">Modes de livraison</p>
//           <form className="mt-5 grid gap-6">
//             <div className="relative">
//               <input
//                 className="peer hidden"
//                 id="radio_1"
//                 type="radio"
//                 name="radio"
//                 defaultChecked
//               />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
//               <label
//                 className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
//                 htmlFor="radio_1"
//               >
//                 <img className="w-14 object-contain" src={logo} alt="" />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">
//                     Livraison Conforama
//                   </span>
//                   <p className="text-slate-500 text-sm leading-6">
//                     Livraison : 2-4 jours
//                   </p>
//                   <p className="text-slate-500 text-sm leading-6">
//                     Le paiement à la livraison
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </form>
//         </div>
//         <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
//           <p className="text-xl font-medium">Détails de paiement</p>
//           <p className="text-gray-400">
//             Finalisez votre commande en fournissant vos coordonnées de paiement.
//           </p>
//           <div className>
//             <form onSubmit={handleSubmit}>
//               <label
//                 htmlFor="name"
//                 className="mt-4 mb-2 block text-sm font-medium"
//               >
//                 Nom
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-md border ${
//                     formErrors.name ? "border-red-500" : "border-gray-200"
//                   } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]`}
//                   placeholder=""
//                 />
//                 {formErrors.name && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//                 )}
//               </div>
//               <label
//                 htmlFor="prenom"
//                 className="mt-4 mb-2 block text-sm font-medium"
//               >
//                 Prénom
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="prenom"
//                   name="prenom"
//                   value={formData.prenom}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-md border ${
//                     formErrors.prenom ? "border-red-500" : "border-gray-200"
//                   } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]`}
//                   placeholder=""
//                 />
//                 {formErrors.prenom && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.prenom}
//                   </p>
//                 )}
//               </div>
//               <label
//                 htmlFor="email"
//                 className="mt-4 mb-2 block text-sm font-medium"
//               >
//                 Courriel
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-md border ${
//                     formErrors.email ? "border-red-500" : "border-gray-200"
//                   } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]`}
//                   placeholder="votre.email@gmail.com"
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.email}
//                   </p>
//                 )}
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <label
//                 htmlFor="phone"
//                 className="mt-4 mb-2 block text-sm font-medium"
//               >
//                 Numéro de Télephone
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full rounded-md border pl-12  border-gray-200 px-4 py-3  text-sm  shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]"
//                   placeholder="26******"
//                 />
//                 {formErrors.phone && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.phone}
//                   </p>
//                 )}
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                   <svg
//                     viewBox="-60 -40 120 80"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#e70013"
//                     className="ml-1 h-6 w-6"
//                   >
//                     <path d="M-60-40H60v80H-60z" />
//                     <circle fill="#fff" r={20} />
//                     <circle r={15} />
//                     <circle fill="#fff" cx={4} r={12} />
//                     <path d="M-5 0l16.281-5.29L1.22 8.56V-8.56L11.28 5.29z" />
//                   </svg>
//                 </div>
//               </div>

//               <label
//                 htmlFor="address"
//                 className="mt-4 mb-2 block text-sm font-medium"
//               >
//                 Adresse de facturation
//               </label>
//               <div className="relative flex-shrink-0 sm:w-full">
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-[#A5BB08] focus:ring-[#A5BB08]"
//                   placeholder="Adresse"
//                 />
//                 {formErrors.address && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.address}
//                   </p>
//                 )}
//               </div>
//               <div className="mt-6 border-t border-b py-2">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-900">
//                     Expédition
//                   </p>
//                   <p className="font-semibold text-gray-900">8,00 د.ت</p>
//                 </div>
//               </div>
//               <div className="mt-6 flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-900">Total</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {totalPrice} د.ت
//                 </p>
//               </div>
//               {otpCorrect && <p className="font-bold text-green-500 text-xl">Email vérfier tu peux passer la commande maintenant ! </p>}
//               <button
//                 type="submit"
//                 className="mt-4 mb-8 w-full  rounded-md bg-[#A5BB08] hover:bg-[#87A922] px-6 py-3 font-medium text-white"
//               >
//                 Passer la commande
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       {showDialog && (
//         <DialogCustomAnimation title={"Commande enregistrée avec Succès"} />
//       )}

//       {loading && <Loading />}
//     </div>
//   );
// };

// export default Checkout;
