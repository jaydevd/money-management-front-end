import axios from "axios";
import { useEffect, useState } from "react";

const useTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/transaction/list?page=${page}&limit=${limit}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const transactions = result.data.data.transactions;
            const count = result.data.data.count;

            setTransactions(transactions);
            setTotal(count);
        }
        fetchData();
    }, [])
    return { transactions, total };
}

export default useTransactionList;