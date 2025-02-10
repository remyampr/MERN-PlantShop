import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="text-center mt-5">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn-primary">
      Go Back to Home
    </Link>
  </div>
);
  
}

export default ErrorPage