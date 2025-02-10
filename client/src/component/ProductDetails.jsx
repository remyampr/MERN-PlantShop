import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { addToCart } from "../Redux/productsSlice";
import "../style/ProductDetails.css"

const ProductDetails = () => {

const {productId}=useParams();
const dispatch=useDispatch();
const products=useSelector((state)=>state.products.products);

const product = products.find((p) => p.id === Number(productId));

if (!product) {
  // console.log("inside Product details products array  :",products);
  // console.log("inside Product details product :",product);
  // console.log("inside Product details url id: ",productId);
  // console.log("inside Product details url id type: ",typeof(productId));
  return <p>Product not found!</p>;
 
}

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log("Cart items : ",product);
  };


  return (
<Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            fluid
            rounded
            className="product-image mb-4"
          />
        </Col>
        <Col md={6}>
          <Card className="soft-ui-card shadow-lg p-4">
            <Card.Body>
              <Card.Title className="text-center">{product.name}</Card.Title>
              <Card.Text className="text-center text-muted">{product.category}</Card.Text>
              <hr />
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Type: </strong>{product.type}</Card.Text>
              <Card.Text><strong>Water Level: </strong>{product.waterLevel}</Card.Text>
              <Card.Text><strong>Sunlight: </strong>{product.sunlightLevel}</Card.Text>
              <Card.Text><strong>Care Level: </strong>{product.easeOfCare}</Card.Text>
              <Card.Text><strong>Fertilization: </strong>{product.fertilization}</Card.Text>
              <Card.Text><strong>AED {product.price}</strong></Card.Text>
              <Button
                variant="success"
                onClick={() => handleAddToCart(product)}
                size="lg"
                className="w-100"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails