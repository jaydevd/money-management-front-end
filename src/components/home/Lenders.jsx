import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getCookie from '../../helpers/getCookie';
import Pagination from '../common/Pagination';
import useAddLender from './../../hooks/lender/useAddLender';
import useMakeTransaction from './../../hooks/lender/useMakeTransaction';
import useGetUsers from './../../hooks/transaction/useGetUsers';

const Lenders = () => {

    const [showAddLender, setShowAddLender] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);

    const { register, handleSubmit } = useForm();
    const users = useGetUsers();

    const [lenders, setLenders] = useState([]);
    const [totalLenders, setTotalLenders] = useState(0);

    const [page, setPage] = useState(1);
    const limit = 10; // items per page

    useEffect(() => {
        const fetchLenders = async () => {
            try {

                const token = getCookie("token");

                const response = await axios.get(`http://localhost:5000/lender/list?page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setLenders(response.data.data.lenders);
                setTotalLenders(response.data.data.count);

            } catch (error) {
                console.error('Error fetching lenders:', error);
            }
        };

        fetchLenders();
    }, [page, limit]);

    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (message != null) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message]);

    const onAddLender = async data => {
        try {
            const response = await useAddLender(data);
            setMessage({ message: "Lender added", type: "green" });
            setShowAddLender(false);
        } catch (error) {
            console.log(error);
            setMessage({ message: "Unable to add lender", type: "red" });
        }
    };

    const onTransaction = async data => {
        try {
            const response = await useMakeTransaction(data);
            setMessage({ message: "Transaction successful!", type: "green" });
            setShowTransaction(false);
        } catch (error) {
            console.log(error);
            setMessage({ message: "Transaction failed!", type: "red" });
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
                        onClick={() => setShowAddLender(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add lender
                    </button>
                    <button
                        onClick={() => setShowTransaction(true)}
                        className="bg-[#3a1c71] hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
                    >
                        New transaction
                    </button>
                </div>
            </div>
            <div className="bg-[#f3f4f6] rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm text-white bg-[#2a2a40] rounded-lg overflow-hidden">
                    <thead className="bg-[#1e1e2f]">
                        <tr className="text-left text-gray-400">
                            <th className="p-4 whitespace-nowrap">Lender Name</th>
                            <th className="p-4 whitespace-nowrap">Interest(%)</th>
                            <th className="p-4 whitespace-nowrap">Time (years)</th>
                            <th className="p-4 whitespace-nowrap">Amount Received</th>
                            <th className="p-4 whitespace-nowrap">Remaining Amount</th>
                            <th className="p-4 whitespace-nowrap">Due Amount</th>
                            <th className="p-4 whitespace-nowrap">Total Amount</th>
                            <th className="p-4 whitespace-nowrap">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lenders && lenders.length > 0 ? (
                            lenders.map((lender) => (
                                <tr key={lender.id} className="border-t border-[#3a3a4f] hover:bg-[#383850]">
                                    <td className="p-4 whitespace-nowrap">{lender.full_name}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.interest}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.period}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.amount_received}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.remaining_amount}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.due_amount}</td>
                                    <td className="p-4 whitespace-nowrap">{lender.total_amount}</td>
                                    <td className="p-4 whitespace-nowrap">{(new Date(lender.date * 1000).toISOString().slice(0, 10))}</td>
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

            {showAddLender && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-[#2a2a40] p-6 rounded-xl w-full max-w-md shadow-xl relative">
                        <button onClick={() => setShowAddLender(false)} className="absolute top-5 right-5 text-white">✕</button>
                        <h2 className="text-xl font-semibold mb-4">Add Lender</h2>
                        <form onSubmit={handleSubmit(onAddLender)} className="space-y-2">
                            <input {...register("name")} placeholder="First Name" className="w-full rounded-2xl px-5 py-3 bg-[#1e1e2f] text-white" />
                            <input {...register("surname")} placeholder="Last Name" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
                            <textarea {...register("address")} placeholder="Address" className="w-full mb-0 px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white resize-none" />
                            <input {...register("amountBorrowed")} placeholder="Amount Borrowed" type="number" className="w-full px-5 py-3 rounded-2xl bg-[#1e1e2f] text-white" />
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
                                    users && users.length > 0 ? (users.map((user) => {
                                        return (
                                            <option value={user.id}>{user.name + " " + user.surname}</option>
                                        )
                                    })) : (
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
            <Pagination page={page} setPage={setPage} totalItems={totalLenders} limit={limit} />
        </div>
    );
};

export default Lenders;