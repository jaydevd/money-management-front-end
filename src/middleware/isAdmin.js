import getCookie from "../helpers/getCookie";

const isAdmin = () => {
    try {

        const token = getCookie("token");
        if (!token) return false;
        return true;

    } catch (error) {
        console.log(error);
    }
}

export default isAdmin;