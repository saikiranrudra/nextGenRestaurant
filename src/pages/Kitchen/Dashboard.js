import React from "react";

//components
import { Typography, Paper } from "@material-ui/core";
import TableContainer from "./../../components/kitchen/TableContainer";
import SummaryList from "./../../components/kitchen/SummaryList";

//state managemment
import { connect } from "react-redux";

//images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    heading: {
        fontFamily: "Product-Sans",
        fontSize: "4rem",
        textAlign: "center",
    },
    logo: {
        width: "11rem",
    },
    logout: {
        color: theme.palette.primary.main,
        fontSize: "1.8rem",
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        cursor: "pointer",
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem 3rem",
    },

    dashboardContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 400px",
    },
    tables: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 350px)",
        margin: "1rem",
        gridGap: ".6rem",
        placeContent: "center",
    },
    summary: {
        margin: "1rem",
        alignSelf: "start",
        position: "sticky",
        top: "1rem",
    },
}));

const Dashboard = (props) => {
    const classes = useStyle();
    return (
        <>
            <header className={classes.headerContainer}>
                <img
                    src={props.app.img ? props.app.img : logo}
                    alt="logo"
                    className={classes.logo}
                />
                <div className={classes.heading}>Kitchen Console</div>
                <Typography
                    variant="body1"
                    align="center"
                    className={classes.logout}
                >
                    Log Out
                </Typography>
            </header>
            <div className={classes.dashboardContainer}>
                <div className={classes.tables}>
                    {props.kitchenOrders.map((table, index) => (
                        <TableContainer data={table} key={index} />
                    ))}
                </div>

                <Paper className={classes.summary}>
                    <div style={{ position: "sticky", top: "1rem" }}>
                        <Typography
                            variant="h4"
                            align="left"
                            style={{ margin: "1rem 0 2rem 1rem" }}
                        >
                            Total Orders
                        </Typography>
                        <SummaryList data={props.kitchenOrders} />
                    </div>
                </Paper>
            </div>
        </>
    );
};

const mapStateToProps = ({ kitchenOrders, app }) => ({ kitchenOrders, app });
export default connect(mapStateToProps)(Dashboard);
