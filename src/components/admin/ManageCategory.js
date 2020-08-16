import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

//components
import { Button, Typography } from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//actions
// import { addCategory, removeCategory } from "./../../actions/customer";

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
    cursor: "pointer",
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
  const [category, setCategory] = useState(
    props.categories.length > 0 ? props.categories[0] : ""
  );

  useEffect(() => {
    setCategory(props.categories.length > 0 ? props.categories[0] : "");
  }, [props.categories]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: ".5rem",
        borderRadius: "5px",
        display: "inline-block",
        overflowX: "hidden",
        overflowY: "scroll",
        height: "76.5vh",
      }}
    >
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
              src={URL.createObjectURL(file)}
              alt="item"
              style={{ height: "15rem", width: "15rem", borderRadius: "4px" }}
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
        value={category.name !== undefined ? category.name : ""}
        readOnly
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
        >
          Add Category
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
        >
          Delete Category
        </Button>
      </div>
      <div>
        {props.categories.map((category, index) => (
          <div
            key={index}
            className={classes.category}
            onClick={() => setCategory(category)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" align="left">
                {category.name}
              </Typography>
              <Button
                variant="contained"
                endIcon={
                  <img src={edit} alt="edit" style={{ width: "1rem" }} />
                }
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(ManageCategory);
