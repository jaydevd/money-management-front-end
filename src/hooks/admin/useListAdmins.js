import axios from "axios";
import { useEffect, useState } from "react";

const useListAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/admin/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const admins = result.data.data.admins;
            const count = result.data.data.count;

            setAdmins(admins);
            setTotalAdmins(count);
        }
        fetchData();
    }, [])
    return { admins, totalAdmins };
}

export default useListAdmins;