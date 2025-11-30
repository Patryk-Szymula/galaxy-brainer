export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 text-center text-white/40 text-sm bg-transparent relative z-10">
            <div className="container mx-auto px-4">
                <p>
                    &copy; {currentYear} Galaxy Brainer
                </p>
                <p className="mt-1">
                    Designed & Built for exploring intelligence.
                </p>
            </div>
        </footer>
    );
}