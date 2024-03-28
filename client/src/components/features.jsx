import React from "react";

const Features = ({ infoItems }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-12 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 border rounded-lg shadow p-4 md:p-6 text-center">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap flex-col items-center justify-center px-1 md:px-6"
            >
              <img className="w-10 h-10 " src={item.image} alt={item.alt} />

              <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-300">
                {item.title}
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
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
