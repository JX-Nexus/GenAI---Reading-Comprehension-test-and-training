import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../server/auth.js';
import { login } from '../store/slice/authSlice';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(userData);
            if (response && response.statusCode === 200) {
                const userData = response.data.data;
                dispatch(login({ userData }));
                navigate("/rec");
                
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="max-w-md w-full p-6 shadow-lg rounded-lg border-2 border-green-500 bg-white">
                <h2 className="text-green-700 text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-green-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-green-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
