import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "../style/CartPage.css";
import { removeFromCart,addToCart, selectTotalPrice } from "../Redux/productsSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cart);
  // console.log("inside cart page : cart items :: ", cartItems);

  

  const totalPrice=useSelector(selectTotalPrice);
  // console.log("Total Price :",totalPrice);

  const handleDelete = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleAdd=(item)=>{
    dispatch(addToCart(item));
  }

  return (
    <section className="cart-container container">
      <Row>
        <Col xs={12} md={8} lg={8} className="left">
          <h2>My cart</h2>
            {/* Check if the cart is empty */}
        {cartItems.length === 0 ? (
          <Col xs={12}>
            <p className="empty-msg">Your cart is empty. Start adding some plants!</p>
            <Link to="/" className="btn  mt-2
                        plant-card-link ">
                      back to home
                    </Link>
          </Col>
        ) : (
          cartItems.map((item) => (
            <Col xs={12} md={10} lg={10} className="left" key={item._id}>
              <Card className="mb-3 cart-plant-card">
                <Row>
                  <Col md={3} className="cart-img-container">
                    <Card.Img
                      variant="top"
                      className="cart-plant-card-image"
                      src={`http://localhost:5100${item.image}`} 
                      alt={item.name}
                      loading="lazy"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Price: AED{item.price}</Card.Text>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                      </div >
                      <div className="d-flex align-items-center gap-2">
                      <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleAdd(item)}
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                          >
                            -
                          </Button>
                      <FaTrash
                        className="cart-delete-icon"
                        onClick={() => handleDelete(item._id)}
                      />
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        )}

        </Col>
        {/* ordersummary */}
        <Col xs={12} md={4} className="right">
          <Card className="order-summary-card">
            <Card.Body>
            <h3>Order Summary</h3>
            <ul className="list-unstyled">
                {
                    cartItems.map((item)=> (
                        <li key={item._id}
                        className="d-flex justify-content-between">
                            <span>{item.name} * {item.quantity }</span>
                            <span>AED {item.price * item.quantity}</span>

                        </li>
                    ))
                }

                </ul>
                <hr />
                <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>AED {totalPrice}</strong>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default CartPage;
