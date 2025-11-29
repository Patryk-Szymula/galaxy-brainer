import React from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Here goes the public page content} */}
      {children}
    </div>
  );
}