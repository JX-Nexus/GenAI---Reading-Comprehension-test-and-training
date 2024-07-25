import React from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from './logOut';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.status);

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
            </div>

            <nav className='flex-grow'>
                <ul className="flex justify-center space-x-4">
                    <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link to="/entries" className="hover:text-gray-300">Entries</Link></li>
                    <li>
                        <Link to={isLoggedIn ? "/customer" : "/login"} className="hover:text-gray-300">
                            {isLoggedIn ? "Customer" : "LogIn"}
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className='flex items-center'>
                {isLoggedIn && <LogoutBtn />}
            </div>
        </header>
    );
};

export default Header;
