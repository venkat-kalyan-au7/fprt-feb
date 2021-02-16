const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#e9f502" };
    } else {
        return { color: "#ffffff" };
    }
};

export default isActive