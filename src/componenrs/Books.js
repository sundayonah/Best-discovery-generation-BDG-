import { addToBasket } from "@/slices/basketSlice"
import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
// import Currency from "react-currency-formatter"
import { FormattedNumber, IntlProvider } from "react-intl"

import { useDispatch } from "react-redux"

const MAX_RATING = 5
const MIN_RATING = 1

function Books({ id, title, price, description, category, image, pdf }) {
   const dispatch = useDispatch()

   const [rating, setRating] = useState(0)

   const [hasPrime, setHasPrime] = useState(true)

   useEffect(() => {
      setRating(
         Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
      )
      setHasPrime(Math.random() < 0.5)
   }, [])

   const addItemToBasket = () => {
      const book = {
         id,
         title,
         price,
         description,
         category,
         image,
         rating,
         hasPrime,
         pdf
      }
      //sending the book as an action to redux store
      dispatch(addToBasket(book))
   }
   return (
      <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded">
         <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {category}
         </p>

         <Image
            src={image}
            width={150}
            height={200}
            className="m-auto object-contain"
            alt="images"
         />
         <h4 className="my-3">{title}</h4>

         <div className="flex">
            {Array(rating)
               .fill()
               .map((_, i) => (
                  <StarIcon key={i} className="h-5 text-yellow-500" />
               ))}
         </div>

         <p className="text-xs my-2 overflow-hidden text-overflow-ellipsis">
            <span
               className="inline-block max-h-12 overflow-hidden"
               style={{ maxHeight: "3rem" }}
            >
               {description}
            </span>
         </p>
         <div className="mb-5">
            {/* <Currency quantity={price} currency="NGN" /> */}
            <IntlProvider locale="en-US">
               <div>
                  <FormattedNumber
                     value={price}
                     style="currency"
                     currency="NGN"
                  />
               </div>
            </IntlProvider>
         </div>
         <div>
         </div>
         <button onClick={addItemToBasket} className="mt-auto button">
            Add to Basket
         </button>
         {/* <a download href={pdf}>Download PDF</a> */}
      </div>
   )
}

export default Books
