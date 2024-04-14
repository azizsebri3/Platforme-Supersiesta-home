import React, { useState, useEffect } from "react";

export default function DialogCustomAnimation({
  title,
  handleConfirm = () => {},
  handleCancel = () => {},
}) {
  const isSuccess = title.includes("Commande enregistrée");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <>
      {isVisible && (
        <div className="container fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-15">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-md w-full">
            <button
              onClick={handleCancel}
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {isSuccess ? (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
              </h3>
              {!isSuccess && (
                <>
                  <button
                    onClick={handleConfirm}
                    type="button"
                    className={`text-white ${
                      title.includes("Confirmer")
                        ? "bg-green-600"
                        : "bg-red-600"
                    }  focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                  >
                    confirmer
                  </button>
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Non, annuler
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
