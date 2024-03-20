import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../output.css";

const Propos = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
            Notre Histoire : Du Confort à Votre Porte
            </h2>
            <p className="mt-6 text-gray-600">
              Notre entreprise spécialisée dans la vente de matelas de haute
              qualité propose un service de livraison à domicile rapide et
              fiable. Avec une large sélection de matelas adaptés à différents
              besoins de sommeil, notre équipe s'engage à garantir que votre
              achat vous parvienne dans les meilleurs délais, directement à
              votre porte. 
            </p>
            <p className="mt-4 text-gray-600">
              {" "}
              Nous visons à rendre l'expérience d'achat de matelas
              aussi pratique et agréable que possible pour nos clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propos;
