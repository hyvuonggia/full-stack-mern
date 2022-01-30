import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Landing() {
    return (
        <Fragment>
            <Navigate to="/login" />
            <Outlet />
        </Fragment>
    );
}
