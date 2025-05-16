import { useState } from "react";
import useMakeTransaction from "../../hooks/borrower/useMakeTransaction";
import DropDown from "../transaction/DropDown";

const Transaction = ({ setIsTransaction }) => {
    const [transaction, setTransaction] = useState({
        amount: '',
        userId: '',
        notes: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await useMakeTransaction(transaction);
            console.log(result);
            setIsTransaction(false);

        } catch (error) {
            console.log(error);
            setIsTransaction(false);
        }
    }

    const handleInputChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

    return (
        <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-full bg-gray-200/50">
            <form onSubmit={onSubmit} className="flex flex-col gap-10 p-8 bg-gray-200 rounded-xl">
                <p className="text-2xl mb-3 font-medium">Make Transaction</p>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="userId" className="text-gray-500 font-medium">Select User</label>
                        <DropDown handleInputChange={handleInputChange} name="userId" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="amount" className="text-gray-500 font-medium">Amount</label>
                        <input type="number" name="amount" onChange={handleInputChange} className="rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="notes" className="text-gray-500 font-medium">Note</label>
                        <input type="text" name="notes" onChange={handleInputChange} className="rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-3 px-2">
                    <button type="reset" onClick={() => setIsTransaction(false)} className="w-fit text-sky-400 rounded-full cursor-pointer">Cancel</button>
                    <button type="submit" className="w-fit text-white bg-sky-400 rounded-full px-10 py-2.5 cursor-pointer">Save</button>
                </div>
            </form>
        </div>
    )
}

export default Transaction;