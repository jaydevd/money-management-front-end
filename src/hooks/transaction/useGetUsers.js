import axios from "axios";
import { useEffect, useState } from "react";

const useGetUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = localStorage.getItem('token');

                const result = await axios.get(`http://localhost:5000/drop-down/users`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const data = result.data.data;
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