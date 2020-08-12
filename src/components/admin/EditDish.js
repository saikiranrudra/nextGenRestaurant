import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// components
import { Button, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { Typography } from "@material-ui/core";

//icons
import AddIcon from "@material-ui/icons/Add";

//state management
import { connect } from "react-redux";

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

function EditDish(props) {
  const classes = useStyle();
  const [file, setFile] = useState(null);
  const [removeDishOption, setRemoveDishOption] = useState("untill i add");
  const [dishInfo, setDishInfo] = useState({
    dishName: "",
    jainAvailable: false,
    dishDescription: "",
    mealFor: 0,
    price: 0,
    category: props.categories.length > 0 ? props.categories[0] : {},
  });

  const handleRemoveDishOption = (event) => {
    setRemoveDishOption(event.target.value);
  };

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

        overflowX: "hidden",
        overflowY: "scroll",
        height: "76.5vh",
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
            >
              Delete Dish
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                fontSize: ".7rem",
                fontWeight: "bold",
                padding: ".5rem",
              }}
            >
              Done
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
        <label className={classes.label} style={{ marginTop: 0 }} htmlFor="yes">
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
        <label className={classes.label} style={{ marginTop: 0 }} htmlFor="yes">
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
            setDishInfo({ ...dishInfo, dishDescription: e.target.value })
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
          onChange={(e) => setDishInfo({ ...dishInfo, price: e.target.value })}
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
            value={dishInfo.category}
            className={classes.input}
            onChange={(e) => {
              setDishInfo({ ...dishInfo, category: e.target.value });
              console.log(e.target.value);
            }}
          >
            {props.categories.map((category, index) => (
              <option
                key={index}
                value={category.name}
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
          >
            <AddIcon />
          </div>

          <input type="text" className={classes.input} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(EditDish);
