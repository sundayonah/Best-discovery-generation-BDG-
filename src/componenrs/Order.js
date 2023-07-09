import moment from "moment"
import { FormattedNumber, IntlProvider } from "react-intl"
import { DownloadIcon } from '@heroicons/react/solid';
import { useState } from "react";


function Order({ id, amount, amountShipping, items, timestamp, images, pdf }) {
   const formattedDate = moment(timestamp).format("DD MMM YYYY")
   const [hoveredIndex, setHoveredIndex] = useState(null);

   console.log(pdf)


   return (
      <div className="relative border rounded-md">
         <div className="flex items-center space-x-10 p-5 bg-gray-200 text-sm text-gray-500">
            <div>
               <p className="font-bold text-xs">ORDER PLACED</p>
               <p>{formattedDate}</p>
            </div>
            <div>
               <p className="text-xs font-bold">TOTAL</p>
               <p>
                  <IntlProvider locale="en-US">
                     <FormattedNumber
                        value={amount}
                        style="currency"
                        currency="NGN"
                     />
                     {/* <Currency quantity={amount} currency="NGN" />  */}
                     {/* - Next Day Delivery
                     <FormattedNumber
                        value={amountShipping}
                        style="currency"
                        currency="NGN" 
                     /> */}
                  </IntlProvider>
                  {/* <Currency quantity={amountShipping} currency="NGN" /> */}
               </p>
            </div>
            <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
               {items.length}
               {' '}
               items
            </p>
            <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
              order id: {id}
            </p>
         </div>
         <div className="p-5 sm:p-10">
            <div className="flex space-x-6 overflow-x-auto">
               {/* {images.map((image, id) => (
                  <img
                     key={id}
                     src={image}
                     alt="images"
                     className="h-20 object-contain sm:h-32 cursor-pointer"
                  />
               ))} */}

                  {images.map((image, index) => (
                     <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                     >
                        <img
                           src={image}
                           alt="images"
                           className="h-20 object-contain sm:h-32"
                        />
                        {hoveredIndex === index && (
                           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                              <DownloadIcon className="h-10 w-10 text-white" />
                           </div>
                        )}
                     </div>
                  ))}
            </div>
            {/* <span> pdf {pdf}</span> */}
         </div>
      </div>
   )
}
export default Order
