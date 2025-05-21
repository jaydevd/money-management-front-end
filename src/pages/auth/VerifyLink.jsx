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
            if (!error.response.ok) {
                navigate('/auth/forgot-password', { state: { message: "link is not valid. Try again", styles: "bg-red-200 text-red-600" } });
            }
        }
    }
    verifyLink();
    return children;

}

export default VerifyLink;