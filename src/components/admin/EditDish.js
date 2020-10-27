import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

// components
import {
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//API
import axios from "axios";
//variables
import { baseURL } from "./../../variables";

//icons
import AddIcon from "@material-ui/icons/Add";

//state management
import { connect } from "react-redux";
//actions
import {
    updateMenu,
    addItemToMenu,
    removeItemFromMenu,
    fetchMenuItems,
} from "./../../actions/customer/index";

//utils
import _ from "lodash";
import FormData from "form-data";

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
    },
    radiobtn: {
        "& > span": {
            padding: "0 .3rem .5rem 1rem",
            fontFamily: "Product-Sans",
            fontWeight: "bold",
        },
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
        fontFamily: "Product-Sans",
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleSaveChange = (
    file,
    dishInfo,
    updateMenu,
    addItemToMenu,
    setSaveChanges,
    fetchMenuItems,
    setSnackbar,
    staff
) => {
    let newItem = new FormData();
    // 1. if img is a file take img file of item upload to server get url
    // if (typeof file === "object") {
    //     //upload to database and get url

    //     newItem.img = URL.createObjectURL(file);
    // } else {
    //     newItem.img = file;
    // }

    if (!file) {
        alert("Item should have Image");
        return;
    }
    newItem.append("img", file);
    // 2. check if id is null or not
    // 3. if id not null update database
    // 4. if id null create new Item
    if (dishInfo._id !== null) {
        newItem.append("_id", dishInfo._id);
        // newItem._id = dishInfo._id;
    }

    newItem.append("name", dishInfo.dishName);

    newItem.append("category", JSON.stringify(dishInfo.category));

    // newItem.category = dishInfo.category;
    newItem.append("mealFor", dishInfo.mealFor);
    newItem.append("price", dishInfo.price);
    if (dishInfo.jainAvailable === true) {
        newItem.append("jainCount", 0);
    }
    newItem.append("normalCount", 0);
    newItem.append("featured", false);
    newItem.append("visible", dishInfo.visible);
    newItem.append("deleted", false);
    newItem.append("description", dishInfo.dishDescription);
    newItem.append("token", staff.token);

    // 5. if id is not null updateMenu
    if (dishInfo._id !== null) {
        // update menu in database
        setSaveChanges("please wait...");
        axios
            .put(`${baseURL}/api/v1/items/updateitem`, newItem, {
                headers: { "content-type": "multipart/form-data" },
            })
            .then((res) => {
                fetchMenuItems();
                setSnackbar({
                    type: "success",
                    text: "Item updated successfully",
                    open: true,
                });
                setSaveChanges("Save Changes");
            })
            .catch((err) => {
                console.log(err);
                setSnackbar({
                    type: "warning",
                    text: "something went wrong try agin later",
                    open: true,
                });
                setSaveChanges("Save Changes");
            });
    }
    // 6. if id is null addItemToMenu
    if (dishInfo._id === null) {
        // add item in database
        setSaveChanges("please wait...");
        axios
            .post(`${baseURL}/api/v1/items/createitem`, newItem, {
                headers: { "content-type": "multipart/form-data" },
            })
            .then((res) => {
                fetchMenuItems();
                setSnackbar({
                    type: "success",
                    text: "Item created successfully",
                    open: true,
                });
                setSaveChanges("Save Changes");
            })
            .catch((err) => {
                console.log(err);
                setSnackbar({
                    type: "warning",
                    text: "something went wrong try agin later",
                    open: true,
                });
                setSaveChanges("Save Changes");
            });
    }
};

const handleDelete = (
    dishInfo,
    removeItemFromMenu,
    setDeleteItem,
    staff,
    setSnackbar,
    fetchMenuItems
) => {
    // remove item from database
    const data = {
        _id: dishInfo._id,
        token: staff.token,
    };
    setDeleteItem("please wait...");
    axios
        .post(`${baseURL}/api/v1/items/deleteitem`, data)
        .then((res) => {
            setSnackbar({
                type: "success",
                text: "Item Deleted Successfully",
                open: true,
            });
            fetchMenuItems();
            setDeleteItem("Delete Dish");
        })
        .catch((err) => {
            console.log(err);
            setSnackbar({
                type: "warning",
                text: "Something went wrong try again later",
                open: true,
            });
            setDeleteItem("Delete Dish");
        });
};
const handleDone = (setSnackbar, setHideItem, removeDishOption) => {
    setHideItem("please wait...");
    setTimeout(() => {
        setSnackbar({
            open: true,
            type: "success",
            text: `Dish is hidden successfully for ${removeDishOption}`,
        });
        setHideItem("Done");
    }, 4000);
};

function EditDish(props) {
    const classes = useStyle();
    const [saveChanges, setSaveChanges] = useState("Save Changes");
    const [deleteItem, setDeleteItem] = useState("Delete Dish");
    const [hideItem, setHideItem] = useState("Done");
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "success",
        text: "Item hidden successfully",
    });

    const handleAlertClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const [selectedCategory, setSelectedCategory] = useState(
        props.categories.length > 0 ? props.categories[0]._id : "no data"
    );
    const [file, setFile] = useState(
        props.selectedForEdit.img !== undefined
            ? props.selectedForEdit.img
            : null
    );
    const [removeDishOption, setRemoveDishOption] = useState("untill i add");
    const [dishInfo, setDishInfo] = useState({
        id:
            props.selectedForEdit._id !== undefined
                ? props.selectedForEdit._id
                : null,
        dishName:
            props.selectedForEdit.name !== undefined
                ? props.selectedForEdit.name
                : "",
        jainAvailable:
            props.selectedForEdit.jainCount !== undefined ? true : false,
        dishDescription:
            props.selectedForEdit.description !== undefined
                ? props.selectedForEdit.description
                : "",
        mealFor:
            props.selectedForEdit.mealFor !== undefined
                ? props.selectedForEdit.mealFor
                : 0,
        price:
            props.selectedForEdit.price !== undefined
                ? props.selectedForEdit.price
                : 0,
        category:
            props.selectedForEdit.category !== undefined
                ? props.selectedForEdit.category
                : [],
        visible:
            props.selectedForEdit.visible !== undefined
                ? props.selectedForEdit.visible
                : true,
    });

    useEffect(() => {
        setDishInfo({
            _id:
                props.selectedForEdit._id !== undefined
                    ? props.selectedForEdit._id
                    : null,
            dishName:
                props.selectedForEdit.name !== undefined
                    ? props.selectedForEdit.name
                    : "",
            jainAvailable:
                props.selectedForEdit.jainCount !== undefined ? true : false,
            dishDescription:
                props.selectedForEdit.description !== undefined
                    ? props.selectedForEdit.description
                    : "",
            mealFor:
                props.selectedForEdit.mealFor !== undefined
                    ? props.selectedForEdit.mealFor
                    : 0,
            price:
                props.selectedForEdit.price !== undefined
                    ? props.selectedForEdit.price
                    : 0,
            category:
                props.selectedForEdit.category !== undefined
                    ? props.selectedForEdit.category
                    : [],
            visible:
                props.selectedForEdit.visible !== undefined
                    ? props.selectedForEdit.visible
                    : true,
        });

        setFile(
            props.selectedForEdit.img !== undefined
                ? props.selectedForEdit.img
                : null
        );
    }, [props.selectedForEdit]);

    useEffect(() => {
        if (props.categories.length > 0) {
            setSelectedCategory(props.categories[0]._id);
        }
    }, [props.categories]);

    const handleRemoveDishOption = (event) => {
        setRemoveDishOption(event.target.value);
    };

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        setFile(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div
            style={{
                backgroundColor: "#F5F5F5",
                padding: ".5rem",
                borderRadius: "5px",

                overflowX: "hidden",
                overflowY: "scroll",
                height: "84.5vh",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    gridGap: ".3rem",
                }}
            >
                {file === null ? (
                    <div {...getRootProps()} className={classes.uploadImageBox}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
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
                <div>
                    <Typography
                        variant="h6"
                        align="left"
                        style={{
                            fontFamily: "Product-Sans",
                            fontSize: ".9rem",
                        }}
                    >
                        Remove Dish from menu for
                    </Typography>
                    <div style={{ marginTop: ".5rem" }}>
                        <RadioGroup
                            aria-label="removeDishOption"
                            name="removeDishOption"
                            value={removeDishOption}
                            onChange={handleRemoveDishOption}
                        >
                            <FormControlLabel
                                value="1 hour"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="1 hour"
                            />
                            <FormControlLabel
                                value="6 hour"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="6 hour"
                            />
                            <FormControlLabel
                                value="7 days"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="7 days"
                            />
                            <FormControlLabel
                                value="untill i add"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="untill i add"
                            />
                            <FormControlLabel
                                value="1 day"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="1 day"
                            />
                            <FormControlLabel
                                value="1 month"
                                className={classes.radiobtn}
                                control={<Radio color="primary" />}
                                label="1 month"
                            />
                        </RadioGroup>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: ".5rem",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                fontSize: ".7rem",
                                fontWeight: "bold",
                                padding: ".5rem",
                            }}
                            onClick={() => {
                                handleDelete(
                                    dishInfo,
                                    props.removeItemFromMenu,
                                    setDeleteItem,
                                    props.staff,
                                    setSnackbar,
                                    props.fetchMenuItems
                                );
                            }}
                            disabled={
                                deleteItem === "please wait..." ? true : false
                            }
                        >
                            {deleteItem}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                fontSize: ".7rem",
                                fontWeight: "bold",
                                padding: ".5rem",
                            }}
                            disabled={
                                hideItem === "please wait..." ? true : false
                            }
                            onClick={() => {
                                handleDone(
                                    setSnackbar,
                                    setHideItem,
                                    removeDishOption
                                );
                            }}
                        >
                            {hideItem}
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="dishName" className={classes.label}>
                    Dish Name
                </label>
                <input
                    id="dishName"
                    type="text"
                    value={dishInfo.dishName}
                    className={classes.input}
                    onChange={(e) =>
                        setDishInfo({ ...dishInfo, dishName: e.target.value })
                    }
                />

                <label htmlFor="dishName" className={classes.label}>
                    Jain Available
                </label>
                <label
                    className={classes.label}
                    style={{ marginTop: 0 }}
                    htmlFor="yes"
                >
                    Yes
                    <Radio
                        checked={dishInfo.jainAvailable === true}
                        id="dishName"
                        color="primary"
                        onChange={(e) =>
                            setDishInfo({
                                ...dishInfo,
                                jainAvailable: JSON.parse(e.target.value),
                            })
                        }
                        value={true}
                        name="jainAvailable"
                    />
                </label>
                <label
                    className={classes.label}
                    style={{ marginTop: 0 }}
                    htmlFor="yes"
                >
                    No
                    <Radio
                        checked={dishInfo.jainAvailable === false}
                        color="primary"
                        onChange={(e) =>
                            setDishInfo({
                                ...dishInfo,
                                jainAvailable: JSON.parse(e.target.value),
                            })
                        }
                        value={false}
                        name="jainAvailable"
                    />
                </label>
                <label htmlFor="dishDescription" className={classes.label}>
                    Dish Description
                </label>
                <textarea
                    id="dishDescription"
                    name="dishDescription"
                    value={dishInfo.dishDescription}
                    className={classes.input}
                    cols="50"
                    rows="5"
                    onChange={(e) =>
                        setDishInfo({
                            ...dishInfo,
                            dishDescription: e.target.value,
                        })
                    }
                ></textarea>

                <label htmlFor="mealfor" className={classes.label}>
                    Meal for how many people
                </label>
                <input
                    type="number"
                    name="mealFor"
                    value={dishInfo.mealFor}
                    className={classes.input}
                    onChange={(e) =>
                        setDishInfo({ ...dishInfo, mealFor: e.target.value })
                    }
                />

                <label htmlFor="price" className={classes.label}>
                    price
                </label>
                <input
                    type="number"
                    name="price"
                    value={dishInfo.price}
                    className={classes.input}
                    onChange={(e) =>
                        setDishInfo({ ...dishInfo, price: e.target.value })
                    }
                />

                <FormControlLabel
                    className={classes.label}
                    control={
                        <Switch
                            checked={dishInfo.visible}
                            onChange={(e) => {
                                setDishInfo({
                                    ...dishInfo,
                                    visible: e.target.checked,
                                });
                            }}
                            name="visible"
                            color="primary"
                        />
                    }
                    label="Visible in Menu"
                />

                <label htmlFor="category" className={classes.label}>
                    Add Category
                </label>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2rem",
                        gridGap: ".6rem",
                    }}
                >
                    <select
                        id="category"
                        name="category"
                        value={selectedCategory._id}
                        className={classes.input}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                        }}
                    >
                        {props.categories.map((category, index) => (
                            <option
                                key={index}
                                value={category._id}
                                style={{ fontFamily: "Product-Sans" }}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div
                        variant="contained"
                        style={{
                            backgroundColor: "#fff",
                            boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2), 
                0px 2px 2px 0px rgba(0,0,0,0.14), 
                0px 1px 5px 0px rgba(0,0,0,0.12)`,
                            borderRadius: "4px",
                            display: "grid",
                            width: "2rem",
                            height: "2rem",
                            placeContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            let newCategories = _.clone(dishInfo.category);
                            let contains = _.find(
                                dishInfo.category,
                                (cat) => cat._id === selectedCategory
                            );

                            if (contains === undefined) {
                                let selectedCategoryIndex = _.findIndex(
                                    props.categories,
                                    (category) =>
                                        category._id === selectedCategory
                                );

                                if (selectedCategoryIndex !== -1) {
                                    newCategories.push(
                                        props.categories[selectedCategoryIndex]
                                    );
                                    setDishInfo({
                                        ...dishInfo,
                                        category: newCategories,
                                    });
                                }
                            }
                        }}
                    >
                        <AddIcon />
                    </div>

                    <input
                        type="text"
                        className={classes.input}
                        readOnly
                        value={dishInfo.category.map((cat, index) => {
                            if (index === 0) {
                                return `${cat.name}`;
                            } else {
                                return ` ${cat.name}`;
                            }
                        })}
                    />
                </div>
                <div style={{ margin: "1rem 0", textAlign: "end" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            handleSaveChange(
                                file,
                                dishInfo,
                                props.updateMenu,
                                props.addItemToMenu,
                                setSaveChanges,
                                props.fetchMenuItems,
                                setSnackbar,
                                props.staff
                            )
                        }
                        disabled={
                            saveChanges === "please wait..." ? true : false
                        }
                    >
                        {saveChanges}
                    </Button>
                </div>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity={snackbar.type}>
                    {snackbar.text}
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = ({ categories, staff }) => ({ categories, staff });
export default connect(mapStateToProps, {
    addItemToMenu,
    updateMenu,
    removeItemFromMenu,
    fetchMenuItems,
})(EditDish);
