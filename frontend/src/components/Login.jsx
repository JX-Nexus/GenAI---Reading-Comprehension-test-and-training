import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../server/auth.js'
import { login } from '../store/slice/authSlice';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const userData = await authService.login(data);
            if (userData) {
                dispatch(login(userData));
                navigate("/rec"); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-w-fit p-6 shadow-lg rounded-lg border-2 mt-20 border-green-500 bg-white">
            <h2 className="text-green-700">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    className={`bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
