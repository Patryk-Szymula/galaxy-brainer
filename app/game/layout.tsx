import React from 'react';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* 1. Header specyficzny dla sekcji gier (np. z licznikiem punktów, przyciskiem pauzy) */}


      {/* 2. Główna zawartość strony (dzieci: page.tsx, zagnieżdżony layout) */}
      <section className="flex-grow p-4 md:p-8">
        {children}
      </section>

      {/* 3. Opcjonalny Footer dla sekcji gier */}
      {/* <GameFooter /> */}
    </main>
  );
}