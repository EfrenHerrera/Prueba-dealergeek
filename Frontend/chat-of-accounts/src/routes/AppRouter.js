import React from 'react';
import { Navigate, Outlet, Routes, Route, BrowserRouter } from "react-router-dom";

import AdminLayout from "../layout/Admin";



import routes from "./routes.js";

const AppRouter = () => {

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/") {
                if (prop.List) {
                    return prop.List.map((prop2, key2) => {
                        return (
                            <Route
                                path={prop2.path}
                                element={prop2.component}
                                key={key2}
                            />
                        );
                    });
                } else {
                    return (
                        <Route
                            path={prop.path}
                            element={prop.component}
                            key={key}
                        />
                    );
                }
            } else {
                return (
                    <Route
                        path={prop.path}
                        element={prop.component}
                        key={key}
                    />
                );
            }
        });
    };
    
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <AdminLayout /> } >
                        {getRoutes(routes)}
                        <Route path="*"  element={ <Navigate to="/" />} />
                    </Route>
                </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
