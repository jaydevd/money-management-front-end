import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyAdmin = ({ children }) => {

    const { id, token } = useParams();

    console.log('id, token: ', id, token);
    const navigate = useNavigate();

    const verifyAdmin = async () => {
        try {
            // const baseUrl = 'https://money-management-f0al.onrender.com';
            const baseUrl = 'http://localhost:5000';

            const response = await axios.get(`${baseUrl}/admin/verify/${id}/${token}`);

        } catch (error) {
            console.log(error);
            if (error.response.status !== 200) {
                navigate('/auth/login', { state: { message: "link is not valid", type: "red" } });
            }
        }
    }
    verifyAdmin();
    return children;
}

export default VerifyAdmin;