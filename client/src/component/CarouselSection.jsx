import { Carousel } from "react-bootstrap";
import "../style/CarouselSection.css"

const CarouselSection = () => {
  return (
    <Carousel className="soft-ui-carousel">
      <Carousel.Item className="carousel-item-soft">
        <img
          className="d-block w-100"
          src="/images/carousel5.jpg"
          alt="Snake"
          loading="lazy"
        />
        <Carousel.Caption className="carousel-caption-soft">
          <h3>Serenity in Simplicity</h3>
          <p>Create a peaceful oasis with minimalistic indoor plants and natural beauty.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="carousel-item-soft">
        <img
          className="d-block w-100"
          src="/images/carousel1.jpg"
          alt="Pruning Shears"
          loading="lazy"
        />
        <Carousel.Caption className="carousel-caption-soft">
          <h3>Breathe in Green</h3>
          <p>Every leaf whispers peace—nature’s subtle way of refreshing the soul.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item  className="carousel-item-soft">
        <img
          className="d-block w-100"
          src="/images/carousel6.jpg"
          alt="spiderplant"
          loading="lazy"
        />
        <Carousel.Caption className="carousel-caption-soft">
          <h3>In Every Leaf, a Story</h3>
          <p>The delicate beauty of a leaf, a testament to nature's perfection.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselSection;
