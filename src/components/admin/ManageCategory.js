import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

//components
import { Button, Typography } from "@material-ui/core";

//variables
import { baseURL } from "./../../variables";

// utils
// import _ from "lodash";
import FormData from "form-data";

//API
import axios from "axios";

//State Management
import { connect } from "react-redux";
//actions
import {
    addCategory,
    removeCategory,
    modifyCategory,
    fetchCategories,
    fetchMenuItems,
} from "./../../actions/customer";

// icons
import edit from "./../../assets/dashboardAssets/edit.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    uploadImageBox: {
        width: "15rem",
        justifySelf: "center",
        backgroundColor: "#D9D9D9",
        height: "15rem",
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
        marginTop: ".8rem",
    },
    input: {
        padding: ".3rem",
        outline: "#E6E6E6",
        border: "1px solid #E6E6E6",
        width: "100%",
        fontFamily: "Product-Sans",
    },

    category: {
        backgroundColor: "#fff",
        "& > div > h6, & > div > button": {
            fontFamily: "Product-Sans",
            fontSize: "1rem",
        },
        "& > div > button": {
            backgroundColor: "#fff",
            fontSize: ".8rem",
        },
        margin: ".4rem 0",
        padding: ".3rem .6rem",
    },
});

function ManageCategory(props) {
    const classes = useStyle();
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        _id: undefined,
        img: undefined,
    });

    const [btnText, setBtnText] = useState({
        saveChanges: "Save Changes",
        addCategory: "Add Category",
        deleteCategory: "Delete Category",
    });

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        setFile(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleSaveChanges = () => {
        if (category._id === undefined) {
            return;
        }

        let newCategory = new FormData();
        //update in database
        newCategory.append("_id", category._id);
        newCategory.append("img", file);
        newCategory.append("name", category.name);
        newCategory.append("token", props.staff.token);

        //then update state
        setBtnText({ ...btnText, saveChanges: "please wait..." });

        axios
            .put(`${baseURL}/api/v1/category/updateCategory`, { newCategory })
            .then((res) => {
                props.fetchCategories();
                props.fetchMenuItems();
                setBtnText({ ...btnText, saveChanges: "Save Changes" });
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setBtnText({ ...btnText, saveChanges: "Save Changes" });
            });
    };

    const handleAddCategory = () => {
        //then update State
        if (file === null) {
            alert("image is required to create catergory");
            return;
        }
        if (category.name.length === 0) {
            alert("name is required for category");
            return;
        }
        setBtnText({ ...btnText, addCategory: "please wait..." });

        let data = new FormData();
        data.append("name", category.name);
        data.append("img", file);
        data.append("token", props.staff.token);

        //add in database
        axios
            .post(`${baseURL}/api/v1/category/createCategory`, data)
            .then((res) => {
                props.fetchCategories();
                setBtnText({ ...btnText, addCategory: "Add Category" });
            })
            .catch((err) => {
                alert(err);
                setBtnText({ ...btnText, addCategory: "Add Category" });
            });
    };

    const handleDeleteCategory = () => {
        if (category._id === undefined) {
            alert("Select a category to delete");
            return;
        }
        // delete from database then update state;
        setBtnText({ ...btnText, deleteCategory: "please wait..." });

        axios
            .post(`${baseURL}/api/v1/category/deleteCategory`, {
                _id: category._id,
                token: props.staff.token,
            })
            .then((res) => {
                props.fetchCategories();
                props.fetchMenuItems();
                setCategory({
                    name: "",
                    _id: undefined,
                    img: undefined,
                });
                setFile(null);
                setBtnText({ ...btnText, deleteCategory: "Delete Category" });
            });
    };

    return (
        <div
            style={{
                backgroundColor: "#F5F5F5",
                padding: ".5rem",
                borderRadius: "5px",
                display: "inline-block",
                overflowX: "hidden",
                overflowY: "scroll",
                height: "83.9vh",
            }}
        >
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
                                height: "15rem",
                                width: "15rem",
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

            <label htmlFor="categoryName" className={classes.label}>
                Category
            </label>
            <input
                type="text"
                id="categoryName"
                className={classes.input}
                value={category.name}
                onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                }
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        padding: ".3rem .8rem",
                        margin: "1rem .3rem",
                    }}
                    onClick={handleAddCategory}
                    disabled={
                        btnText.addCategory === "please wait..." ? true : false
                    }
                >
                    {btnText.addCategory}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        padding: ".3rem .8rem",
                        margin: "1rem .3rem",
                    }}
                    onClick={handleDeleteCategory}
                    disabled={
                        btnText.deleteCategory === "please wait..."
                            ? true
                            : false
                    }
                >
                    {btnText.deleteCategory}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        padding: ".3rem .8rem",
                        margin: "1rem .3rem",
                    }}
                    onClick={handleSaveChanges}
                    disabled={
                        btnText.saveChanges === "please wait..." ? true : false
                    }
                >
                    {btnText.saveChanges}
                </Button>
            </div>
            <div>
                {props.categories.map((category, index) => (
                    <div key={index} className={classes.category}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h6" align="left">
                                {category.name}
                            </Typography>

                            {category.name !== "all" ? (
                                <Button
                                    variant="contained"
                                    endIcon={
                                        <img
                                            src={edit}
                                            alt="edit"
                                            style={{ width: "1rem" }}
                                        />
                                    }
                                    onClick={() => {
                                        setCategory(category);
                                        setFile(category.img);
                                    }}
                                >
                                    Edit
                                </Button>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = ({ categories, staff }) => ({ categories, staff });
export default connect(mapStateToProps, {
    addCategory,
    removeCategory,
    modifyCategory,
    fetchCategories,
    fetchMenuItems,
})(ManageCategory);
