import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found | Galaxy Brainer',
    description: "We're sorry, the cosmic location you were trying to reach could not be found. Please return to the main hub to continue your brain training.",
    robots: {
        index: false, // Essential: Prevent search engines from indexing login pages
        follow: false,
    },
    openGraph: {
        title: '404 - Page Not Found | Galaxy Brainer',
        description: "We're sorry, the cosmic location you were trying to reach could not be found. Please return to the main hub.",
        url: 'https://galaxybrainer.com/404',
        siteName: 'Galaxy Brainer',
        // images: [
        //   {
        //     url: 'https://galaxy-brainer.com/og-image-404.jpg', // Dedicated image for the error page (recommended)
        //     width: 1200,
        //     height: 630,
        //     alt: 'Galaxy Brainer - 404 Not Found',
        //   },
        // ],
        type: 'website',
    },
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <div className="z-10 flex flex-col items-center text-center p-4">
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
        </main>
    );
}