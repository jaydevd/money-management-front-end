import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getCookie from "../../helpers/getCookie";
import Pagination from "../common/Pagination";
import useAddBorrower from './../../hooks/borrower/useAddBorrower';
import useMakeTransaction from './../../hooks/borrower/useMakeTransaction';
import useGetUsers from './../../hooks/transaction/useGetUsers';

const Borrowers = () => {
    const [showAddBorrower, setShowAddBorrower] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);
    const { register, handleSubmit } = useForm();
    const users = useGetUsers().filter(user => user.type === 'borrower');
    const [message, setMessage] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 10; // items per page

    const [borrowers, setBorrowers] = useState([]);
    const [totalBorrowers, setTotalBorrowers] = useState(0);

    useEffect(() => {
        if (message != null) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message]);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = getCookie('token');

            const result = await axios.get(`https://money-management-f0al.onrender.com/borrower/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const borrowers = result.data.data.borrowers;
            const count = result.data.data.count;

            setBorrowers(borrowers);
            setTotalBorrowers(count);
        }
        fetchData();
    }, [page, limit])

    const onAddBorrower = async data => {
        try {
            console.log("Add Borrower Data:", data);
            const response = await useAddBorrower(data);
            console.log(response);
            setMessage({ message: "Borrower added", type: "green" });
            setShowAddBorrower(false);
        } catch (error) {
            console.log(error);
            setMessage({ message: "Unable to add borrower", type: "red" });
        }
    };

    const onTransaction = async data => {
        try {
            const response = await useMakeTransaction(data);
            setShowTransaction(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-4 sm:p-6 text-white w-full">
            {
                message && message.type == "green" &&
                <div className='absolute top-10 right-10'>
                    <p className="bg-green-200 text-green-700 px-5 py-3 rounded-2xl">{message.message}</p>
                </div>
            }
            {
                message && message.type == "red" &&
                <div className='absolute top-20 right-10'>
                    <p className="bg-red-200 text-red-500 px-5 py-3 rounded-2xl">{message.message}</p>
                </div>
            }
            <div className="mb-6">
                <div className="flex flex-wrap gap-4 mb-4">
                    <button
                        onClick={() => setShowAddBorrower(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add borrower
                    </button>
                    {
                        borrowers.length > 0 ? (
                            <button
                                onClick={() => setShowTransaction(true)}
                                className="bg-[#3a1c71] hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
                            >
                                New transaction
                            </button>
                        ) : (
                            <button
                                className="bg-[#3a1c71] opacity-50 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                                title='Add a borrower to make new transaction'
                            >
                                New transaction
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="bg-[#f3f4f6] rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm text-white bg-[#2a2a40] rounded-lg overflow-hidden">
                    <thead className="bg-[#1e1e2f]">
                        <tr className="text-left text-gray-400">
                            <th className="p-4 whitespace-nowrap">Borrower Name</th>
                            <th className="p-4 whitespace-nowrap">Interest(%)</th>
                            <th className="p-4 whitespace-nowrap">Time (years)</th>
                            <th className="p-4 whitespace-nowrap">Amount Paid</th>
                            <th className="p-4 whitespace-nowrap">Remaining Amount</th>
                            <th className="p-4 whitespace-nowrap">Due Amount</th>
                            <th className="p-4 whitespace-nowrap">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowers && borrowers.length > 0 ? (
                            borrowers.map((borrower) => (
                                <tr key={borrower.id} className="border-t border-[#3a3a4f] hover:bg-[#383850]">
                                    <td className="p-4 whitespace-nowrap">{borrower.full_name}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.interest}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.period}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.amount_paid}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.remaining_amount}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.due_amount}</td>
                                    <td className="p-4 whitespace-nowrap">{borrower.total_amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-4 text-gray-400" colSpan="6">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showAddBorrower && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-[#2a2a40] p-6 rounded-xl w-full max-w-md shadow-xl relative">
                        <button onClick={() => setShowAddBorrower(false)} className="absolute top-5 right-5 text-white">✕</button>
                        <h2 className="text-xl font-semibold mb-4">Add Borrower</h2>
                        <form onSubmit={handleSubmit(onAddBorrower)} className="space-y-2">
                            <input {...register("name")} placeholder="First Name" className="w-full rounded-2xl px-5 py-3 bg-[#1e1e2f] text-white" />
                            <input {...register("surname")} placeholder="Last Name" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <textarea {...register("address")} placeholder="Address" className="w-full mb-0 px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white resize-none" />
                            <input {...register("amountLended")} placeholder="Amount Lended" type="number" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <input {...register("interest")} placeholder="Rate of interest" type="number" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <input {...register("period")} placeholder="Time period to repay the amount" type="number" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 mt-3 rounded-2xl">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {showTransaction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-[#2a2a40] p-6 rounded-xl w-full max-w-md shadow-xl relative">
                        <button onClick={() => setShowTransaction(false)} className="absolute top-5 right-5 text-white">✕</button>
                        <h2 className="text-xl font-semibold mb-4">New Transaction</h2>
                        <form onSubmit={handleSubmit(onTransaction)} className="space-y-3">
                            <select {...register("userId")} className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white">
                                {
                                    users &&
                                        users.length > 0 ?
                                        (
                                            users.map((user) => {
                                                return (
                                                    <option key={user.id} value={user.id}>{user.name + " " + user.surname}</option>
                                                )
                                            })
                                        ) : (
                                            <option value="none" disabled>no users found</option>
                                        )
                                }
                            </select>
                            <input {...register("date")} type="date" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <input {...register("amount")} placeholder="amount" type="number" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <input {...register("notes")} placeholder="Notes (optional)" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-2xl">Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <Pagination page={page} setPage={setPage} totalItems={totalBorrowers} limit={limit} />
        </div>
    );
}

export default Borrowers;