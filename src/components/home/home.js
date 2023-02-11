import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import "./home.css";



const HomeComponent = () => {

    const [isChecked, setisChecked]= useState(false)

  return (
    <div className="wrapper text-center">
      <div> last recorded time check-in / check-Out 6:00PM on 22/10/2023</div>
      {isChecked ?  
        <Button variant="warning check-out" onClick={()=>setisChecked(false)}>Check-Out</Button>: 
        <Button variant="success check-in" onClick={()=>setisChecked(true)}>Check-IN</Button>
     }
      <Row className="my-4">
        <Col xs={4} className="my-2">
          <Form.Label for="bf-time"> Break Fast</Form.Label>
        </Col>
        <Col xs={6} className="my-2">
          <Form.Select id="bf-time">
            <option> 6:00 - 7:00</option>
            <option> 7:00 - 8:00</option>
            <option> 8:00 - 9:00</option>
          </Form.Select>
        </Col>
        <Col xs={4} className="my-2">
          <Form.Label for="lunch-time">Lunch</Form.Label>
        </Col>
        <Col xs={6} className="my-2">
          <Form.Select id="lunch-time">
            <option> 12:00-13:00</option>
            <option> 13:00-14:00</option>
            <option> 14:00-15:00</option>
          </Form.Select>
        </Col>
        <Col xs={4} className="my-2">
          <Form.Label for="dinner-time">Dinner</Form.Label>
        </Col>
        <Col xs={6} className="my-2">
          <Form.Select id="dinner-time">
            <option> 19:00-20:00</option>
            <option> 20:00-21:00</option>
            <option> 21:00-22:00</option>
          </Form.Select>
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>Date / Day</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td> 12/02/2023</td>
            <td>8:00 </td>
            <td>20:00</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default HomeComponent;
