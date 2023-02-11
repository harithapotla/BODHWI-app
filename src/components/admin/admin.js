import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

const AdminComponenet = () => {
  const [modalData, setModalData] = useState({
    show: false,
    data: [],
    tenantName:''
  });

  const closeModal = ()=>{setModalData({...modalData, show:false})}
  const openModal = (name)=>{
    setModalData({...modalData, show:true, tenantName: name, data:[]})}
  return (
    <div>
      <h3> details of all the tenents with </h3>
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
          <tr onClick={()=>openModal("vivek")}>
            <td> Name </td>
            <td> check-in </td>
            <td> check-out </td>
            <td> break-fast </td>
            <td> lunch </td>
            <td> dinner </td>
          </tr>
        </tbody>
      </Table>
      <Modal size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={modalData.show} onHide={closeModal}>
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
          <tr>
            <td> vivek </td>
            <td> 8:00 </td>
            <td> 20:00</td>
            <td> 7:00 - 8:00 </td>
            <td> 13:00 - 14:00</td>
            <td> 20:00 - 21:00 </td>
          </tr>
        </tbody>
      </Table>
        </Modal.Body>
       
      </Modal>
    </div>
  );
};

export default AdminComponenet;
