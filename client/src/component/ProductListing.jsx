import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/productsSlice";
import CarouselSection from "./CarouselSection";
import { Card, Button } from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";
import "../style/ProductListing.css"
import config from "../../config";

const ProductListing = ({products,showCarousel=false}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }
     // If authenticated, add to cart
    dispatch(addToCart(product));
    console.log("Cart items : ",product);
  };
//   console.log(products);
// console.log(typeof products); 

if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <section className="py-5">
        {showCarousel && (
            <article className="mb-5">
                <CarouselSection/>
            </article>
        )}
        <article>
            <div className="container">
                <div className="row g-4">
                    {
                   products.map((product)=>(
                    <div key={product._id} className="col-12 col-sm-6 col-md-3 col-lg-3">
                    <Card className="plant-card neumorphic-card">
                      <Card.Img 
                        variant="top" 
                        // src={`http://localhost:5100${product.image}`} 
                        src={`${config.API_BASE_URL}${product.image}`}
                        alt={product.name}
                        className="plant-card-image"
                        loading="lazy"
                      
                      />
                      <Card.Body>
                        <Card.Title className="product-name">{product.name}</Card.Title>
                        <Card.Text>
                          AED {product.price}
                        </Card.Text>
                        <div className="plant-card-button-box">
                        <Button 
                          variant="success" 
                          onClick={() => handleAddToCart(product)}
                          className="plant-card-button"
                        >
                          Add to Cart
                        </Button>
                        <Link to={`/product-details/${product._id}`} className="btn btn-info mt-2
                        plant-card-link ">
                      View Details
                    </Link>
                    </div>
                      </Card.Body>
                    </Card>
                  </div>
                   ))

                    }
                </div>
            </div>
        </article>
    
  </section>
  )
};

export default ProductListing;
