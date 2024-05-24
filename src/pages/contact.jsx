import React from "react";
import "../output.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contactez-nous</title>
        <meta
          name="description"
          content="Contactez-nous pour des questions, des suggestions ou des demandes de renseignements sur nos matelas de haute qualité."
        />
      </Helmet>
      <section
        className="min-h-screen bg-cover mt-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="flex flex-col min-h-screen  bg-black/60">
          <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
            <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
              <div className="text-white lg:w-1/2 lg:mx-6">
                <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
                  Supersiesta Home
                </h1>

                <p className="max-w-xl mt-6">
                  Nous vendons des matelas de haute qualité pour un sommeil
                  ultime. Contactez-nous pour des questions, des suggestions ou
                  des demandes de renseignements.
                </p>

                <div className="mt-6 md:mt-8">
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Nos informations
                    </h3>
                    <p className="mt-2 text-white">
                      Email : supersiestahome@gmail.com
                    </p>
                    <p className="mt-2 text-white">
                      Téléphone : +216 2695 6060
                    </p>
                  </div>
                  <h3 className="text-gray-300 mt-3">Follow us</h3>

                  <div className="flex mt-4 -mx-1.5">
                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-[#A2BA02]"
                      href="#"
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>

                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-[#A2BA02]"
                      href="#"
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.4003 14.4919 11.9294 14.4919ZM16.6667 4H7.192C5.97973 4 5 4.97973 5 6.192V15.6667C5 16.879 5.97973 17.8587 7.192 17.8587H16.6667C17.8789 17.8587 18.8587 16.879 18.8587 15.6667V6.192C18.8587 4.97973 17.8789 4 16.6667 4ZM17.848 15.6667C17.848 16.2757 17.2757 16.848 16.6667 16.848H7.192C6.58294 16.848 6.01067 16.2757 6.01067 15.6667V6.192C6.01067 5.58294 6.58294 5.01067 7.192 5.01067H16.6667C17.2757 5.01067 17.848 5.58294 17.848 6.192V15.6667Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:w-1/2 lg:mx-6">
                <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-xl">
                  <h1 className="text-lg font-medium text-gray-700">
                    Contactez-nous
                  </h1>

                  <form className="mt-6">
                    <div className="flex-1">
                      <label className="block mb-2 text-sm text-gray-600">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent rounded-md focus:border-blue-400 focus:bg-white focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Nom"
                      />
                    </div>

                    <div className="flex-1 mt-6">
                      <label className="block mb-2 text-sm text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent rounded-md focus:border-blue-400 focus:bg-white focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Email"
                      />
                    </div>

                    <div className="w-full mt-6">
                      <label className="block mb-2 text-sm text-gray-600">
                        Message
                      </label>
                      <textarea
                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent rounded-md md:h-48 focus:border-blue-400 focus:bg-white focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Message"
                      ></textarea>
                    </div>

                    <button className="flex items-center justify-between w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize bg-[#20327C] rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      <span>Envoyer</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 rtl:-scale-x-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 9.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 14H3a1 1 0 110-2h10.586l-1.293-1.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
