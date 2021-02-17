const reducer = (state, action) => {
  // action to clear shopping cart
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  // action to increase cart item total
  // if (action.type === "INCREASE") {
  //   return {
  //     ...state,
  //     cart: state.cart.map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount + 1 };
  //       }
  //       return cartItem;
  //     }),
  //   };
  // }
  // action to decrease cart item total
  // if (action.type === "DECREASE") {
  //   return {
  //     ...state,
  //     cart: state.cart
  //       .map((cartItem) => {
  //         if (cartItem.id === action.payload) {
  //           return { ...cartItem, amount: cartItem.amount - 1 };
  //         }
  //         return cartItem;
  //       })
  //       // this will remove item from cart if amount total is below 1
  //       .filter((cartItem) => cartItem.amount !== 0),
  //   };
  // }
  //action to keep track of cart total and price total
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  }

  //action to keep track when api is loading
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      cart: action.payload,
      loading: false,
    };
  }
  // action to toggle amount of shopping cart items
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return {
      ...state,
      cart: tempCart,
    };
  }
  return state;
  // throw new Error ('no action matching type')
};

export default reducer;
