import React from "react";

//components
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

//state management
import { connect } from "react-redux";

const RecivedOrdersList = (props) => {
    return (
        <>
            <Typography
                variant="body2"
                align="left"
                style={{ marginLeft: "1rem", fontFamily: "Product-Sans" }}
            >
                Recived Dishes {props.recivedOrders.length}
            </Typography>
            <List>
                {props.recivedOrders.map((item, index) => (
                    <ListItem disabled key={index}>
                        <ListItemText>
                            <span style={{ fontFamily: "Product-Sans" }}>
                                {item.name}
                            </span>
                        </ListItemText>
                        <ListItemText style={{ textAlign: "end" }}>
                            <span style={{ fontFamily: "Product-Sans" }}>
                                Normal:{" "}
                                {item.normalCount ? item.normalCount : "Nil"}
                            </span>
                            <span
                                style={{
                                    marginLeft: ".8rem",
                                    fontFamily: "Product-Sans",
                                }}
                            >
                                Jain: {item.jainCount ? item.jainCount : "Nil"}
                            </span>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

const mapStateToProps = ({ recivedOrders }) => ({ recivedOrders });
export default connect(mapStateToProps)(RecivedOrdersList);
