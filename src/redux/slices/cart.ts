import { CartDetail } from "./../../models/cart.model";
import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../models/cart.model";
import { ActionTypes } from "@mui/base";

export interface userState {
  carts: Cart[];
  checkout:CartDetail[]
}

const initialState: userState = {
  carts: [],
  checkout:[]
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    setCheckout:(state,action) => {
        state.checkout = action.payload
    },
    deleteCartDetail: (state, action) => {
      const currentCart = [...state.carts];
      let cartId;
      currentCart.forEach((item: Cart) => {
        if (item.id === action.payload.cartId) {
          item.cartDetails = item.cartDetails.filter(
            (element: CartDetail) => element.id !== action.payload.id
          );
          if(item.cartDetails.length === 0){
            cartId = item.id;
          }
        }
      });

      if(cartId){
        state.carts = currentCart.filter(item => item.id !== cartId);
      }else{
        state.carts = currentCart;
      }
    },
    updateCartDetail: (state, action) => {
      state.carts.forEach((item: Cart) => {
        if (item.id === action.payload.cartId) {
          item.cartDetails = item.cartDetails.map((element: CartDetail) => {
            if (element.id === action.payload.id) {
              return { ...element, qty: action.payload.qty };
            }
            return element;
          });
        }
      });
    },
    addCartDetail: (state, action) => {
      const isExist = state.carts.some(item => item.id === action.payload.cartId);
      if(isExist){
        state.carts.forEach((item: Cart) => {
          if (item.id === action.payload.cartId) {
            const isExist = item.cartDetails.some(
              (element: CartDetail) => element.id === action.payload.id
            );
            if (isExist) {
              item.cartDetails = item.cartDetails.map((element: CartDetail) => {
                if (element.skuId === action.payload.skuId) {
                  return { ...element, qty: action.payload.qty };
                }
                return { ...element };
              });
            } else {
              item.cartDetails = [...item.cartDetails, action.payload];
            }
          }
        });
      }else{
        state.carts = [...state.carts, {id:action.payload.cartId,cartDetails:[action.payload]}]
      }
     
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCarts, deleteCartDetail, updateCartDetail, addCartDetail,setCheckout } =
  CartSlice.actions;

export default CartSlice.reducer;
