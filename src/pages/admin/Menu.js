import React, { useState, useEffect } from "react";

//components
import Nav from "./../../components/admin/Nav";
import { Paper, Button, Typography } from "@material-ui/core";
import MenuItem from "./../../components/admin/MenuItem";
import EditDish from "../../components/admin/EditDish";
import ManageCategory from "../../components/admin/ManageCategory";

// utils
import _ from "lodash";

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
    gridTemplateColumns: "90px 1fr 1fr 1fr",
    gridTemplateRows: "100px 1fr",
    backgroundColor: "#fff",
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
  const { menu } = props;
  const [selectedForEdit, setSelectedForEdit] = useState({});
  const [search, setSearch] = useState("");

  const handleAddNewItem = () => {
    setSelectedForEdit({
      category: [_.find(props.categories, { name: "all" })],
    });
  };

  useEffect(() => {
    const item = menu.length > 0 ? menu[0] : {};
    setSelectedForEdit(item);
  }, [menu, setSelectedForEdit]);

  return (
    <>
      <div className={classes.container}>
        <Paper
          style={{
            width: "100%",
            textAlign: "center",
            gridRow: "1/-1",
            height: "100%",
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
          <span style={{ width: "8rem", margin: "0 auto" }}></span>
          {/* <img
            src={logo}
            alt="logo"
            style={{ width: "8rem", margin: "0 auto" }}
          /> */}
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
            placeContent: "center",
            gridGap: "3rem",
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    margin: ".9rem 1rem",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    height: "66vh",
                  }}
                >
                  {props.menu.map((item, index) => {
                    if (
                      item.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return (
                        <MenuItem
                          item={item}
                          key={index}
                          setSelectedForEdit={setSelectedForEdit}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Product-Sans",
                  marginTop: "0.8rem",
                }}
              >
                Edit Dish
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: ".3rem .5rem" }}
                onClick={handleAddNewItem}
              >
                Add New
              </Button>
            </div>
            <EditDish selectedForEdit={selectedForEdit} />
          </div>

          <div style={{ padding: "0 .5rem  .5rem .5rem" }}>
            <Typography
              variant="h5"
              align="left"
              style={{
                fontWeight: "bold",
                fontFamily: "Product-Sans",
                marginTop: "0.8rem",
              }}
            >
              Category
            </Typography>
            <ManageCategory />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ menu, categories }) => ({ menu, categories });

export default connect(mapStateToProps)(Menu);
