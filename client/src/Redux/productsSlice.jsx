import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  filteredProducts: [],
  cart: [],
  activeCategory: null,
  searchTerm: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    filterByCategory: (state, action) => {
      state.activeCategory = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory =
          product.category.toLowerCase().replace(/\s+/g, "-") ===
          state.activeCategory;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(state.searchTerm);
        return matchesCategory && matchesSearch;
      });
    },

    searchProducts: (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(state.searchTerm);
        const matchesCategory = state.activeCategory
          ? product.category.toLowerCase().replace(/\s+/g, "-") ===
            state.activeCategory
          : true;
        return matchesSearch && matchesCategory;
      });
      console.log("Search term:", state.searchTerm);
      console.log("Updated filteredProducts: ", state.filteredProducts);

      if (!state.searchTerm) {
        state.filteredProducts = state.activeCategory
          ? state.products.filter(
              (product) =>
                product.category.toLowerCase().replace(/\s+/g, "-") ===
                state.activeCategory
            )
          : state.products;
      }
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.filteredProducts = state.products.filter((product) => {
        return (
          product.category.toLowerCase().replace(/\s+/g, "-") ===
          state.activeCategory
        );
      });
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // push the item and its quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find((item) => item._id === action.payload);
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrease the quantity if more than 1
          existingItem.quantity -= 1;
        } else {
          // Remove the item from the cart if quantity is 1
          state.cart = state.cart.filter((item) => item._id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const selectTotalPrice = (state) => {
  const total = state.products.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0);
  return parseFloat(total.toFixed(2));
};

export const {
  setProducts,
  filterByCategory,
  addToCart,
  removeFromCart,
  searchProducts,
  clearSearch,
  clearCart
} = productSlice.actions;
export default productSlice.reducer;
