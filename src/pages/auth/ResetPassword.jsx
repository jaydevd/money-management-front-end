import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useResetPassword from './../../hooks/auth/useResetPassword';

const ResetPassword = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    // const [message, setMessage] = useState(null);
    const location = useLocation();
    const state = location.state;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await useResetPassword({ id, ...data });
            navigate('/auth/login', { state: { message: "Password reset successfully! Log in with the new password", type: "green" } });

        } catch (error) {
            console.log(error);

            const state = {
                message: "Something went wrong!",
                type: "red"
            }

            if (error.response) {
                if (error.response.status === 401) {
                    state.message = "Unable to reset password. Please try again";
                }
            } else {
                state.message = "Network error. Please try again";
            }
            navigate('/auth/login', { state });
        }
    }

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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-orange-400 p-4">
            {
                state && state.type == "red" &&
                <div className="absolute top-10 right-10">
                    <p className="px-5 py-3 bg-red-200 text-red-500 rounded-2xl">{state.message}</p>
                </div>
            }
            {
                state && state.type == "green" &&
                <div className="absolute top-10 right-10">
                    <p className="px-5 py-3 bg-green-200 text-green-700 rounded-2xl">{state.message}</p>
                </div>
            }
            <div className="bg-[#2a2a40] p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                <p className="text-sm text-gray-300 mb-6 text-center">Enter your new password</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
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
                            className={`w-full border-2 border-gray-300 rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-500 ${passwordValue ? (isValidPassword ? 'border-green-500' : 'border-red-500') : 'border-gray-600'}`}
                            autoComplete="on"
                        />
                        {errors.password ? (
                            <p className="px-1 pt-1 text-sm text-red-400">{errors.password.message}</p>
                        ) : passwordValue && (
                            <p className="px-1 pt-1 text-sm text-green-400">Looks good!</p>
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
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-2xl font-semibold hover:opacity-90"
                    >
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;