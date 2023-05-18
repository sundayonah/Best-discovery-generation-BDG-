import { Carousel } from "react-responsive-carousel"

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      ></Carousel>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
export default Banner
