import React, { useEffect } from "react";

import { connect } from "react-redux";

//routing
import { useHistory } from "react-router-dom";

const CustomerProtect = (props) => {
    const history = useHistory();
    const user = props.user;
    useEffect(() => {
        if (user) {
            if (user.email === undefined) {
                history.push("/customer");
            }
        } else if (!user) {
            history.push("/customer");
        }
    }, [user, history]);
    return <>{props.children}</>;
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(CustomerProtect);
