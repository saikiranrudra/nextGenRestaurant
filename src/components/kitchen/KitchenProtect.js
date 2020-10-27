import React, { useEffect } from "react";

// State Management
import { connect } from "react-redux";

//routing
import { useHistory } from "react-router-dom";

const KitchenProtect = (props) => {
    const history = useHistory();
    const staff = props.staff;

    useEffect(() => {
        if(staff === null) {
            history.push("/admin/screenlogin")
        }
    },[staff, history]);

    if (staff !== null && staff.role === "kitchen") {
        return <>{props.children}</>;
    } else {
        return <div></div>
    }
}

const mapStateToProps = ({staff}) => ({staff});
export default connect(mapStateToProps)(KitchenProtect);