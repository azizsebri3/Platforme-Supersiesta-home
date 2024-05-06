import React, { useEffect } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NOTIFICATION_TTL = 2000; 

const SlideInNotifications = ({ text }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      // Remove notification after time-to-live
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ y: -15, scale: 0.4 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="p-2 m-5 flex fixed top-3 right-2 lg:mt-[130px] sm:mt-0 items-end rounded-lg z-[999999] gap-2 lg:text-xl sm:text-sm font-medium shadow-lg text-white bg-[#66BB6A] pointer-events-auto"
      >
        <FiCheckSquare className="mt-0.5" />
        <span>{text} a été ajouté au panier </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideInNotifications;
