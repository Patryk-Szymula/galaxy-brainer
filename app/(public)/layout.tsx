import React from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      {children}
    </div>
  );
}