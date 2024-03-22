import React from "react";

const SlideInNotifications = ({ nameProduct }) => {
  return (
    <div class="bg-[#a5bb08] py-2 px-4 rounded-md text-white text-center fixed bottom-4 z-50 left-4 flex gap-4">
      <p>{nameProduct} a ajouté avec success ! </p>
      <span
        class="cursor-pointer font-bold"
        onclick="return this.parentNode.remove()"
      >
      </span>
    </div>
  );
};

export default SlideInNotifications;
