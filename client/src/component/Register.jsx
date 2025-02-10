// Register.jsx
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); // For redirection after registration

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:5100/api/auth/register", {
        email,
        password,
        name,
      });

      const { token, User } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(User)); // Store user details

      // Force a page reload to update authentication state
      window.location.href = '/cart';

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleRegister}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </Form.Group>
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

        <Button type="submit" variant="primary">Register</Button>
      </Form>
      <div className="mt-3">
        <Button variant="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
