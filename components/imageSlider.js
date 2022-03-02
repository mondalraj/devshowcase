import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

function ImageSlider() {
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
    <div className="w-full flex items-center">
      <Carousel {...settings}>
        <div className="object-contain">
          <Image
            src={
              "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            width={600}
            height={540}
          />
        </div>
        <div className="object-contain">
          <Image
            src={
              "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            width={600}
            height={540}
          />
        </div>
        <div className="object-contain">
          <Image
            src={
              "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            width={600}
            height={540}
          />
        </div>
        <div className="object-contain">
          <Image
            src={
              "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            width={600}
            height={540}
          />
        </div>
        <div className="object-contain">
          <Image
            src={
              "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            width={600}
            height={540}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default ImageSlider;
