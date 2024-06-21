import React from "react";
import Modal from "@mui/material/Modal";

const InventoryInfo = ({ rol, handleCloseModal, open }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  

  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "8%",
    width:"20%",
  };

  const buttonStyle = {
    backgroundColor: "grey",
    borderColor: "grey",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
 
  };
const TextP={
  fontSize:20
}
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="rol-info-modal">
          <div>
            <h2 style={{ color: 'black'  }}>Information Inventory</h2>
            <hr />
            <p style={TextP}>
              <strong>Employee Name:</strong> {rol.EmployeeName}
            </p>
            <p style={TextP}>
              <strong>Email:</strong> {rol.Company}
            </p>
            <p style={TextP}>
              <strong>Rol:</strong> {rol.Role}
            </p>
            <p style={TextP}>
              <strong>Data Received:</strong> {rol.DateReceived}
            </p>
            <p style={TextP}>
              <strong>Brand:</strong> {rol.Brand}
            </p>
            <p style={TextP}>
              <strong>Model:</strong> {rol.Model}
            </p>
            <p style={TextP}>
              <strong>Seral Number:</strong> {rol.SerialNumber}
            </p>
            <p style={TextP}>
              <strong>Asset Name:</strong> {rol.AssetName}
            </p>

            <p style={TextP}>
              <strong>OS:</strong> {rol.Os}
            </p>

            <p style={TextP}>
              <strong>BitLocker:</strong> {rol.Bitlocker}
            </p>

            <p style={TextP}>
              <strong>Key BitLocker:</strong> {rol.key_BitLocker}
            </p>
            <p style={TextP}>
            <strong>Status:</strong>
            <span style={{ color: rol.Status === "Se fue" ? 'red' : (rol.Status === 'Slave' ? 'green' : 'black') }}>
                {rol.Status === null ? 'Activo' : rol.Status}
            </span>
        </p>
          </div>
          <button style={buttonStyle} onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryInfo;