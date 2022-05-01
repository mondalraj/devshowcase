import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

function ImageSlider({ images }) {
  const settings = {
    showArrows: false,
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
  };
  return (
    <div className="w-full flex items-center drop-shadow-2xl	 md:mb-3 rounded-lg">
      <Carousel {...settings}>
        {images?.map((image, id) => {
          return (
            <div className="object-contain" key={id}>
              <Image
                src={`https://res.cloudinary.com/devshowcase/image/upload/${image}`}
                width={600}
                height={540}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
