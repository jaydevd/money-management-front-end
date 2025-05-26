import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useLogIn from "../../hooks/auth/useLogIn";

const LogIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState(location.state);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setState(null);
        }, 3000);
    }, [state]);

    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await useLogIn(data);
            navigate('/');

        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid username or password.');
                } else {
                    setError('Something went wrong. Please try again.');
                }
            } else {
                // No response received (e.g., network error)
                setError('Network error. Please try again.');
            }
        }
    }

    const emailValue = watch("email", "");
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(emailValue);

    const passwordValue = watch("password", "");
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(passwordValue);

    const passwordCriteria = {
        length: passwordValue.length >= 8,
        uppercase: /[A-Z]/.test(passwordValue),
        lowercase: /[a-z]/.test(passwordValue),
        digit: /[0-9]/.test(passwordValue),
        special: /[^A-Za-z0-9]/.test(passwordValue),
    };

    return (
        <div className="bg-sky-100 flex justify-center items-center h-screen">
            {
                state && state.message && state.type == "red" &&
                < div className="absolute top-10 right-10">
                    <p className={`w-full px-4 py-2 rounded-md bg-red-200 text-red-500`}>{state.message}</p>
                </div>
            }
            {
                state && state.message && state.type == "green" &&
                < div className="absolute top-10 right-10">
                    <p className={`w-full px-4 py-2 rounded-md bg-green-200 text-green-700`}>{state.message}</p>
                </div>
            }
            {
                error &&
                < div className="absolute top-10 right-10">
                    <p className={`w-full px-4 py-2 rounded-md text-red-500 bg-red-200`}>{error}</p>
                </div>
            }
            <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-cover bg-no-repeat bg-origin-border bg-[url('https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826')]">
                <img src="/logo.png" alt="Placeholder Image" className="object-cover w-[50vh] h-[50vh]" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4 bg-sky-100">
                        <label htmlFor="email" className="block text-gray-600">Email address</label>
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
                            className={`w-full p-3 rounded-2xl placeholder-gray-400 border ${emailValue ? (isValidEmail ? 'border-green-700' : 'border-red-500') : 'border-gray-600'}`}
                            autoComplete="on"
                        />
                        {emailValue && (errors.email || !isValidEmail) ? (
                            <p className="px-1 pt-1 text-sm text-red-400">{errors.email && errors.email.message || "Invalid email format"}</p>
                        ) : emailValue && (
                            <p className="px-1 pt-1 text-sm text-green-700">Looks good!</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-800">Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message: "One of the below validations is missing, please verify your password"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password should be at least 8 characters long"
                                },
                                maxLength: {
                                    value: 254,
                                    message: "Password should be under 254 characters"
                                }
                            })}
                            className={`w-full p-3 rounded-2xl placeholder-gray-400 border ${passwordValue ? (isValidPassword ? 'border-green-700' : 'border-red-500') : 'border-gray-600'}`}
                            autoComplete="on"
                        />
                        {errors.password ? (
                            <p className="px-1 pt-1 text-sm text-red-400">{errors.password.message}</p>
                        ) : passwordValue && (
                            <p className="px-1 pt-1 text-sm text-green-700">Looks good!</p>
                        )}
                        <ul className="text-sm mt-2 space-y-1">
                            <li>Password should include:</li>
                            <li className={passwordCriteria.length ? 'text-green-700' : 'text-gray-400'}>✓ Minimum 8 characters</li>
                            <li className={passwordCriteria.uppercase ? 'text-green-700' : 'text-gray-400'}>✓ At least one uppercase letter</li>
                            <li className={passwordCriteria.lowercase ? 'text-green-700' : 'text-gray-400'}>✓ At least one lowercase letter</li>
                            <li className={passwordCriteria.digit ? 'text-green-700' : 'text-gray-400'}>✓ At least one number</li>
                            <li className={passwordCriteria.special ? 'text-green-700' : 'text-gray-400'}>✓ At least one special character</li>
                        </ul>
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-red-500" />
                        <label htmlFor="remember" className="text-green-900 ml-2"><a href="/auth/forgot-password"></a> Remember Me</label>
                    </div>
                    <div className="mb-6 text-blue-500">
                        <a href="/auth/forgot-password" className="hover:underline">Forgot Password?</a>
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-2xl py-2 px-4 w-full">Login</button>
                </form>
            </div>
        </div >
    )
}

export default LogIn;