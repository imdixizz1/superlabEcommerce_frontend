"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as AntPagination, Modal, Tag, Tooltip } from "antd";
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

    // Calculate discount percentage
    const calculateDiscount = (mrp, specialPrice) => {
        if (!mrp || !specialPrice || mrp <= specialPrice) return null;
        return Math.round(((mrp - specialPrice) / mrp) * 100);
    };

    // Render product badges (trending, best seller, etc.)
    const renderProductBadges = (product) => {
        return (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isTrending && (
                    <Tag color="#ff4d4f" className="m-0 font-medium">
                        Trending
                    </Tag>
                )}
                {product.isBestSeller && (
                    <Tag color="#faad14" className="m-0 font-medium">
                        Best Seller
                    </Tag>
                )}
                {product.isJustLaunched && (
                    <Tag color="#52c41a" className="m-0 font-medium">
                        New Launch
                    </Tag>
                )}
                {calculateDiscount(product.mrp, product.specialPrice) && (
                    <Tag color="#1890ff" className="m-0 font-medium">
                        {calculateDiscount(product.mrp, product.specialPrice)}%
                        OFF
                    </Tag>
                )}
            </div>
        );
    };

    // Render product attributes
    const renderAttributes = (product) => {
        if (!product.attributes || product.attributes.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-1 mt-1">
                {product.attributes.map((attr) => (
                    <Tooltip key={attr._id} title={attr.name}>
                        <Tag className="m-0 text-xs" color="blue">
                            {attr.value[0]}
                        </Tag>
                    </Tooltip>
                ))}
            </div>
        );
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
                                                {/* Product badges */}
                                                {renderProductBadges(product)}

                                                {/* Stock badge */}
                                                {product.stock === 0 && (
                                                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40 flex items-center justify-center">
                                                        <span className="px-3 py-2 bg-red-600 text-white rounded-md font-bold">
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}

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
                                                {/* Brand name */}
                                                {product.brand && (
                                                    <span className="text-xs font-medium text-blue-600 mb-1">
                                                        {product.brand}
                                                    </span>
                                                )}

                                                <h3
                                                    onClick={() =>
                                                        handleQuickView(product)
                                                    }
                                                    className="font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate cursor-pointer"
                                                >
                                                    {product.name}
                                                </h3>

                                                {/* Render attributes */}
                                                {renderAttributes(product)}

                                                {/* Category */}
                                                {product.category && (
                                                    <div className="mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="mt-auto pt-2 flex items-center justify-between">
                                                    {product.stock > 0 ? (
                                                        <p className="font-bold text-lg">
                                                            $
                                                            {product.specialPrice ||
                                                                product.price}
                                                            {product.mrp &&
                                                                product.specialPrice &&
                                                                product.mrp >
                                                                    product.specialPrice && (
                                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                                        $
                                                                        {
                                                                            product.mrp
                                                                        }
                                                                    </span>
                                                                )}
                                                        </p>
                                                    ) : (
                                                        <p className="text-gray-500 font-medium">
                                                            Currently
                                                            Unavailable
                                                        </p>
                                                    )}

                                                    {product.stock > 0 && (
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M12 4v16m8-8H4"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
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
                                                {/* Out of stock overlay */}
                                                {product.stock === 0 && (
                                                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40 flex items-center justify-center z-10">
                                                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-md font-bold">
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}

                                                <img
                                                    src={`${product.frontImage.replace(
                                                        "\\",
                                                        "/"
                                                    )}`}
                                                    alt={product.name}
                                                    className="w-full h-28 object-cover"
                                                />
                                                {product.specialPrice &&
                                                    product.mrp &&
                                                    product.mrp >
                                                        product.specialPrice && (
                                                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-md">
                                                            {calculateDiscount(
                                                                product.mrp,
                                                                product.specialPrice
                                                            )}
                                                            % OFF
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="w-2/3 p-3 flex flex-col">
                                                {/* Brand name */}
                                                {product.brand && (
                                                    <span className="text-xs font-medium text-blue-600">
                                                        {product.brand}
                                                    </span>
                                                )}

                                                <h3
                                                    onClick={() =>
                                                        handleQuickView(product)
                                                    }
                                                    className="font-semibold text-gray-800 truncate cursor-pointer"
                                                >
                                                    {product.name}
                                                </h3>

                                                {/* Attributes and category for mobile */}
                                                <div className="flex items-center gap-1 mt-1 flex-wrap">
                                                    {product.attributes &&
                                                        product.attributes.map(
                                                            (attr) => (
                                                                <Tag
                                                                    key={
                                                                        attr._id
                                                                    }
                                                                    className="m-0 text-xs py-0"
                                                                    color="blue"
                                                                >
                                                                    {
                                                                        attr
                                                                            .value[0]
                                                                    }
                                                                </Tag>
                                                            )
                                                        )}
                                                    {product.category && (
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                {product.stock > 0 ? (
                                                    <>
                                                        <div className="flex items-center mt-1">
                                                            <p className="font-bold text-lg">
                                                                $
                                                                {product.specialPrice ||
                                                                    product.price}
                                                            </p>
                                                            {product.mrp &&
                                                                product.specialPrice &&
                                                                product.mrp >
                                                                    product.specialPrice && (
                                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                                        $
                                                                        {
                                                                            product.mrp
                                                                        }
                                                                    </span>
                                                                )}
                                                        </div>
                                                        <button className="mt-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                                            Add to Cart
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="mt-auto">
                                                        <p className="text-gray-500 text-sm font-medium">
                                                            Currently
                                                            Unavailable
                                                        </p>
                                                        <button className="mt-1 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md cursor-not-allowed">
                                                            Out of Stock
                                                        </button>
                                                    </div>
                                                )}
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
