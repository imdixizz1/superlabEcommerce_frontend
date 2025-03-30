"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as AntPagination, Modal } from "antd";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper modules
import { Navigation, Autoplay } from "swiper/modules";
import ShimmerLoader from "@/components/shimmerLoader/ShimmerLoader";
import ProductDetail from "@/components/productDetail/ProductDetail";
import noData from "@/assets/images/default.png";

export default function Home() {
    const dispatch = useDispatch();
    const { items, totalProducts, status } = useSelector(
        (state) => state.products
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(status);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchProducts({ page: currentPage }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (status === "loading" || status === "idle") {
            setIsLoading(true);
        } else if (status === "succeeded" || status === "failed") {
            setIsLoading(false);
        }
    }, [status]);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-white to-gray-50">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Featured Products
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
            </div>

            {/* No Products Found */}
            {!isLoading && items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 bg-white rounded-lg shadow-md p-6 transition-all">
                    <img
                        src={noData.src}
                        alt="No Data"
                        className="w-40 h-40 opacity-80"
                    />
                    <p className="text-gray-600 mt-4 text-lg font-medium">
                        No products found
                    </p>
                </div>
            ) : (
                <>
                    <div className="hidden md:block mb-10">
                        {isLoading ? (
                            <ShimmerLoader count={4} view="desktop" />
                        ) : (
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={true}
                                modules={[Navigation, Autoplay]}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                className="product-swiper"
                            >
                                {items.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                            <div className="relative overflow-hidden rounded-md group">
                                                <img
                                                    src={`${product.frontImage.replace(
                                                        "\\",
                                                        "/"
                                                    )}`}
                                                    alt={product.name}
                                                    className="w-full h-56 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <button
                                                        onClick={() =>
                                                            handleQuickView(
                                                                product
                                                            )
                                                        }
                                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all"
                                                    >
                                                        Quick View
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex-1 flex flex-col">
                                                <h3
                                                    onClick={() =>
                                                        handleQuickView(product)
                                                    }
                                                    className="font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate cursor-pointer"
                                                >
                                                    {product.name}
                                                </h3>
                                                <div className="mt-auto pt-2 flex items-center justify-between">
                                                    <p className="font-bold text-lg">
                                                        $
                                                        {product.specialPrice ||
                                                            product.price}
                                                        {product.specialPrice && (
                                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                                ${product.price}
                                                            </span>
                                                        )}
                                                    </p>
                                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 cursor-pointer transition-colors">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className="md:hidden">
                        {isLoading ? (
                            <ShimmerLoader count={4} view="mobile" />
                        ) : (
                            <div className="space-y-4">
                                {items.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex">
                                            <div
                                                onClick={() =>
                                                    handleQuickView(product)
                                                }
                                                className="w-1/3 relative"
                                            >
                                                <img
                                                    src={`${product.frontImage.replace(
                                                        "\\",
                                                        "/"
                                                    )}`}
                                                    alt={product.name}
                                                    className="w-full h-28 object-cover"
                                                />
                                                {product.specialPrice && (
                                                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-md">
                                                        SALE
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-2/3 p-3 flex flex-col">
                                                <h3
                                                    onClick={() =>
                                                        handleQuickView(product)
                                                    }
                                                    className="font-semibold text-gray-800 truncate cursor-pointer"
                                                >
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <p className="font-bold text-lg">
                                                        $
                                                        {product.specialPrice ||
                                                            product.price}
                                                    </p>
                                                    {product.specialPrice && (
                                                        <span className="text-sm text-gray-500 line-through ml-2">
                                                            ${product.price}
                                                        </span>
                                                    )}
                                                </div>
                                                <button className="mt-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {totalProducts > 0 && (
                        <div className="flex justify-center mt-10">
                            <AntPagination
                                current={currentPage}
                                total={totalProducts}
                                pageSize={10}
                                onChange={(page) => setCurrentPage(page)}
                                showSizeChanger={false}
                                className="custom-pagination"
                            />
                        </div>
                    )}
                </>
            )}
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
                width={600}
                className="quick-view-modal"
            >
                {selectedProduct && <ProductDetail product={selectedProduct} />}
            </Modal>
        </div>
    );
}
