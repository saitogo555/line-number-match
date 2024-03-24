"use client"

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="select-none" lang="ja">
      <head>
        <title>LINE NUMBER MATCH</title>
      </head>
      <body
        className="flex flex-col justify-center items-center w-screen h-screen bg-gray-800"
        suppressHydrationWarning={true}
        onContextMenu={(e) => e.preventDefault()}
      >
        {children}
      </body>
    </html>
  );
}
