import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/authHelpers";

// Handle 60 second session timeout
// Clear the timeout if the user changes or logs out
const SessionTimeoutHandler = ({
    currentUser,
    setCurrentUser,
    setSessionTimeout,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        let logoutTimeout;

        if (currentUser) {
            logoutTimeout = setTimeout(() => {
                logout(setCurrentUser, navigate);
                setSessionTimeout(true);
            }, 60000);
        } else {
            setSessionTimeout(false);
        }

        return () => clearTimeout(logoutTimeout);
    }, [currentUser, setCurrentUser, setSessionTimeout]);

    return null;
};

export default SessionTimeoutHandler;