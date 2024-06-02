// components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 z-10 shadow-md">
            <div >
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/register" className="hover:text-gray-400">
                            新規会員登録
                        </Link>
                    </li>
                    <li>
                        <Link href="/signin" className="hover:text-gray-400">
                            ログイン
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
