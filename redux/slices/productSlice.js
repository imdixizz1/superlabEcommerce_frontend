import { BASE_URL, SECRET_KEY } from "@/utils/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ page = 1, keyword = "", category = "", minPrice, maxPrice }) => {
        try {
            let query = `/api/product?page=${page}&limit=10`;
            if (keyword) query += `&keyword=${keyword}`;
            if (category) query += `&category=${category}`;
            if (minPrice !== undefined) query += `&minPrice=${minPrice}`;
            if (maxPrice !== undefined) query += `&maxPrice=${maxPrice}`;

            const response = await axios.get(`${BASE_URL}${query}`, {
                headers: {
                    key: SECRET_KEY,
                },
            });
            return response.data.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/category/fetch`, {
                headers: {
                    key: SECRET_KEY,
                },
            });
            return response.data.data || [];
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        totalProducts: 0,
        categories: [],
        status: "idle",
        categoryStatus: "idle",
        error: null,
        minPrice: null,
        maxPrice: null,
    },
    reducers: {
        setPriceRange: (state, action) => {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
    },
    extraReducers: (builder) => {
        builder
            // Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.products;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // Categories
            .addCase(fetchCategories.pending, (state) => {
                state.categoryStatus = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoryStatus = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoryStatus = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setPriceRange } = productSlice.actions;
export default productSlice.reducer;
