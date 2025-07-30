
export default function Footer() {
  return (
    <>
    <footer className="bg-gray-100 dark:bg-gray-800 pt-8 border-t border-blueGray-300 dark:border-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-bold text-blueGray-700 dark:text-white mb-3"><span><i className="fa-solid fa-cart-shopping pr-2 text-blue-600 dark:text-blue-400"></i></span>Fresh Cart</h4>
            <p className="text-2xl font-semibold text-blueGray-700 dark:text-gray-300 mb-3">Best Way to Shop Online</p>
            <div className="space-y-2">
              <p className="font-serif text-gray-600 dark:text-gray-400"><span><i className="pr-3 fa-solid fa-location-dot text-blue-600 dark:text-blue-400"></i></span> Cairo ,Egypt</p>
              <p className="font-serif text-gray-600 dark:text-gray-400"><span><i className="pr-3 fa-solid fa-envelope text-blue-600 dark:text-blue-400"></i>ahmedsamyalshmony1@gmail.com</span></p>
              <p className="font-serif text-gray-600 dark:text-gray-400"><span><i className="pr-3 fa-solid fa-phone-volume text-blue-600 dark:text-blue-400"></i></span>01284682092</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 pt-5 lg:pt-0">
            <h4 className="text-3xl font-semibold text-blueGray-700 dark:text-white">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600 dark:text-gray-400">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="flex mt-6 lg:mb-0 mb-6 space-x-3">
              <a target="_blank" href="https://github.com/Alashmony2" className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg text-3xl font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 transition-colors" type="button">
                <i className="fab fa-github"></i></a>
                <a target="_blank" href="https://www.linkedin.com/in/ahmed-alashmony-90b133253/" className="bg-white dark:bg-gray-700  hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg text-3xl font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 transition-colors" type="button">
                <i className="fa-brands fa-linkedin"></i></a>
                <a target="_blank" href="https://www.facebook.com/ahmedsamyalashmony/" className="bg-white dark:bg-gray-700  hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg font-normal h-10 w-10 text-3xl flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 transition-colors" type="button">
                <i className="fa-brands fa-facebook"></i></a>
                
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className="p-10 flex-wrap items-center md:justify-between justify-center bg-gray-200 dark:bg-gray-900">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 dark:text-gray-400 font-semibold py-1">
              Copyright © <span id="get-current-year">2025 </span>
              <a className="text-blueGray-500 dark:text-gray-400 hover:text-blueGray-800 dark:hover:text-white transition-colors"> Ahmed Alashmony</a>
            </div>
          </div>
        </div>
    </>
  )
}
