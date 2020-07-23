import React from "react";

// Components
import ItemCard from "./ItemCard";
import CustomerCartBar from "./CustomerCartBar";

// state management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: ".3rem",
    margin: "1rem .3rem 9rem .3rem",
  },
});

const MenuItem = (props) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.container}>
        {props.menu.map((item, index) => {
          if (props.category.toLowerCase() === "all") {
            if (item.name.toLowerCase().includes(props.search.toLowerCase())) {
              return <ItemCard key={index} item={item} />;
            } else {
              return null;
            }
          } else {
            if (item.category.toLowerCase() === props.category.toLowerCase()) {
              if (
                item.name
                  .toLowerCase()
                  .includes(props.search.toLocaleLowerCase())
              ) {
                return <ItemCard key={index} item={item} />;
              } else {
                return null;
              }
            } else {
              return null;
            }
          }
        })}
      </div>
      {props.cr ? <CustomerCartBar cr={true} /> : <CustomerCartBar />}
    </>
  );
};

const mapStateToProps = ({ menu, category, search }) => ({
  menu,
  category,
  search,
});

export default connect(mapStateToProps)(MenuItem);
