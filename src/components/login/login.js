import React from "react";
import { Button, Form } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Link, useNavigate } from "react-router-dom";

const LoginCompoenent = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Login</h1>
      <Form className="p-5">
        <Form.Control type="email" placeholder="Username" className="mb-3" />
        <Form.Control type="password" placeholder="Password" className="mb-3" />
        <Button variant="primary"
          type="submit"
          className="mb-3"
          size="lg"
          onClick={() => {
            navigate("/home");
          }}
        >
          Submit
        </Button>

        <Link to="/home" className="d-block mb-3">
          forgot Password?
        </Link>
      </Form>
    </div>
  );
};

export default LoginCompoenent;
