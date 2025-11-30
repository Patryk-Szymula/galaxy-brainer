import Link from "next/link";

export function Header() {
    const NavItems = [
        { name: "Home", href: "/" },
        { name: "Games", href: "/games" },
        { name: "About", href: "/about" }
    ];

    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                {/* Logo - text, but future logo.svg [cite: 72] */}
                <Link href="/" className="text-2xl font-bold text-white tracking-wider hover:opacity-80 transition-opacity">
                    GALAXY BRAINER
                </Link>

                {/* Navigation Links */}
                <nav>
                    <ul className="flex space-x-6">
                        {NavItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-white/80 hover:text-white font-medium text-lg transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}