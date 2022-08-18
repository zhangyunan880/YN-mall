import {
    ADD_COUNT,
    ADD_TO_CART   
}from './mutation-types'


export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            //payload新添加的商品
        let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)
        
        //判断oldPrice
        if (oldProduct) {
            // oldProduct.count+=1
            context.commit(ADD_COUNT, oldProduct)
            resolve('当前商品数量+1')
        } else {
            payload.count = 1
            // context.state.cartList.push(payload) 
            // payload.isSelected = false;
            context.commit(ADD_TO_CART, payload)
            resolve('添加新商品')
            
        }
      })
  
    }
}