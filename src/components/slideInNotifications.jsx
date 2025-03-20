import React, { useEffect } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NOTIFICATION_TTL = 3000; // 3 secondes pour la durée d'affichage

const SlideInNotifications = ({ text, removeNotif, id }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      // Remove notification after time-to-live
      removeNotif && removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [removeNotif, id]);

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 right-0 z-[9999] p-3 m-3 md:p-4 md:m-4"
      >
        <div className="flex items-center bg-[#66BB6A] text-white rounded-lg shadow-lg overflow-hidden max-w-[90vw] md:max-w-md">
          <div className="flex-shrink-0 bg-[#43A047] p-8 md:p-4">
            <FiCheckSquare className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          
          <div className="p-5 pr-4 md:p-4 flex-grow">
            <p className="text-sm md:text-base font-medium truncate">
              <span className="font-bold">{text}</span> a été ajouté au panier
            </p>
          </div>
          
          {/* Option: Add close button */}
          <button 
            onClick={() => removeNotif && removeNotif(id)}
            className="p-3 text-white hover:text-gray-200"
            aria-label="Fermer la notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideInNotifications;