import React from "react";

//State Management
import { connect } from "react-redux";

const Switch = (props) => {
    return (
        <div
            style={{ display: "flex", cursor: "pointer" }}
            onClick={props.onClick}
        >
            <div
                style={{
                    padding: ".4rem",
                    color: props.state !== props.textOne ? "transparent" : null,
                    backgroundColor:
                        props.state !== props.textOne
                            ? props.app.themeColor
                            : null,
                    borderRadius: "5px",
                }}
            >
                {props.textOne ? props.textOne : "textOne"}
            </div>
            <div
                style={{
                    padding: ".4rem",
                    color: props.state !== props.textTwo ? "transparent" : null,
                    backgroundColor:
                        props.state !== props.textTwo
                            ? props.app.themeColor
                            : null,
                    borderRadius: "5px",
                }}
            >
                {props.textTwo ? props.textTwo : "textTwo"}
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(Switch);
