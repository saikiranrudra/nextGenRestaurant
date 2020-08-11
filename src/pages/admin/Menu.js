import React from "react";

//components
import Nav from "./../../components/admin/Nav";
import { Paper, Button, Typography } from "@material-ui/core";
import MenuItem from "./../../components/admin/MenuItem";

//state management
import { connect } from "react-redux";

//images
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//Icons
import SearchIcon from "@material-ui/icons/Search";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "80px 1fr 1fr 1fr",
    gridTemplateRows: "100px 1fr",
  },
  logo: {
    width: "4rem",
    marginTop: "1rem",
  },
  menuContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
  },

  searchContainer: {
    borderRadius: "4px",
    padding: "0 1rem",
    paddingTop: "1.8rem",
  },
  searchInput: {
    outline: "none",
    border: "none",
    fontFamily: "Product-Sans",
    fontSize: ".9rem",
    padding: ".6rem",
    "&::placeholder": {
      color: "#D9D9D9",
    },
  },
  search: {
    display: "grid",
    gridTemplateColumns: "24px 1fr",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    padding: "0 1rem",
    borderRadius: "4px",
  },
});

const Menu = (props) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.container}>
        <Paper
          style={{
            width: "100%",
            textAlign: "center",
            gridRow: "1/-1",
            height: "100vh",
          }}
        >
          <img src={logo} alt="logo " className={classes.logo} />
          <Nav />
        </Paper>

        <div
          style={{
            gridColumn: "2 / -1",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "8rem", margin: "0 auto" }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={
              // <img src={logout} alt="logout" style={{ width: "1rem" }} />
              <Logout style={{ fill: "#fff", width: "1rem" }} />
            }
            style={{ margin: "1rem" }}
          >
            Logout
          </Button>
        </div>

        <div
          style={{
            gridColumn: "span 3",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 440px)",
          }}
        >
          <div style={{ margin: ".6rem" }}>
            <Typography
              variant="h5"
              align="left"
              style={{ fontWeight: "bold", fontFamily: "Product-Sans" }}
            >
              Menu
            </Typography>
            <div className={classes.menuContainer}>
              <div className={classes.searchContainer}>
                <div className={classes.search}>
                  <SearchIcon style={{ color: "#D9D9D9" }} />
                  <input
                    type="text"
                    placeholder="Search"
                    className={classes.searchInput}
                  />
                </div>
              </div>

              <div style={{ gridColumn: "span 3" }}>
                <div
                  style={{
                    margin: ".9rem 1rem",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    height: "65vh",
                  }}
                >
                  {props.menu.map((item, index) => (
                    <MenuItem item={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(Menu);
