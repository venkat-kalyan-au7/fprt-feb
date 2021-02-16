/**storing the user data in browsers local storage
 *  to use that in to know the user authentication status
 */
const tokenStorage = (data, cb) => {
    //checking whether browser window exists or not
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        cb();
    }
};


export default tokenStorage
