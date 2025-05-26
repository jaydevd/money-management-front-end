import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";

const useGetUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {

                const token = getCookie("token");

                // const baseUrl = 'https://money-management-f0al.onrender.com';
                const baseUrl = 'http://localhost:5000';

                const response = await axios.get(`${baseUrl}/drop-down/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                setUsers(data);

                return data;

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);
    return users;
}

export default useGetUsers;