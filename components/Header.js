"use client";

import { useEffect, useState } from "react";
import { Input, Popover, Spin, Slider } from "antd";
import {
    SearchOutlined,
    UserOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "@/redux/slices/productSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { categories, categoryStatus } = useSelector(
        (state) => state.products
    );
    const [hovered, setHovered] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (categoryId) => {
        // Reset price range to default when a category is selected
        setPriceRange([0, 1000]);
        dispatch(fetchProducts({ category: categoryId }));
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            dispatch(fetchProducts({ keyword: searchText }));
        }
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const applyPriceFilter = () => {
        dispatch(
            fetchProducts({ minPrice: priceRange[0], maxPrice: priceRange[1] })
        );
    };

    const categoryMenu = (
        <div className="p-4 w-60 bg-white shadow-md rounded-md">
            {categoryStatus === "loading" ? (
                <Spin size="small" />
            ) : categories.length > 0 ? (
                categories.map((category) => (
                    <div
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className="cursor-pointer flex items-center space-x-2 py-2 hover:bg-gray-100 rounded-md transition"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-gray-700">{category.name}</span>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No categories found</p>
            )}
        </div>
    );

    const userMenu = (
        <div className="p-4 w-48 bg-white shadow-md rounded-md">
            <Link href="/dashboard">
                <div className="cursor-pointer flex items-center py-2 hover:bg-gray-100 rounded-md transition px-3">
                    <span className="text-gray-700">Dashboard</span>
                </div>
            </Link>
            <Link href="/profile">
                <div className="cursor-pointer flex items-center py-2 hover:bg-gray-100 rounded-md transition px-3">
                    <span className="text-gray-700">Profile</span>
                </div>
            </Link>
        </div>
    );

    const priceMenu = (
        <div className="p-4 w-64 bg-white shadow-md rounded-md">
            <p className="text-gray-700 font-medium mb-2">Select Price Range</p>
            <Slider
                range
                min={0}
                max={5000}
                step={50}
                value={priceRange}
                onChange={handlePriceChange}
                onChangeComplete={applyPriceFilter}
            />
            <p className="text-gray-600 text-sm">
                ${priceRange[0]} - ${priceRange[1]}
            </p>
        </div>
    );

    return (
        <header className="shadow-md">
            <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
                <div className="font-bold text-2xl">BEAUTY</div>
                <div className="w-1/2 relative">
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        className="rounded-full"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onPressEnter={handleSearch}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <Popover content={userMenu} trigger="hover">
                        <div className="cursor-pointer flex items-center space-x-1">
                            <UserOutlined className="text-xl" />
                            <span className="hidden md:block">Sign In</span>
                        </div>
                    </Popover>
                    <HeartOutlined className="text-xl cursor-pointer" />
                    <div className="relative">
                        <ShoppingCartOutlined className="text-xl cursor-pointer" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                            0
                        </span>
                    </div>
                </div>
            </div>
            <nav className="bg-gray-800 text-white py-2">
                <div className="flex justify-center space-x-6">
                    <Popover
                        content={categoryMenu}
                        trigger="hover"
                        open={hovered}
                        onOpenChange={(open) => setHovered(open)}
                    >
                        <span className="cursor-pointer hover:underline">
                            Shop By Categories
                        </span>
                    </Popover>
                    <Popover content={priceMenu} trigger="hover">
                        <span className="cursor-pointer hover:underline">
                            Shop By Price
                        </span>
                    </Popover>
                </div>
            </nav>
        </header>
    );
};

export default Header;
