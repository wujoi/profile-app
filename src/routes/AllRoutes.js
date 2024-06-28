import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import CreateProfile from "../pages/CreateProfile";
import ViewProfile from "../pages/ViewProfile";
import EditProfile from "../pages/EditProfile";

const AllRoutes = ({
    localProfiles,
    setLocalProfiles,
    currentUser,
    setCurrentUser,
    sessionTimeout,
}) => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
                path="/"
                element={
                    <Login
                        localProfiles={localProfiles}
                        setCurrentUser={setCurrentUser}
                        sessionTimeout={sessionTimeout}
                    />
                }
            />
            <Route
                path="/create-profile"
                element={
                    <CreateProfile
                        localProfiles={localProfiles}
                        setLocalProfiles={setLocalProfiles}
                        setCurrentUser={setCurrentUser}
                    />
                }
            />

            <Route
                path="/view-profile"
                element={
                    <ViewProfile
                        localProfiles={localProfiles}
                        currentUser={currentUser}
                        setLocalProfiles={setLocalProfiles}
                        setCurrentUser={setCurrentUser}
                    />
                }
            />
            <Route
                path="/edit-profile"
                element={
                    <EditProfile
                        localProfiles={localProfiles}
                        currentUser={currentUser}
                        setLocalProfiles={setLocalProfiles}
                        setCurrentUser={setCurrentUser}
                    />
                }
            />
        </Routes>
    );
};

export default AllRoutes;
