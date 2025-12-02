import Link from "next/link";
import Image from 'next/image';

export function Header() {
    const NavItems = [
        { name: "Home", href: "/" },
        { name: "Games", href: "/games" },
        { name: "About", href: "/about" }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">

                {/* Logo - text, but future logo.svg [cite: 72] */}
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    {/* Logo */}
                    <div className="relative w-10 h-10">
                        <Image
                            src="/icons/logo.svg"
                            alt="Galaxy Brainer Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Name */}
                    <span className="text-2xl font-bold tracking-wide font-orbitron bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
                        GALAXY BRAINER
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {NavItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-slate-300 hover:text-white font-medium text-sm tracking-wide transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Separator */}
                    <div className="h-6 w-px bg-white/10"></div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="#"
                            className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="#"
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-purple-500/20"
                        >
                            Join Now
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2">
                    <span className="sr-only">Open menu</span>
                    {/* Hamburger Icon */}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

            </div>
        </header>
    );
}