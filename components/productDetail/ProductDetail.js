import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ProductDetail = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [selectedRam, setSelectedRam] = useState(
        product.attributes.find((attr) => attr.name === "Ram")?.value[0] || ""
    );
    const [selectedStorage, setSelectedStorage] = useState(
        product.attributes.find((attr) => attr.name === "Storage")?.value[0] ||
            ""
    );

    // Calculate discount percentage
    const discountPercentage = product.specialPrice
        ? Math.round(((product.mrp - product.specialPrice) / product.mrp) * 100)
        : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    {/* Product Images Section */}
                    <div className="md:w-1/2 p-4">
                        <div className="relative">
                            {(product.isJustLaunched ||
                                product.isTrending ||
                                product.isBestSeller) && (
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                    {product.isJustLaunched && (
                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                            NEW LAUNCH
                                        </span>
                                    )}
                                    {product.isTrending && (
                                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md">
                                            TRENDING
                                        </span>
                                    )}
                                    {product.isBestSeller && (
                                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                                            BESTSELLER
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Main Product Image Slider */}
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                pagination={{
                                    type: "fraction",
                                }}
                                thumbs={{
                                    swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                            ? thumbsSwiper
                                            : null,
                                }}
                                modules={[Navigation, Thumbs, Pagination]}
                                className="rounded-lg mb-3"
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="bg-gray-100 flex items-center justify-center h-80">
                                            <img
                                                src={image}
                                                alt={`${product.name} - Image ${
                                                    index + 1
                                                }`}
                                                className="object-contain h-full w-full"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Images */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className="thumbs-swiper"
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="cursor-pointer border rounded-md overflow-hidden h-20">
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="object-cover h-full w-full"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:w-1/2 p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span>{product.brand}</span>
                            <span className="mx-2">•</span>
                            <span>{product.category.name}</span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>

                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                <div className="bg-green-50 text-green-700 px-2 py-1 rounded flex items-center text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span>In Stock ({product.stock})</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-gray-900">
                                    ₹{product.specialPrice || product.price}
                                </span>
                                {product.specialPrice && (
                                    <>
                                        <span className="text-lg text-gray-500 line-through ml-2">
                                            ₹{product.mrp}
                                        </span>
                                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                            {discountPercentage}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                inclusive of all taxes
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4">
                            <p className="text-gray-700 mb-4">
                                {product.description}
                            </p>

                            {/* Product Attributes */}
                            <div className="space-y-4">
                                {/* RAM Selection */}
                                {product.attributes.find(
                                    (attr) => attr.name === "Ram"
                                ) && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            RAM
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.attributes
                                                .find(
                                                    (attr) =>
                                                        attr.name === "Ram"
                                                )
                                                .value.map((ram) => (
                                                    <button
                                                        key={ram}
                                                        onClick={() =>
                                                            setSelectedRam(ram)
                                                        }
                                                        className={`px-3 py-1.5 rounded-md text-sm border ${
                                                            selectedRam === ram
                                                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                                                : "border-gray-300 text-gray-700"
                                                        }`}
                                                    >
                                                        {ram}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Storage Selection */}
                                {product.attributes.find(
                                    (attr) => attr.name === "Storage"
                                ) && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            Storage
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.attributes
                                                .find(
                                                    (attr) =>
                                                        attr.name === "Storage"
                                                )
                                                .value.map((storage) => (
                                                    <button
                                                        key={storage}
                                                        onClick={() =>
                                                            setSelectedStorage(
                                                                storage
                                                            )
                                                        }
                                                        className={`px-3 py-1.5 rounded-md text-sm border ${
                                                            selectedStorage ===
                                                            storage
                                                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                                                : "border-gray-300 text-gray-700"
                                                        }`}
                                                    >
                                                        {storage}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Other Attributes */}
                                {product.attributes
                                    .filter(
                                        (attr) =>
                                            attr.name !== "Ram" &&
                                            attr.name !== "Storage"
                                    )
                                    .map((attr) => (
                                        <div key={attr._id}>
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                                {attr.name}
                                            </h3>
                                            <div className="text-gray-600">
                                                {attr.value.join(", ")}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-sm font-medium transition-colors">
                                Add to Cart
                            </button>
                            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md text-sm font-medium transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
