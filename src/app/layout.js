import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/context/AuthContext";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Business Growth - Dashboard",
  description: "Access the business dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       {/* <head>
        <link rel="icon" href="/title-icon.png" type="image/png" />
      </head> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <AuthProvider>
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}