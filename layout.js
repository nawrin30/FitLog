import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FitLogProvider } from "../context/FitLogContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            containerStyle={{ top: 72, right: 18, zIndex: 99999 }}
            toastOptions={{
              duration: 2200,
              style: {
                background: "#151619",
                color: "#fff",
                border: "1px solid #2a2c30",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "800"
              }
            }}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}
