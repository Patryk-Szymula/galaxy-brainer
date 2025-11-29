import React from 'react';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Here goes the game page content */}

      {/*Here could be a header for the game section */}
      <section className="flex-grow p-4 md:p-8">
        {children}
      </section>

      {/* <GameFooter /> */}
    </main>
  );
}