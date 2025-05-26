import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyLink = ({ children }) => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const verifyLink = async () => {
        try {

            // const baseUrl = 'https://money-management-f0al.onrender.com';
            const baseUrl = 'http://localhost:5000';

            const response = await axios.get(`${baseUrl}/auth/verify/${id}/${token}`);

        } catch (error) {
            console.log(error);
            if (error.response.status !== 200) {
                navigate('/auth/forgot-password', { state: { message: "link is not valid. Try again", type: "red" } });
            }
        }
    }
    verifyLink();
    return children;
}

export default VerifyLink;