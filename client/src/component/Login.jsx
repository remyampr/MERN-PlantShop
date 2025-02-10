import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // For redirection after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(`${ config.API_BASE_URL}/api/auth/login`, {
        email,
        password,
       
      });

      // Extract the token and user details from the response
      const { token, User } = response.data;
      console.log("Token:: ",token,User)

      // Store token in localStorage (or sessionStorage)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(User)); // Store user details

        // Force a page reload to update authentication state
        window.location.href = '/cart';

      alert("Login successful!");

      // // Redirect user 
      // navigate("/");
      // // navigate("/cart"); 
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">
    <Form onSubmit={handleLogin}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">Login</Button>
    </Form>

    <div className="mt-3">
        <Button variant="link" onClick={() => navigate("/register")}>
          New user? Register here
        </Button>
      </div>

  </div>
  );
};

export default Login;
