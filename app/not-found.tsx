import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold mb-6">Something's missing...</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
                It looks like the page you're looking for doesn't exist. Don't worry, you can always head back to the main database and find something awesome to play!
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
            >
                &larr; Back to Home
            </Link>
        </div>
    );
}