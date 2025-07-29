import "./globals.css";

export const metadata = {
  title: "HPM Tech Solutions",
  description: "Modern technology solutions for your business",
};

import RootLayoutClient from './components/root-layout-client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
