<template>
  <div style="padding:0 10px">
    <section class="address-container">
      <group title="收货地址">
        <x-address title="选择地址" :list="addressData" v-model="add1">
        </x-address>
        <x-input placeholder="请输入详细地址(街道门牌号)" v-model="add2" :debounce="800" required></x-input>
      </group>
    </section>
    <section class="cart-list-container">
      <p>购买列表</p>
      <ul class="cart-list">
        <li v-for="(item,index) in list" :key="index" class="cart-item flex">
          <div class="cart-check flex">
            <input type="checkbox" name="cart-item" :checked="item.checked" @change="countCheck($event,item)">
          </div>
          <div class="cart-img">
            <img :src="item.appPhotoUrl" :alt="item.productFullName">
          </div>
          <div class="cart-product flex">
            <div class="pro-name ellipsis2">{{item.productFullName}}</div>
            <div class="pro-count flex">
              <span class="pro-price">￥{{item.productPrice}}</span>
              <count :min="1" :max="300" v-model="item.count" @pro-count="reCalc(item,$event)"></count>
            </div>
          </div>
  
        </li>
      </ul>
    </section>
    <footer class="flex">
      <div class="cart-check flex" @change="checkAll">
        <input type="checkbox" id="check-all" :checked="allCheck">
        <label for="check-all">全选</label>
      </div>
      <div class="count-all">
        合计：
        <span>￥{{total().sum}}</span>
      </div>
      <div class="balance-btn" @click="balance">
        <button>结算
          <span>({{total().num}})</span>
        </button>
      </div>
    </footer>
     <alert v-model="showAlert" :title="alertTitle" :content="alertContent"></alert> 
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Alert, Group, XAddress, XInput, ChinaAddressData } from 'vux'
import value2name from 'vux/src/filters/value2name'
import Count from 'components/count'
export default {
  name: "balance",
   components: {
    Alert, Group, XAddress, XInput, Count
  },
  data() {
    return {
      add1: ["440000", "440100", "440106"],
      add2: '珠江新城',
      addressData: ChinaAddressData,
      list: [],
      allCheck: true,
      showAlert:false,
      alertTitle:'',
      alertContent:''
    }
  },
 
  computed: {
    address() {
      return this.getAddressName(this.add1) + ' ' + this.add2;
    }
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.list = Object.values(vm.$store.state.cartList);
      vm.list.forEach((e) => {
        e.checked = true;
      })
    })
  },
  created() {
    this.$store.commit('setPageTitle', '结算');
    this.$store.commit('showLeft', true);
    this.total();
  },
  methods: {
    getAddressName(value) {
      return value2name(this.add1, this.addressData);
    },
    total(){
       let sum = 0, num = 0;
      // this.list = Object.values(this.cartList);
      this.list.forEach(e => {

        if (e.checked) {
          sum += e.count * e.productPrice;
          num += e.count;
        }
      })
      this.$store.commit('setCartCount', num);
      return { sum, num };
    },
    countCheck(e, item) {
      var ct = e.target;

      if (!ct.checked) {
        this.allCheck = false;
        item.checked = false;
      }
      else {
        let checkList = document.querySelector('.cart-list').querySelectorAll(':checked');
        this.allCheck = checkList.length == this.list.length;
        item.checked = true;
      }
      this.$store.commit('updateCartList', item);

    },
    checkAll() {
      this.allCheck = !this.allCheck;
      // [...document.querySelector('.cart-list').querySelectorAll('input')].forEach(e => {
      //   e.checked = this.allCheck;
      // })
      this.list.forEach(e=>{
        e.checked = this.allCheck;
      })
      // if (!this.allCheck) {
      //   this.total.sum = 0;
      //   this.total.num = 0;
      // }
      // else {
      //   this.list = Object.values(this.$store.state.cartList)
      // }

    },
    reCalc(detail, n) {
      detail = { ...detail, ...{ count: n } };
      this.$store.commit('updateCartList', detail);
    },
    balance() {
      var showAlert = false,alertTitle,alertContent;
      if (!this.add1 || !this.add2) {
        this.alertTitle = '提示'
        this.alertContent = '地址不能为空'
      }
      else if (!this.total().sum || !this.total().num) {
        this.alertTitle = '提示'
        this.alertContent = '没有可结算商品'
      }
      else {
        this.alertTitle = '恭喜'
        this.alertContent = '结算成功'
      }
      this.showAlert=true

    }
  }
}
</script>
<style lang='less' scoped>
.cart-list-container {
  >p {
    font-size: 14px;
    color: #999;
    padding-left: 15px;
    margin: .7em 0 .3em 0;
  }
}

.cart-item {
  position: relative;
  .cart-img {
    width: 30%;
    padding: 5px;
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    margin: 5px;
    img {
      width: 100%;
    }
  }
  .cart-product {
    justify-content: space-between;
    flex-direction: column;
    width: 67%;
    padding: 10px 0;
    .pro-name {
      font-size: .8rem;
    }
    .pro-count {
      justify-content: space-between;
      color: #f23030;
    }
  }
  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #e4bb91;
    transform: scaleY(.5);
  }
}

.cart-check {
  align-items: center;
  input[type='checkbox'] {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/1.png);
    background-size: contain;
    &:checked {
      content: url(../../assets/2.png);
      background-color: #fff;
    }
  }
  label {
    margin-left: 3px;
  }
}

footer {
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  font-size: 14px;
  align-items: center;
  border-top: 1px solid #e3e5e9;
  background: #fff;
  z-index: 1000;
  height: 50px;
  line-height: 50px;
  .cart-check {
    padding: 5px;
    margin-right: 10px;
  }
  .count-all {
    flex: 1;
    span {
      color: #f23030;
      font-size: 16px;
    }
  }
  .balance-btn {
    background-color: #e4bb91;
    text-align: center;
    button {
      height: 40px;
      line-height: 40px;
      padding: 0 1rem;
      font-size: 16px;
      color: #fff;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>