import { useState } from "react";
import useAddLender from '../../hooks/lender/useAddLender';

const AddLender = ({ setIsLender }) => {
    const [lender, setLender] = useState({
        name: '',
        surname: '',
        address: '',
        interest: '',
        period: '',
        amountBorrowed: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await useAddLender(lender);
            console.log(result);
            setIsLender(false);

        } catch (error) {
            console.log(error);
            setIsLender(false);
        }
    }

    const handleInputChange = (e) => {
        setLender({ ...lender, [e.target.name]: e.target.value });
    }

    return (
        <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-full bg-gray-200/50">
            <form onSubmit={onSubmit} className="flex flex-col gap-10 p-8 bg-gray-200 rounded-xl">
                <p className="text-2xl mb-3 font-medium">Add Lender</p>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-gray-500 font-medium">First Name</label>
                        <input type="text" name="name" onChange={handleInputChange} className="rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="surname" className="text-gray-500 font-medium">Surname</label>
                        <input type="text" name="surname" onChange={handleInputChange} className="rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="address" className="text-gray-500 font-medium">Address</label>
                        <textarea name="address" onChange={handleInputChange} className="w-96 h-20 rounded-md px-4 py-2 bg-gray-100 resize-none"></textarea>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="amountBorrowed" className="text-gray-500 font-medium">Amount Borrowed</label>
                        <input type="number" name="amountBorrowed" onChange={handleInputChange} className="rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="interest" className="text-gray-500 font-medium">Rate of Interest</label>
                        <input type="number" name="interest" onChange={handleInputChange} className="w-20 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="period" className="text-gray-500 font-medium">Time (in years)</label>
                        <input type="number" name="period" onChange={handleInputChange} className="w-20 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-3 px-2">
                    <button type="reset" onClick={() => setIsLender(false)} className="w-fit text-sky-400 rounded-full cursor-pointer">Cancel</button>
                    <button type="submit" className="w-fit text-white bg-sky-400 rounded-full px-10 py-2.5 cursor-pointer">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddLender;