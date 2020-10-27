import React from "react";

// State Management
import { connect } from "react-redux";

const Radio = (props) => {
    return (
        <div
            style={{
                borderRadius: "1rem",
                display: "grid",
                placeContent: "center",
                padding: ".18rem",
                cursor: "pointer",
                border: props.active
                    ? props.color !== undefined
                        ? `2px solid ${props.color}`
                        : `2px solid ${props.app.themeColor}`
                    : "2px solid transparent",
            }}
            onClick={props.onClick}
        >
            <div
                style={{
                    borderRadius: "1rem",
                    width: props.size ? props.size : "1.5rem",
                    height: props.size ? props.size : "1.5rem",
                    backgroundColor:
                        props.color !== undefined
                            ? props.color
                            : props.app.themeColor,
                }}
            ></div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(Radio);
