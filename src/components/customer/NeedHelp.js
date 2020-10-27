import React, { useState } from "react";

// components
import {
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

//State Management
import {connect} from "react-redux";
//Socket Connection
import socket from "./../../socket";

//styling
import { makeStyles } from "@material-ui/core/styles";

// routing
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  txt: {
    fontFamily: "Product-Sans",
  },
  btn: {
    fontFamily: "Product-Sans",
  },
});

const NeedHelp = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleNeedHelp = () => {
    let tableNumber = -1;
    props.tables.forEach(table => {
      if(table._id === props.tableNo) {
        tableNumber = table.tableNo;
        return;
      }
    })

    socket.emit("NOTIFICATION", {type: "NEED_HELP", payload: {
      tableNo: tableNumber
    }})
    setOpen(false);
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ borderRadius: "1rem", fontFamily: "Product-Sans" }}
        onClick={handleClickOpen}
      >
        Need Help?
      </Button>
      {open ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <span className={classes.txt}>Are you sure you want help?</span>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} className={classes.btn}>
              No
            </Button>
            <Link
              to="/customer/needhelp"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                color="primary"
                className={classes.btn}
                onClick={handleNeedHelp}
              >
                Yes
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

const mapStateToProps = ({tableNo, tables}) => ({tableNo, tables});
export default connect(mapStateToProps)(NeedHelp);
