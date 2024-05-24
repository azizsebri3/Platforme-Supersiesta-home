import React from "react";
import { Link } from "react-router-dom";

const Features = ({ infoItems }) => {
  return (
   
    <section className="py-24">
      <hr/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-10 lg:px-8 mb-10">
        <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
          <div className="relative w-full text-center lg:text-left lg:w-2/4">
            <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              Découvrez les Meilleurs Matelas
            </h2>
          </div>
          <div className="relative w-full text-center lg:text-left lg:w-2/4">
            <p className="text-lg font-normal text-gray-500 mb-5">
              Découvrez un confort inégalé avec nos matelas de qualité
              supérieure, livrés directement chez vous.
            </p>
            <a
              onClick={() => {document.getElementById("products").scrollIntoView( { behavior: "smooth" });}}
              className="flex flex-row cursor-pointer items-center justify-center gap-2 text-base font-semibold text-[#20327C] lg:justify-start hover:text-[#20327C]"
            >
              Achetez Maintenant{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#20327C]">
            <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3.5C8.6499 3.5 3.5 8.6499 3.5 15C3.5 21.3501 8.6499 26.5 15 26.5C21.3501 26.5 26.5 21.3501 26.5 15C26.5 8.6499 21.3501 3.5 15 3.5ZM15 24C9.7566 24 5.5 19.7434 5.5 15C5.5 10.2566 9.7566 6 15 6C20.2434 6 24.5 10.2566 24.5 15C24.5 19.7434 20.2434 24 15 24ZM15 5C9.4772 5 5 9.4772 5 15C5 20.5228 9.4772 25 15 25C20.5228 25 25 20.5228 25 15C25 9.4772 20.5228 5 15 5ZM15 23C10.0294 23 6 18.9706 6 14C6 9.0294 10.0294 5 15 5C19.9706 5 24 9.0294 24 14C24 18.9706 19.9706 23 15 23ZM15 13C14.4477 13 14 13.4477 14 14V16C14 16.5523 14.4477 17 15 17C15.5523 17 16 16.5523 16 16V14C16 13.4477 15.5523 13 15 13ZM15 7C14.4477 7 14 7.4477 14 8V10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10V8C16 7.4477 15.5523 7 15 7Z"
                  fill="#4F46E5"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Livraison à Domicile
            </h4>
            <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Profitez de la commodité de la livraison à domicile avec notre
              service rapide et fiable.
            </p>
          </div>
          <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#20327C]">
            <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1C7.8203 1 2 6.8203 2 14C2 21.1797 7.8203 27 15 27C22.1797 27 28 21.1797 28 14C28 6.8203 22.1797 1 15 1ZM15 25C8.9346 25 4 20.0654 4 14C4 7.9346 8.9346 3 15 3C21.0654 3 26 7.9346 26 14C26 20.0654 21.0654 25 15 25ZM15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5ZM15 23C10.0294 23 6 18.9706 6 14C6 9.0294 10.0294 5 15 5C19.9706 5 24 9.0294 24 14C24 18.9706 19.9706 23 15 23ZM15 11C14.4477 11 14 11.4477 14 12V18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18V12C16 11.4477 15.5523 11 15 11ZM15 7C14.4477 7 14 7.4477 14 8V9C14 9.5523 14.4477 10 15 10C15.5523 10 16 9.5523 16 9V8C16 7.4477 15.5523 7 15 7Z"
                  fill="#4F46E5"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Service Client 24/7
            </h4>
            <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Notre service client est disponible 24h/24 et 7j/7 pour vous aider
              avec toutes vos questions ou problèmes.
            </p>
          </div>
          <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#20327C]">
            <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1C8.8203 1 4 6.8203 4 14C4 21.1797 8.8203 27 15 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 15 1ZM15 25C9.4772 25 5 20.5228 5 15C5 9.4772 9.4772 5 15 5C20.5228 5 25 9.4772 25 15C25 20.5228 20.5228 25 15 25ZM15 13C14.4477 13 14 13.4477 14 14V16C14 16.5523 14.4477 17 15 17C15.5523 17 16 16.5523 16 16V14C16 13.4477 15.5523 13 15 13ZM15 7C14.4477 7 14 7.4477 14 8V10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10V8C16 7.4477 15.5523 7 15 7Z"
                  fill="#4F46E5"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Qualité Premium
            </h4>
            <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Nos matelas sont fabriqués avec des matériaux de la plus haute
              qualité pour garantir un sommeil confortable et reposant.
            </p>
          </div>
        </div>
      </div>
      <hr/>
    </section>
  );
};

export default Features;
