import Books from "./Books"
// import imgBanner from "../images/book6.jpg"

function BooksFeed({ books }) {
   // console.log(books)
   return (
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
         {books
            .map(({ id, title, price, description, category, image, pdf }) => (
               <Books
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  pdf={pdf}
               />
            ))}
      </div>
   )
}
export default BooksFeed;