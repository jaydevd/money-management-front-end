import axios from "axios";
import { useEffect, useState } from "react";

const useListAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/admin/list?page=${page}&limit=${limit}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const admins = result.data.data.admins;
            const count = result.data.data.count;

            setAdmins(admins);
            setTotal(count);
        }
        fetchData();
    }, [])
    return { admins, total };
}

export default useListAdmins;