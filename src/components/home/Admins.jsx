import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useInviteAdmin from "../../hooks/admin/useInviteAdmin";
import Pagination from "../common/Pagination";
import useListAdmins from './../../hooks/admin/useListAdmins';

const Admins = () => {
    const [showInviteAdmin, setShowInviteAdmin] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [message, setMessage] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 10; // items per page
    const { admins, totalAdmins } = useListAdmins(page, limit);

    useEffect(() => {
        if (message != null) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message]);

    const onInviteAdmin = async data => {
        try {
            console.log("Invite Admin Data:", data);
            const response = await useInviteAdmin(data);
            // console.log(response);
            setMessage({ message: "Invitation sent!", type: 'green' });
            setShowInviteAdmin(false);
        } catch (error) {
            console.log(error);
            setMessage({ message: "Unable to send invitation!", type: 'red' });
        }
    };

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
        <div className="p-4 sm:p-6 text-white w-full">
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
            <div className="mb-6">
                <div className="flex flex-wrap gap-4 mb-4">
                    <button
                        onClick={() => setShowInviteAdmin(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Invite admin
                    </button>
                </div>
            </div>
            <div className="bg-[#f3f4f6] rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm text-white bg-[#2a2a40] rounded-lg overflow-hidden">
                    <thead className="bg-[#1e1e2f]">
                        <tr className="text-left text-gray-400">
                            <th className="p-4 whitespace-nowrap">Name</th>
                            <th className="p-4 whitespace-nowrap">Email address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins && admins.length > 0 ? (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="border-t border-[#3a3a4f] hover:bg-[#383850]">
                                        <td className="p-4 whitespace-nowrap">{admin.full_name}</td>
                                        <td className="p-4 whitespace-nowrap">{admin.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-4 text-gray-500" colSpan="2">No records found</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            {
                showInviteAdmin && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                        <div className="bg-[#2a2a40] p-6 rounded-xl w-full max-w-md shadow-xl relative">
                            <button onClick={() => setShowInviteAdmin(false)} className="absolute top-5 right-5 text-white">✕</button>
                            <h2 className="text-xl font-semibold mb-4">Invite Admin</h2>
                            <form onSubmit={handleSubmit(onInviteAdmin)} className="space-y-2">
                                <input {...register("name")} placeholder="First Name" className="w-full rounded-2xl px-5 py-4 bg-[#1e1e2f] text-white" />
                                <input {...register("surname")} placeholder="Last Name" className="w-full px-5 py-4 rounded-2xl bg-[#1e1e2f] text-white" />
                                <input {...register("email")} placeholder="Emil address" className="w-full px-5 py-4 rounded-2xl bg-[#1e1e2f] text-white" />
                                <input
                                    placeholder="Password"
                                    type="password"
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
                                    className={`w-full px-5 py-4 rounded-2xl bg-[#1e1e2f] text-white ${passwordValue ? (isValidPassword ? 'border-green-500' : 'border-red-500') : 'border-gray-600'}`}
                                />
                                {passwordValue && errors.password ? (
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
                                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 mt-2 rounded-2xl">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
            <Pagination page={page} setPage={setPage} totalItems={totalAdmins} limit={limit} />
        </div>
    );
}

export default Admins;