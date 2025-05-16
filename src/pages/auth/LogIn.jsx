import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogIn from "../../hooks/auth/useLogIn";

const LogIn = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await useLogIn(data);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-full bg-gray-200/50">
            <form onSubmit={onSubmit} className="flex flex-col gap-10 p-8 bg-gray-200 rounded-xl">
                <p className="text-2xl mb-3 font-medium">Log In</p>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-gray-400 font-medium">Email address</label>
                        <input type="email" name="email" onChange={handleInputChange} className="w-80 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-gray-400 font-medium">Password</label>
                        <input type="password" name="password" onChange={handleInputChange} className="w-80 rounded-md px-4 py-2 bg-gray-100" />
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 px-2">
                    <button type="submit" className="w-fit text-white bg-sky-400 rounded-full px-10 py-2.5 cursor-pointer">Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn;