import React from "react";

//components
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// assets
import staffAvator from "./../../assets/staffAvator.png";
// icons
import edit from "./../..//assets/dashboardAssets/edit.svg";

//styles
import { makeStyles } from "@material-ui/core/styles";

const months = {
  0: "jan",
  1: "feb",
  2: "march",
  3: "april",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sept",
  9: "oct",
  10: "nov",
  11: "dec",
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
    padding: ".4rem",
  },
  date: {
    color: theme.palette.primary.main,
    fontFamily: "Product-Sans",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  head: {
    display: "flex",
    margin: ".8rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    backgroundColor: "#fff",
    padding: ".4rem 0",
    "& > input": {
      width: "100%",
      outline: "none",
      border: "none",
      fontFamily: "Product-Sans",
      fontSize: ".9rem",
      "&::placeholder": {
        color: "#D9D9D9",
      },
    },
    "& > svg": {
      margin: "0 .8rem",
      fill: "#D9D9D9",
    },
  },
  card: {
    display: "grid",
    gridTemplateColumns: "65px 1fr 86px",
    padding: ".7rem",
    alignContent: "center",
    backgroundColor: "#fff",
    margin: "1rem 0",
  },

  avator: {
    display: "inline-block",
    height: "65px",
    backgroundImage: `url(${staffAvator})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    borderRadius: "5rem",
  },
  content: {
    paddingLeft: ".3rem",
    marginTop: ".4rem",
  },
  name: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  designation: {
    fontFamily: "Product-Sans",
    fontSize: ".9rem",
  },
  btns: {
    textAlign: "center",
  },
  btn: { backgroundColor: "#fff", transform: "scale(.8)" },
  cardList: {
    overflowX: "hidden",
    overflowY: "scroll",
    height: "75vh",
  },
}));

const StaffDisplay = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {/* heading */}
      <div className={classes.head}>
        <div className={classes.date}>
          {`${props.selectedDate.getDate()}-${
            months[props.selectedDate.getMonth()]
          }-${props.selectedDate.getFullYear()}`}
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ transform: "scale(.85)" }}
            onClick={() => {
              props.setTakeAttendence(true);
            }}
          >
            Take Attendence
          </Button>
        </div>
      </div>

      {/* search box */}
      <div className={classes.searchContainer}>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>

      {/* // staff list */}
      <div className={classes.cardList}>
        {/* card start */}
        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>

        {/* cardend */}

        {/* repeating */}
        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.avator}></div>
          <div className={classes.content}>
            <div className={classes.name} align="left">
              Sherlock Holmes
            </div>
            <div className={classes.designation} align="left">
              Bust Boy
            </div>
          </div>
          <div className={classes.btns}>
            <Button
              variant="contained"
              endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
              className={classes.btn}
            >
              Edit
            </Button>
            <br />
            <Button variant="contained" className={classes.btn}>
              View
            </Button>
          </div>
        </div>
        {/* repeating ends */}
      </div>
    </div>
  );
};

export default StaffDisplay;
