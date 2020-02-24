import { 
  ADD_COUNTER,
  ADD_TO_CART
 } from "./mutation-types"
export default {
  actions: {
    addCart(context,payload) {

      // 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)

      // 2.判断oldProduct
      if(oldProduct) {
        oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        // state.cartList.push(payload)
      }

      state.cartList.push(payload)
    }
  }
}