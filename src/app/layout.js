import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "../middleware";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Construction Punch Lists",
  description: "Manage your job site tasks and punch lists",
};

export default function RootLayout({ children }) {
  return (
    <html supresshydrationwarning lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
