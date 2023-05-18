import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useEffect, useState } from "react"

const MAX_RATING = 5
const MIN_RATING = 1

function Books({ id, title, price, description, category, image }) {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )
  }, [])

  return (
    <div>
      <p>{category}</p>

      <img src={image} height={200} width={200} objectFit="contain" />
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5" />
          ))}
      </div>
    </div>
  )
}

export default Books
