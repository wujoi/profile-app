import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AllRoutes from "./routes/AllRoutes";
import SessionTimeoutHandler from "./components/SessionTimeoutHandler";
import { getCurrentUserFromLocalStorage } from "./utils/authHelpers";

function App() {
    const [localProfiles, setLocalProfiles] = useState(
        JSON.parse(localStorage.getItem("profiles")) || []
    );
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionTimeout, setSessionTimeout] = useState(false);

    const saveLocalProfiles = (newProfiles) => {
        setLocalProfiles(newProfiles);
        localStorage.setItem("profiles", JSON.stringify(newProfiles));
    };

    useEffect(() => {
        const user = getCurrentUserFromLocalStorage();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Router>
            <SessionTimeoutHandler
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setSessionTimeout={setSessionTimeout}
            />
            <AllRoutes
                localProfiles={localProfiles}
                setLocalProfiles={saveLocalProfiles}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                sessionTimeout={sessionTimeout}
            />
        </Router>
    );
}

export default App;
