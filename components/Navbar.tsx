import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
    const router = useRouter();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'EMIs', path: '/emis' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Insights', path: '/insights' },
    ];

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold">
                        EMI-Pilot
                    </Link>

                    <div className="flex gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`hover:text-gray-200 transition-colors ${router.pathname === item.path ? 'font-semibold border-b-2' : ''
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
