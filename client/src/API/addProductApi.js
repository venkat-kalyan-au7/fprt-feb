import { API } from "../config";

const addProduct = (userId, token, product) => {
    return fetch(`${API}/product/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export default addProduct