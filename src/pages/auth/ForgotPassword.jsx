import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useForgotPassword from './../../hooks/auth/useForgotPassword';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [message, setMessage] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (message != null) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message]);

    const state = location.state;

    const onSubmit = async (data) => {
        try {

            const response = await useForgotPassword(data);
            navigate('/auth/login', { state: { message: "Please check your mail inbox to reset the password", type: "green" } });

        } catch (error) {
            console.log(error);

            if (error.response.status === 401) {
                setMessage({ message: "Unable to send a link, please try again", type: "red" });
            }
        }
    }

    const emailValue = watch("email", "");
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(emailValue);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-orange-400 p-4">
            {
                message && message.type == "red" &&
                <div className="absolute top-10 right-10">
                    <p className="px-5 py-3 bg-red-200 text-red-500 rounded-2xl">{message.message}</p>
                </div>
            }
            {
                message && message.type == "green" &&
                <div className="absolute top-10 right-10">
                    <p className="px-5 py-3 bg-green-200 text-green-700 rounded-2xl">{message.message}</p>
                </div>
            }
            <div className="bg-[#2a2a40] p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <p className="text-sm text-gray-300 mb-6 text-center">Enter your registered email address and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
                                    message: "Entered value does not match email format",
                                },
                            })}
                            className={`w-full border-2 border-gray-300 rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-500 ${emailValue ? (isValidEmail ? 'border-green-500' : 'border-red-500') : 'border-gray-600'}`}
                            autoComplete="on"
                        />
                        {errors.email ? (
                            <p className="px-1 pt-1 text-sm text-red-400">{errors.email.message}</p>
                        ) : emailValue && (
                            <p className="px-1 pt-1 text-sm text-green-400">Looks good!</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-2xl font-semibold hover:opacity-90"
                    >
                        Send Reset Link
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Remembered your password? <a href="/auth/login" className="text-pink-400 hover:underline">Back to login</a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;