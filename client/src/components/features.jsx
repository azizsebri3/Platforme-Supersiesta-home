import React from "react";

const Features = ({ infoItems }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-12 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 shadow p-4 md:p-6 text-center">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap flex-col p-5 items-center justify-center px-1 md:px-4 border shadow-[#192A7A] shadow-sm  rounded-full hover:shadow-[#A5BB08] border-gray-300 hover:scale-110 transition-transform duration-300"
            >
              <img className="w-10 h-10 " src={item.image} alt={item.alt} />

              <h1 className="mt-4 text-xl font-semibold text-[#A5BB08] dark:text-gray-300">
                {item.title}
              </h1>
              <p className="mt-2 text-[#192A7A] dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
