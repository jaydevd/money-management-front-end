const isAdmin = () => {
    const token = localStorage.getItem("token");
    return token !== null;
}

export default isAdmin;