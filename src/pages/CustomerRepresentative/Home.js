import React, { useEffect } from "react";

// components
import TopLogo from "./../../components/general/TopLogo";
import Categories from "./../../components/customer/Categories";
import { Button, Typography } from "@material-ui/core";
import MenuItems from "./../../components/customer/MenuItems";
import Navigation from "./../../components/customer/Navigation";
import CRMenu from "./../../components/customerRepresentative/CRMenu";
import PreviousOrder from "./../../components/customer/PreviousOrder";

// state management
import { connect } from "react-redux";
//action
import { setSearch, previousOrder } from "./../../actions/customer";

//routing
import { Link } from "react-router-dom";

//images
import featureItem from "./../../assets/featureItem.jpg";
// icons
import SearchIcon from "@material-ui/icons/Search";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  logo: {
    textAlign: "center",
    marginTop: "2.8rem",
    "& > img": {
      width: "15rem",
    },
  },
  imageCover: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,.4)",
    width: "100%",
    height: "100%",
    borderRadius: "0 0 1rem 1rem",
  },
  featureItem: {
    padding: 0,
    backgroundImage: `url(${featureItem})`,
    borderRadius: "0 0 1rem 1rem",
    height: "22rem",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  textMain: {
    fontFamily: "tahu",
    color: "#fff",
    fontSize: "3rem",
  },
  textSub: {
    fontFamily: "Product-Sans",
    color: "#fff",
    fontSize: "3rem",
  },
  content: {
    position: "absolute",
    marginTop: "11rem",
    marginLeft: "1rem",
  },
  search: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    padding: ".3rem .6rem",
    borderRadius: "4px",
    margin: "0 .6rem",
    "& > svg": {
      color: "gray",
    },
    "& > input": {
      backgroundColor: "#f5f5f5",
      fontFamily: "Product-Sans",
      width: "100%",
      marginLeft: "1rem",
      fontSize: "1rem",
      border: "none",
      outline: "none",
    },
  },
  navigationContainer: {
    display: "flex",
    alignItems: "center",
  },
  needHelp: {
    margin: "0 auto",
  },
  bottomPadding: {
    marginBottom: "6rem",
  },
  stickyContainer: {
    backgroundColor: "#fff",
    position: "sticky",
    top: "5rem",
    paddingTop: "1rem",
    zIndex: 1299,
  },
});

const Home = (props) => {
  const classes = useStyle();
  const { previousOrder, user } = props;
  useEffect(() => {
    if (user && user.role === "customer") {
      previousOrder(user.email);
    }
  }, [previousOrder, user]);
  return (
    <div>
      <TopLogo />

      <div className={classes.featureItem}>
        <div className={classes.imageCover}>
          <div className={classes.content}>
            <Typography variant="h2" className={classes.textMain}>
              Delicious
            </Typography>
            <Typography variant="h2" className={classes.textSub}>
              Pan cakes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: "Product-Sans" }}
            >
              Let's Eat
            </Button>
          </div>
        </div>
      </div>

      <div className={classes.stickyContainer}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Food"
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </div>
        <Categories />
      </div>
      <div>
        <PreviousOrder ordersLink="/cr/orders" />
      </div>
      <div className={classes.bottomPadding}>
        <MenuItems cr={true} />
      </div>

      <Navigation>
        <div className={classes.navigationContainer}>
          <CRMenu />
          <div className={classes.needHelp}>
            <Link
              to="/cr/select/table"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" color="primary">
                Table Select
              </Button>
            </Link>
          </div>
        </div>
      </Navigation>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps, { setSearch, previousOrder })(Home);
