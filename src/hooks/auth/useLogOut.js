import axios from "axios";

const useLogOut = async () => {
    try {

        const token = localStorage.getItem("token");

        await axios.post("http://localhost:5000/auth/logout", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.clear();

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export default useLogOut;