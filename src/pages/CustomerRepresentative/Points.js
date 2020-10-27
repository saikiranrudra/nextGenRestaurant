import React from "react";

// components
import TopLogo from "./../../components/general/TopLogo";
import Navigation from "./../../components/customer/Navigation";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

//state management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "5rem",
    display: "inline-block",
    marginBottom: "4rem",
    marginLeft: "1rem",
  },
  heading: {
    fontSize: "2rem",
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "1.3rem",
    fontFamily: "Product-Sans",
    marginTop: "1rem",
  },
  points: {
    fontSize: "8rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  bold: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  pointsText: {
    fontFamily: "Product-Sans",
  },
  pointsWorking: {
    marginTop: "3rem",
  },
  font: {
    fontFamily: "Product-Sans",
  },
}));

const Points = (props) => {
  const classes = useStyle();
  return (
    <>
      <TopLogo />
      <div className={classes.container}>
        <Typography variant="h2" align="left" className={classes.heading}>
          Your Discount Points
        </Typography>

        <Typography variant="h3" align="left" className={classes.subHeading}>
          You have
        </Typography>

        <Typography variant="h3" align="left" className={classes.subHeading}>
          <span className={classes.points}>
            {props.user ? props.user.points : 0}
          </span>{" "}
          Points
        </Typography>

        <div
          style={{
            display: "flex",
            margin: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "auto", fontFamily: "Product-Sans" }}
          >
            Redeem this points
          </Button>
        </div>

        <Typography variant="body1" align="left" className={classes.pointsText}>
          You can take{" "}
          <span className={classes.bold}>
            {props.app.pointValue ? props.app.pointValue.percent : 0}%{" "}
          </span>{" "}
          Discount per{" "}
          <span className={classes.bold}>
            {props.app.pointValue ? props.app.pointValue.points : 0}{" "}
          </span>{" "}
          points
        </Typography>

        <div className={classes.pointsWorking}>
          <Typography
            variant="h3"
            align="left"
            className={classes.subHeading}
            style={{ fontWeight: "bold" }}
          >
            How Discount Points works?
          </Typography>

          <List>
            <ListItem>
              <ListItemText>
                <Typography
                  variant="h4"
                  align="left"
                  style={{ fontSize: "1rem" }}
                  className={classes.font}
                >
                  with every visit you will get{" "}
                  <b>
                    {props.app.pointValue ? `${props.app.pointValue.perVisit}` : "0"}
                  </b>{" "}
                  points
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Typography
                  variant="h4"
                  align="left"
                  style={{ fontSize: "1rem" }}
                  className={classes.font}
                >
                  You can redeem your points at checkout
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Typography
                  variant="h4"
                  align="left"
                  style={{ fontSize: "1rem" }}
                  className={classes.font}
                >
                  you will get{" "}
                  <b>
                    {props.app.pointValue ? `${props.app.pointValue.percent}%` : "0%"}
                  </b>{" "}
                  discount at checkout per{" "}
                  <b>{props.app.pointValue ? `${props.app.pointValue.points}` : "0"}</b>{" "}
                  points
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Typography
                  variant="h4"
                  align="left"
                  style={{ fontSize: "1rem" }}
                  className={classes.font}
                >
                  Tou can only redeem only{" "}
                  <b>{props.app.pointValue ? props.app.pointValue.redeemLimit : 0} </b>
                  points at once.
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </div>

      <Navigation>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link
            to="/cr/select/table"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant="contained"
              color="primary"
            >
              Select Table
            </Button>
          </Link>
          <Link
            to="/cr/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="contained" color="primary">
              Menu
            </Button>
          </Link>
        </div>
      </Navigation>
    </>
  );
};

const mapStateToProps = ({ user, app }) => ({ user, app });
export default connect(mapStateToProps)(Points);
