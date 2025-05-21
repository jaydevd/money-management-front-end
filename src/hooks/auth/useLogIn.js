import axios from "axios";

const useLogIn = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/auth/login', data);

        const token = result.data.data.token;
        const admin = result.data.data.adminDetails;

        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(admin));

        console.log(result);

        return result;

    } catch (error) {
        console.log(error);
        localStorage.clear();
    }
}

export default useLogIn;