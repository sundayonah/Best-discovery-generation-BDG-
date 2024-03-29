import moment from "moment"
import { FormattedNumber, IntlProvider } from "react-intl"
import { useState } from "react";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
   const formattedDate = moment(timestamp.toDate()).format("DD MMM YYYY");
   
   return (
      <div className="relative border rounded-md">
         <div className="flex items-center space-x-10 p-5 bg-gray-200 text-sm text-gray-500">
            {/* ... */}
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
                  </IntlProvider>
               </p>
            </div>
            <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
               {items.length}
               {' '}
               items
            </p>
            <p className="absolute top-2 right-2 w-40 lg:w-72 text-xs truncate whitespace-nowrap">
               <span className="float-right "> <strong>order id: </strong>{id}</span>
            </p>

         </div>
         <div className="p-5 sm:p-10">
         <div className='flex space-x-6 overflow-x-auto'>
                    {images?.map((image, index) =>
                        <img key={index} src={image} alt="" className='h-20 object-contain sm:h-32' />
                    )}
                </div>
         </div>
      </div>
   )
}
export default Order;
