import React, { useEffect } from "react";

import { connect } from "react-redux";

//routing
import { useHistory } from "react-router-dom";

const AdminProtect = (props) => {
    const history = useHistory();
    const staff = props.staff;
    useEffect(() => {
        if (staff === null) {
            history.push("/admin/login");
        }
    }, [staff, history]);
    if (staff !== null) {
        return <>{props.children}</>;
    } else {
        return <div></div>;
    }
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps)(AdminProtect);
