import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyAdmin = ({ children }) => {

    const { id, token } = useParams();

    console.log('id, token: ', id, token);
    const navigate = useNavigate();

    const verifyAdmin = async () => {
        try {

            const response = await axios.get(`http://localhost:5000/admin/verify/${id}/${token}`);

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