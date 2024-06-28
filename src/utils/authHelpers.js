export const logout = (setCurrentUser, navigate) => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
};

export const getCurrentUserFromLocalStorage = () => {
    return localStorage.getItem("currentUser");
};
