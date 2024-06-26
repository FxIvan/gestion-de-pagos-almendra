import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/ContainerHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Payment registration platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
