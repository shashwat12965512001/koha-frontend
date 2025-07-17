import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PESU Library System",
  description: "A Koha-like library management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className={`flex flex-col min-h-screen`} data-new-gr-c-s-check-loaded="14.1244.0" data-gr-ext-installed="">
        <Header />
        <main className="flex-1 px-6 py-4 bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}