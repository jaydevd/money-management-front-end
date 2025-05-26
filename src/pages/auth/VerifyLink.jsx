import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyLink = ({ children }) => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const verifyLink = async () => {
        try {

            const response = await axios.get(`http://localhost:5000/auth/verify/${id}/${token}`);

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