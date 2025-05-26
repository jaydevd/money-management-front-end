import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";

const useListAdmins = (page, limit) => {
    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const token = getCookie("token");

            // const baseUrl = 'https://money-management-f0al.onrender.com';
            const baseUrl = 'http://localhost:5000';

            const response = await axios.get(`${baseUrl}/admin/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const admins = response.data.data.admins;
            const count = response.data.data.count;

            setAdmins(admins);
            setTotalAdmins(count);
        }
        fetchData();
    }, []);

    return { admins, totalAdmins };
}

export default useListAdmins;