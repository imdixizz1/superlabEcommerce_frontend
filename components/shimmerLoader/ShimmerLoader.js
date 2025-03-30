import React from "react";
import "./shimmerLoader.css";

const ShimmerLoader = ({ count = 4, view = "desktop" }) => {
    // Desktop shimmer cards (for Swiper)
    if (view === "desktop") {
        return (
            <div className="grid grid-cols-4 gap-5">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md border border-gray-100 animate-pulse"
                    >
                        <div className="relative">
                            <div className="w-full h-56 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect"></div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
                                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Mobile shimmer cards (list view)
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden animate-pulse"
                >
                    <div className="flex">
                        <div className="w-1/3 relative">
                            <div className="w-full h-28 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect"></div>
                        </div>
                        <div className="w-2/3 p-3 flex flex-col">
                            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mt-2"></div>
                            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3 mt-auto"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShimmerLoader;

// You'll need to add this CSS to your global stylesheet:
//
// .shimmer-effect {
//   animation: shimmer 1.5s infinite linear;
//   background-size: 400% 100%;
// }
//
// @keyframes shimmer {
//   0% {
//     background-position: 100% 0;
//   }
//   100% {
//     background-position: -100% 0;
//   }
// }
