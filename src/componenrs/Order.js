import moment from "moment"
import Currency from "react-currency-formatter"

function Order({ id, amount, amountShipping, items, timestamp, images }) {
   const formattedDate = moment(timestamp).format("DD MMM YYYY")

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
                  <Currency quantity={amount} currency="NGN" /> - Next Day
                  Delivery <Currency quantity={amountShipping} currency="NGN" />
               </p>
            </div>
            <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
               items
            </p>
         </div>
      </div>
   )
}
export default Order
