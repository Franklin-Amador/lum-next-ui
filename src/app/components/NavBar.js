
// * navbar v2
// "use client";

// import React from "react";
// import Link from "next/link";
// import { useSidebar } from "../context/SidebarContext";

// export default function Navbar() {
//   const { toggleSidebar } = useSidebar();

//   return (
//     <nav className="bg-blue-600 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <button
//               onClick={toggleSidebar}
//               className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//             <Link href="/" className="ml-4 font-bold text-xl text-white">
//               Lumina
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import React from "react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center h-16">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link href="/" className="ml-4 font-bold text-xl text-white">
            Lumina
          </Link>
        </div>
      </div>
    </nav>
  );
}
