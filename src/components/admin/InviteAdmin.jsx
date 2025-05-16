import { useState } from "react";
import useInviteAdmin from '../../hooks/admin/useInviteAdmin';

const InviteAdmin = ({ setIsAdmin }) => {
    const [admin, setAdmin] = useState({
        email: '',
        name: '',
        surname: '',
        password: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await useInviteAdmin(admin);
            console.log(result);
            setIsAdmin(false);

        } catch (error) {
            console.log(error);
            setIsAdmin(false);
        }
    }

    const handleInputChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }

    return (
        <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-full bg-gray-200/50">
            <form onSubmit={onSubmit} className="flex flex-col gap-10 p-8 bg-gray-200 rounded-xl">
                <p className="text-2xl mb-3 font-medium">Invite Admin</p>
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
                        <label htmlFor="period" className="text-gray-500 font-medium">Email address</label>
                        <input type="email" name="period" onChange={handleInputChange} className="w-80 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-gray-500 font-medium">Password</label>
                        <input type="password" name="password" onChange={handleInputChange} className="w-80 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-3 px-2">
                    <button type="reset" onClick={() => setIsBorrower(false)} className="w-fit text-sky-400 rounded-full cursor-pointer">Cancel</button>
                    <button type="submit" className="w-fit text-white bg-sky-400 rounded-full px-10 py-2.5 cursor-pointer">Send invitation</button>
                </div>
            </form>
        </div>
    )
}

export default InviteAdmin;