function Footer() {
   return (
      <div className="bg-gray-900 py-6">
         <div className="container mx-auto px-4">
            {/* <div className="flex justify-center m-4">
               <p className="text-white text-lg font-bold">FOOTER</p>
            </div> */}
            {/* <div className="flex justify-center">
               <ul className="flex space-x-4">
                  <li>
                     <a href="#" className="text-gray-300 hover:text-white">
                        Home
                     </a>
                  </li>
                  <li>
                     <a href="#" className="text-gray-300 hover:text-white">
                        About
                     </a>
                  </li>
                  <li>
                     <a href="#" className="text-gray-300 hover:text-white">
                        Services
                     </a>
                  </li>
                  <li>
                     <a href="#" className="text-gray-300 hover:text-white">
                        Contact
                     </a>
                  </li>
               </ul>
            </div> */}
            <div className="flex justify-center mt-4">
               <p className="text-gray-300 text-sm">
                  &copy; {new Date().getFullYear()} Your Website. All rights
                  reserved.
               </p>
            </div>
         </div>
      </div>
   )
}
export default Footer
