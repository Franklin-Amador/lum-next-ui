

// src/app/layout.js
// import { Inter } from "next/font/google";
// import Navbar from "./components/NavBar"; // Asegúrate de ajustar la ruta si es necesario
// import "./globals.css";

// // Importa la fuente Inter
// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar /> {/* Incluye el Navbar en el layout */}
//         {children}
//       </body>
//     </html>
//   );
// }

// * v3
import { Inter } from "next/font/google";
import Sidebar from "./components/SideBar";
import Navbar from "./components/NavBar";
import { SidebarProvider } from "./context/SidebarContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}