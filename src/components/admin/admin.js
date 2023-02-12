import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/slice";

const AdminComponenet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tenantsData = useSelector((store) => store.counter.tenantsData);
  const loggedUsername =
    useSelector((store) => store.counter.loggedUsername) ||
    localStorage.getItem("loggedUsername") != undefined
      ? localStorage.getItem("loggedUsername")
      : "";

  const [modalData, setModalData] = useState({
    show: false,
    data: {},
    tenantName: "",
  });
  var todayObj = new Date();
  var today =
    todayObj.getDate() +
    "/" +
    (todayObj.getMonth() + 1) +
    "/" +
    todayObj.getFullYear();
  var time = todayObj.getHours() + ":" + todayObj.getMinutes();


  const closeModal = () => {
    setModalData({ ...modalData, show: false });
  };
  const openModal = (name, index) => {
    const data = tenantsData[index];
    setModalData({ ...modalData, show: true, tenantName: name, data: data });
  };
  const logOut = () => {
    localStorage.clear();
    dispatch(logIn({ username: null }));
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className={`text-end header`} onClick={logOut}>
        {loggedUsername}
      </div>
      <div className="p-3">
        <h3 className="text-center">
          {" "}
          details of all the tenents for {today}{" "}
        </h3>
        <Table responsive>
          <thead>
            <tr>
              <th> Name </th>
              <th> check-in </th>
              <th> check-out </th>
              <th> break-fast </th>
              <th> lunch </th>
              <th> dinner </th>
            </tr>
          </thead>
          <tbody>
            {tenantsData &&
              tenantsData.map((tenant, index) => {
                const todayIndex = tenant.timesheet.findIndex(
                  (record) => record.date == today
                );
                const todayMessIndex = tenant.messAvailData.findIndex(
                  (record) => record.date == today
                );
                return (
                  <tr
                    key={index}
                    onClick={() => openModal(tenant.Tname, index)}
                  >
                    <td>{tenant.Tname}</td>
                    <td>
                      {todayIndex > -1
                        ? tenant.timesheet[todayIndex].checkIn
                        : "Yet to check in"}
                    </td>
                    <td>
                      {todayIndex > -1
                        ? tenant.timesheet[todayIndex].checkOut
                        : "Yet to check out"}
                    </td>
                    <td>
                      {todayMessIndex > -1
                        ? tenant.messAvailData[todayMessIndex].br
                        : "Yet to choose"}
                    </td>
                    <td>
                      {todayMessIndex > -1
                        ? tenant.messAvailData[todayMessIndex].lunch
                        : "Yet to choose"}
                    </td>
                    <td>
                      {todayMessIndex > -1
                        ? tenant.messAvailData[todayMessIndex].dinner
                        : "Yet to choose"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalData.show}
          onHide={closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {modalData.tenantName}'s time sheet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th> date </th>
                  <th> check-in </th>
                  <th> check-out </th>
                  <th> break-fast </th>
                  <th> lunch </th>
                  <th> dinner </th>
                </tr>
              </thead>
              <tbody>
                {modalData &&
                  modalData.data &&
                  modalData.data.timesheet &&
                  modalData.data.timesheet.map((record, index) => {
                    const messIndex = modalData.data.messAvailData.findIndex(
                      (messAvail) => messAvail.date === record.date
                    );
                    console.log(modalData.data.messAvailData[messIndex]);
                    return (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.checkIn}</td>
                        <td>{record.checkOut}</td>
                        <td>
                          {messIndex > -1
                            ? modalData.data.messAvailData[messIndex].bf
                            : "not choosen"}
                        </td>
                        <td>
                          {messIndex > -1
                            ? modalData.data.messAvailData[messIndex].lunch
                            : "not choosen"}
                        </td>
                        <td>
                          {messIndex > -1
                            ? modalData.data.messAvailData[messIndex].dinner
                            : "not choosen"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AdminComponenet;
