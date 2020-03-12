<template>
  <div class="bottom-menu">
    <div class="select-all">
      <check-button 
      :is-checked="isSelectAll"
      @click.native="checkClick"/>
      <span> 全选</span>
    </div>
    <div class="total-price">
      合计 :{{totalPrice}}
    </div>
    <div class="buy-product" >
      去结算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
 import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex";

  export default {
    name: "CartButtonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
         if(this.cartList.length === 0) return false

        // 使用filter
        // return !(this.cartList.filter(item => !item.checked).length)
       
        // 使用find 
        // return !this.cartList.find(item => !item.checked)

        // 普通遍历
        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
 .bottom-menu {
    position: absolute;
    bottom: 49px;
    width: 100%;
    height: 44px;
    background-color: #eee;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 16px;
    color: #888;
    /* line-height: 44px; */
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    /* line-height: 40px; */
    height: 40px;
    align-items: center;
    display: flex;
    font-size: 16px;
    left: 12px;
 
  }

  .bottom-menu .total-price {
    margin-left: 40px;
    font-size: 16px;
    line-height: 42px;
    color: #666;
  }

  .bottom-menu .buy-product {
    position: absolute;
    right: 0;
    top: 0;
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  } 
</style>