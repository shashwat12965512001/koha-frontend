import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "PESU Library System",
  description: "A Koha-like library management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className={`flex flex-col min-h-screen`} data-new-gr-c-s-check-loaded="14.1244.0" data-gr-ext-installed="">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}