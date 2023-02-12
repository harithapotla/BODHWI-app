import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, punchIn, punchOut } from "../redux/slice";
import "./home.css";

const HomeComponent = () => {
  const [isChecked, setisChecked] = useState(false);
  const [lastRecord, setLastRecord] = useState();
  const [messTime, setMessTime] = useState({bf:"", lunch: "", dinner:""})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var data= useSelector((store)=> store.counter.tenantsData)
  const loggedUsername =
    useSelector((store) => store.counter.loggedUsername) ||
    localStorage.getItem("loggedUsername") != undefined
      ? localStorage.getItem("loggedUsername")
      : "";
  useEffect(() => {
    if (!loggedUsername) {
      navigate("/login");
    }
  }, [loggedUsername]);

  var todayObj = new Date(); // thid will create a date object
  var DD = todayObj.getDate(); 
  var MM = todayObj.getMonth()+1;
  var YYYY = todayObj.getFullYear();
  var hh = todayObj.getHours();
  var mm = todayObj.getMinutes();
  var today = (DD > 9 ? DD: "0"+DD)+"/"+(MM > 9 ? MM: "0"+MM)+"/"+YYYY;
  console.log(todayObj)
  var time = (hh >9 ? hh: "0"+hh)+":"+(mm >9 ? mm: "0"+mm);

  const loggedUserData = useSelector(
    (store) =>
      store.counter.tenantsData.filter(
        (tenant) => tenant.Tname == loggedUsername
      )[0]?.timesheet
  );

  const logOut = () => {
    localStorage.clear();
    dispatch(logIn({ username: null }));
    navigate("/login");
  };

  useEffect(() => {
    const records = [...loggedUserData];
    records.sort((record) => new Date(record.date));
    setLastRecord(records[records.length - 1]);
  }, [loggedUserData]);

  useEffect(() => {
    if (lastRecord) {
      if (lastRecord.checkIn && lastRecord.checkOut) {
        setisChecked(false);
      } else if (!lastRecord.checkIn && lastRecord.checkOut) {
        setisChecked(false);
      } else if (lastRecord.checkIn && !lastRecord.checkOut) {
        setisChecked(true);
      } else setisChecked(false);
    }
  }, []);


  const handleCheck = (action)=>{
    if (action==="In"){ 
        dispatch(punchIn({ date: today, checkIn: time, state: data}))
        setisChecked(true)
    }
    if (action==="Out"){
        console.log({ date: today, checkOut: time})
        dispatch(punchOut({ date: today, checkOut: time, state: data}))
        setisChecked(false)
    }
  }

  const handleMessTimeChange =(e)=>{
    setMessTime({...messTime, [e.target.name]: e.target.value})
  }
  console.log(loggedUserData)
  console.log(messTime, "state")
  return (
    <React.Fragment>
      <div className={`text-end header`} onClick={logOut}>
        {loggedUsername}
      </div>
      <div className="wrapper text-center">
        <div className="Info-wrapper my-2">
          {lastRecord ? <h3>last recorded time {isChecked ? "Check-In":" Check-Out"} {isChecked ? lastRecord.checkIn : lastRecord.checkOut} on {lastRecord.date}</h3>
        : <h3>can't find your last records</h3>}
        </div>
        {isChecked ? (
          <Button
            variant="warning check-out"
            onClick={() => handleCheck("Out")}
          >
            Check-Out
          </Button>
        ) : (
          <Button variant="success check-in" onClick={() => handleCheck('In')}>
            Check-IN
          </Button>
        )}
        <Row className="my-4">
          <Col xs={4} className="my-2">
            <Form.Label htmlFor="bf-time"> Break Fast</Form.Label>
          </Col>
          <Col xs={6} className="my-2">
            <Form.Select id="bf-time" name="bf" value={messTime.bf} onChange={handleMessTimeChange}>
            <option value=""> Select an option</option>
              <option value="6:00-7:00"> 6:00-7:00</option>
              <option value="7:00-8:00"> 7:00-8:00</option>
              <option value="8:00-9:00"> 8:00-9:00</option>
            </Form.Select>
          </Col>
          <Col xs={4} className="my-2">
            <Form.Label htmlFor="lunch-time">Lunch</Form.Label>
          </Col>
          <Col xs={6} className="my-2" >
            <Form.Select id="lunch-time" name="lunch" value={messTime.lunch} onChange={handleMessTimeChange}>
              <option value=""> Selec an option</option>
              <option value="12:00-13:00"> 12:00-13:00</option>
              <option value="13:00-14:00"> 13:00-14:00</option>
              <option value="13:00-14:00"> 14:00-15:00</option>
            </Form.Select>
          </Col>
          <Col xs={4} className="my-2">
            <Form.Label htmlFor="dinner-time">Dinner</Form.Label>
          </Col>
          <Col xs={6} className="my-2">
            <Form.Select id="dinner-time" name="dinner" value={messTime.dinner} onChange={handleMessTimeChange}>
            <option value=""> Select an option</option>
              <option> 19:00-20:00</option>
              <option> 20:00-21:00</option>
              <option> 21:00-22:00</option>
            </Form.Select>
          </Col>
        </Row>
        {(messTime.bf && messTime.lunch && messTime.dinner) ? 
          <Button variant="primary" className="mb-3"> Save Preferences </Button> :(messTime.bf || messTime.lunch || messTime.dinner) ? 
          <p> Requires all 3 preferences</p> :""}        
          <Table responsive>
          <thead>
            <tr>
              <th>Date / Day</th>
              <th>Check-Out</th>
              <th>Check-In</th>
            </tr>
          </thead>
          <tbody>
            {loggedUserData &&
              loggedUserData.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.checkOut}</td>
                    <td>{record.checkIn}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default HomeComponent;
