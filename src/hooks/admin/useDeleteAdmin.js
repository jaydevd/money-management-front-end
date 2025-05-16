import axios from "axios";

const useDeleteAdmin = async (body) => {
    try {
        const token = localStorage.getItem("token");

        const result = await axios.post('http://localhost:5000/admin/delete', body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useDeleteAdmin;