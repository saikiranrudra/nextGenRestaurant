import React from "react";

// components
import ScrollContainer from "react-indiana-drag-scroll";
import { Grow } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

//state management
import { connect } from "react-redux";
import { setCategory } from "./../../actions/customer";
// actions

const useStyle = makeStyles({
  container: {
    display: "flex",
  },
  categorieImg: {
    display: "inline-block",
    height: "4rem",
    width: "4rem",
    borderRadius: "10rem",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    transition: "all .1s",
  },
  categorieContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: ".6rem",
  },
});

const Categories = (props) => {
  const classes = useStyle();

  const handleCategory = (name) => {
    props.setCategory(name);
  };
  if (props.categories.length !== 0) {
    return (
      <ScrollContainer className={classes.container}>
        {props.categories.map((categorie, index) => (
          <Grow key={index} in={true}>
            <div className={classes.categorieContainer}>
              <div
                style={{
                  backgroundImage: `url("${categorie.img}")`,
                  border:
                    categorie.name === props.category ? "2px solid red" : null,
                }}
                className={classes.categorieImg}
                onClick={() => {
                  handleCategory(categorie.name);
                }}
              ></div>
              <div style={{ textAlign: "center" }}>{categorie.name}</div>
            </div>
          </Grow>
        ))}
      </ScrollContainer>
    );
  } else {
    return <p>Loading...</p>;
  }
};

const mapStateToProps = ({ categories, category }) => ({
  categories,
  category,
});

export default connect(mapStateToProps, { setCategory })(Categories);