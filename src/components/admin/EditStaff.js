import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

// Components
import { FormControlLabel, RadioGroup, Radio, Button } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: "5px",
    padding: ".3rem .8rem",
    overflowX: "hidden",
    overflowY: "scroll",
    height: "90vh",
  },
  uploadImageBox: {
    width: "18rem",
    justifySelf: "center",
    backgroundColor: "#D9D9D9",
    height: "18rem",
    display: "grid",
    color: "#636363",
    placeContent: "center",
    textAlign: "center",
    padding: "1rem",
    borderRadius: "4px",
    cursor: "pointer",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  label: {
    display: "block",
    fontFamily: "Product-Sans",
    fontSize: "1rem",
    margin: ".8rem 0 .4rem 0",
  },
  input: {
    fontFamily: "Product-Sans",
    padding: ".6rem .8rem",
    fontSize: ".9rem",
    width: "100%",
    borderRadius: "2px",
    outline: "none",
    border: "none",
  },
});

const EditStaff = () => {
  const classes = useStyle();
  const [file, setFile] = useState(null);
  const [staffInfo, setStaffInfo] = useState({
    employeeName: "",
    gender: "male",
    designation: "",
    phoneNumber: "",
    employeeSalary: "",
    employeeAddress: "",
    EmployeeIdNumber: "",
  });
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: ".8rem .4rem" }}
      >
        Add New
      </Button>

      {/* image upload start */}
      {file === null ? (
        <div {...getRootProps()} className={classes.uploadImageBox}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      ) : (
        <div className={classes.uploadImageBox}>
          <div
            {...getRootProps()}
            className={classes.uploadImageBox}
            style={{ position: "relative" }}
          >
            <input {...getInputProps()} />
            {/* {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )} */}
            <img
              src={typeof file === "object" ? URL.createObjectURL(file) : file}
              alt="item"
              style={{ height: "18rem", width: "18rem", borderRadius: "4px" }}
            />
            <p
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "#000000",
                color: "#fff",
                width: "100%",
                padding: ".4rem",
                margin: 0,
              }}
            >
              Upload Image
            </p>
          </div>
        </div>
      )}
      {/* image upload end */}

      {/* form */}
      <label htmlFor="employeeName" className={classes.label}>
        Employee Name
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.employeeName}
        placeholder="Employee Name"
        id="employeeName"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, employeeName: e.target.value });
        }}
      />

      <RadioGroup
        value={staffInfo.gender}
        onChange={(e) => setStaffInfo({ ...staffInfo, gender: e.target.value })}
      >
        <FormControlLabel
          value="female"
          control={<Radio color="primary" />}
          label="Female"
        />
        <FormControlLabel
          value="male"
          control={<Radio color="primary" />}
          label="Male"
        />
      </RadioGroup>

      <label htmlFor="designation" className={classes.label}>
        Designation
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.designation}
        placeholder="Designation"
        id="designation"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, designation: e.target.value });
        }}
      />

      <label htmlFor="phoneNumber" className={classes.label}>
        Phone Number
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.phoneNumber}
        placeholder="Phone Number"
        id="phoneNumber"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, phoneNumber: e.target.value });
        }}
      />

      <label htmlFor="employeeSalary" className={classes.label}>
        Employee Salary
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.employeeSalary}
        placeholder="Employee Salary"
        id="employeeSalary"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, employeeSalary: e.target.value });
        }}
      />

      <label htmlFor="employeeAddress" className={classes.label}>
        Employee Address
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.employeeAddress}
        placeholder="Employee Address"
        id="employeeAddress"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, employeeAddress: e.target.value });
        }}
      />

      <label htmlFor="employeeIdNumber" className={classes.label}>
        Employee Id Number
      </label>
      <input
        type="text"
        className={classes.input}
        value={staffInfo.employeeIdNumber}
        placeholder="Employee Id Number"
        id="employeeIdNumber"
        onChange={(e) => {
          setStaffInfo({ ...staffInfo, employeeIdNumber: e.target.value });
        }}
      />
      <div
        style={{
          margin: "0.8rem 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditStaff;
