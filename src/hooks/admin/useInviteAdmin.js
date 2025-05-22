import axios from "axios";

const useInviteAdmin = async (body) => {
    try {
        const token = localStorage.getItem("token");

        const result = await axios.post('http://localhost:5000/admin/invite', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useInviteAdmin;