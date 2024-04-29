import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../output.css";

const Propos = () => {
  return (
    <>
      <Helmet>
        <title>À Propos - SuperSiesta Home</title>
        <meta
          name="description"
          content="Découvrez notre histoire et notre engagement à fournir des matelas de haute qualité directement à votre porte avec un service de livraison rapide et fiable."
        />
      </Helmet>
      <div className="py-16 bg-white mt-10">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12 rounded-md">
              <img
                src="https://cdn.converty.shop/images/65fb088c06bd8831d1ba92b9_1711115342260_original.webp"
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
                Super Siesta est une société à responsabilité limitée (SARL)
                crée par Monsieur Neifar Fathi. Spécialisée dans la fabrication
                et la vente des matelas à ressorts de haute qualité, matelas
                mousse et ses dérivées. L'entreprise s’est lancée dans cette
                activité depuis 1993 après avoir acquis une grande expérience
                dans le monde du mousse et dérivés. Son capital social est de
                25.000.000DT.
              </p>
              <p className="mt-4 text-gray-600">
                {" "}
                Notre principal objectif consiste à satisfaire notre clientèle
                et à leur proposer une gamme de produits diversifiée qui
                répondra parfaitement à leurs différents besoins.
              </p>
              <div className="md:5/12 lg:w-5/12 ">
              <img
                src="https://cdn.converty.shop/images/65fb088c06bd8831d1ba92b9_1711115543043_original.webp"
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Propos;
