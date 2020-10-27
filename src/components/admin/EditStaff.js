import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

// Components
import { FormControlLabel, RadioGroup, Radio, Button } from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//actions
import { fetchEmployee } from "./../../actions/admin";

//Utils
import FormData from "form-data";

// API
import axios from "axios";
//variable
import { baseURL } from "./../../variables";

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

const EditStaff = (props) => {
    const classes = useStyle();
    const [file, setFile] = useState(null);
    const [btnText, setBtnText] = useState({
        addNew: "Add New",
        saveChanges: "Save Changes",
    });
    const [staffInfo, setStaffInfo] = useState({
        employeeName: "",
        gender: "male",
        designation: "",
        phoneNumber: "",
        employeeSalary: "",
        employeeAddress: "",
        employeeIdNumber: "",
    });
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        setFile(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const { selectedStaff } = props;

    useEffect(() => {
        if (selectedStaff !== null) {
            setFile(selectedStaff.img);
            setStaffInfo({
                employeeName: selectedStaff.name,
                gender: selectedStaff.gender,
                designation: selectedStaff.designation,
                phoneNumber: selectedStaff.phoneNo,
                employeeSalary: selectedStaff.employeeSalary,
                employeeAddress: selectedStaff.address,
                employeeIdNumber: selectedStaff.employeeIdNumber,
            });
        }
    }, [selectedStaff]);

    const handleAddNew = () => {
        setBtnText({ ...btnText, addNew: "Please Wait..." });

        let employee = new FormData();
        employee.append("img", file);
        employee.append("name", staffInfo.employeeName);
        employee.append("gender", staffInfo.gender);
        employee.append("designation", staffInfo.designation);
        employee.append("phoneNo", staffInfo.phoneNumber);
        employee.append("employeeSalary", staffInfo.employeeSalary);
        employee.append("address", staffInfo.employeeAddress);
        employee.append("employeeIdNumber", staffInfo.employeeIdNumber);
        employee.append("token", props.staff.token);

        axios
            .post(`${baseURL}/api/v1/employee/createEmployee`, employee)
            .then((res) => {
                alert("Employee Created successfully");
                props.fetchEmployee();
                setBtnText({ ...btnText, addNew: "Add New" });
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setBtnText({ ...btnText, addNew: "Add New" });
            });
    };

    const handleSaveChanges = () => {
        setBtnText({ ...btnText, saveChanges: "Please Wait..." });

        let employee = new FormData();
        employee.append("img", file);
        employee.append("name", staffInfo.employeeName);
        employee.append("gender", staffInfo.gender);
        employee.append("designation", staffInfo.designation);
        employee.append("phoneNo", staffInfo.phoneNumber);
        employee.append("employeeSalary", staffInfo.employeeSalary);
        employee.append("address", staffInfo.employeeAddress);
        employee.append("employeeIdNumber", staffInfo.employeeIdNumber);
        employee.append("token", props.staff.token);

        if (selectedStaff === null) {
            alert("Please Select the dish before editing");
            setBtnText({ ...btnText, saveChanges: "Save Changes" });
            return;
        }
        employee.append("_id", selectedStaff._id);

        axios
            .put(`${baseURL}/api/v1/employee/updateEmployee`, employee)
            .then((res) => {
                props.fetchEmployee();
                setBtnText({ ...btnText, saveChanges: "Save Changes" });
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setBtnText({ ...btnText, saveChanges: "Save Changes" });
            });
    };

    return (
        <div className={classes.container}>
            <Button
                variant="contained"
                color="primary"
                style={{ margin: ".8rem .4rem" }}
                onClick={handleAddNew}
                disabled={
                    btnText.addNew.toLowerCase().includes("please wait")
                        ? true
                        : false
                }
            >
                {btnText.addNew}
            </Button>

            {/* image upload start */}
            {file === null ? (
                <div {...getRootProps()} className={classes.uploadImageBox}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
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
                            src={
                                typeof file === "object"
                                    ? URL.createObjectURL(file)
                                    : `${baseURL}${file}`
                            }
                            alt="item"
                            style={{
                                height: "18rem",
                                width: "18rem",
                                borderRadius: "4px",
                            }}
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
                    setStaffInfo({
                        ...staffInfo,
                        employeeName: e.target.value,
                    });
                }}
            />

            <RadioGroup
                value={staffInfo.gender}
                onChange={(e) =>
                    setStaffInfo({ ...staffInfo, gender: e.target.value })
                }
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
                    setStaffInfo({
                        ...staffInfo,
                        employeeSalary: e.target.value,
                    });
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
                    setStaffInfo({
                        ...staffInfo,
                        employeeAddress: e.target.value,
                    });
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
                    setStaffInfo({
                        ...staffInfo,
                        employeeIdNumber: e.target.value,
                    });
                }}
            />
            <div
                style={{
                    margin: "0.8rem 0",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    disabled={
                        btnText.saveChanges
                            .toLowerCase()
                            .includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText.saveChanges}
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps, { fetchEmployee })(EditStaff);
