import React from 'react';

// USUŃ: importy fontów, import globals.css, definicję Metadata

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Tutaj możesz dodać specyficzną dla strony głównej nawigację lub inne UI */}
      {children}
    </div>
  );
}