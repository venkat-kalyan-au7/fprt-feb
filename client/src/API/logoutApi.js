import {API} from "../config"
const logout = cb => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        cb();
        return fetch(`${API}/logout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
};


export default logout