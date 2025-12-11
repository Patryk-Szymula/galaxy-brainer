import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Galaxy Brainer - Free Online Brain Training Games',
  description: 'Level up your intelligence with Galaxy Brainer. Play free, space-themed logic games designed to train memory, reflex, and focus. Start your brain workout today.',
  openGraph: {
    title: 'Galaxy Brainer - Free Online Brain Training Games',
    description: 'Level up your intelligence with Galaxy Brainer. Play free, space-themed logic games designed to train memory, reflex, and focus.',
    url: 'https://galaxybrainer.com',
    siteName: 'Galaxy Brainer',
    locale: 'en_US',
    type: 'website',
    // images: [
    //   {
    //     url: '/og-home.png', // Obrazek promocyjny (np. zrzut ekranu strony głównej), 1200x630px
    //     width: 1200,
    //     height: 630,
    //     alt: 'Galaxy Brainer Home Page',
    //   },
    // ],
  },
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Content Container */}
      <div className="z-10 flex flex-col items-center text-center p-4">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-300 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
          GALAXY BRAINER
        </h1>
        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
          Train your brain with exciting mini-games designed to boost your memory and reflexes.
          Enjoy a sci-fi themed experience that challenges your cognitive skills.
        </p>
        <div className="flex gap-4">
          <Link
            href="/games"
            className="px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
          >
            Start training
          </Link>
        </div>
      </div>
    </main>
  );
}
