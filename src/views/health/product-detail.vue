<template>
  <div style="padding:10px;">
    <div class="ribbon" v-if="product.hot || product.prom ||product.new">
      <p class="ribbon-content">
        <span v-if="product.hot">热销</span>
        <span v-if="product.prom">促销</span>
        <span v-if="product.new">新品</span>
      </p>
    </div>
    <div class="product-cover">
      <img :src="product.appPhotoUrl" :alt="product.productFullName">
    </div>
  
    <div class="product-info">
      <h3 class="product-name" :style="{color:product.displayColor}">
        {{product.productFullName}}
      </h3>
      <div class="product-price flex">
        <p>优惠价：
          <span>{{product.productPrice}}</span>元</p>
        <p>零售价：
          <span>{{product.productRetailPrice}}</span>元</p>
      </div>
      <div class="product-package">
        产品规格：
        <span>{{product.packageSpecifications}}</span>
      </div>
    </div>
    <div class="product-desc" :style="{boxShadow:'0 0 5px '+product.displayColor}">
      <h3 class="text-center">产品描述</h3>
      <div v-html="product.productDesc01" v-if="product.productDesc01"></div>
      <div v-else class="text-center">-待添加-</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productDetail",
  data() {
    return {
      product: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      vm.product = to.params.product;
    })
  },
  created() {
    this.$store.commit('showLeft', true);
    this.$store.commit('showRight', false);
    this.$store.commit('setPageTitle', '产品详情');
    this.product = this.$route.params.product;
    this.$nextTick(() => {
      [...document.querySelector('.product-desc').querySelectorAll('p')].forEach(e => {
        e.style.textIndent = '2em';
      })
    })
  }
}
</script>
<style lang='less' scoped>
.product-cover {
  position: relative;
  padding: 30% 0;
  width: 60%;
  margin: 0 auto;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}

.ribbon {
  position: relative;
  width: 90%;
  margin: 0 auto;
  background: #ec571e;
  color: #fff;
  text-align: center;
  padding: 1em 2em;
  font-size: 14px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    bottom: -1em;
    border: 1.5em solid #ec571e;
    z-index: -1;
  }
  &::before {
    left: -2em;
    border-left-color: transparent;
  }
  &::after {
    right: -2em;
    border-right-color: transparent;
  }
  .ribbon-content {
    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      border-style: solid;
      border-color: #999 transparent transparent transparent;
      bottom: -1em;
    }
    &::before {
      left: 0;
      border-width: 1em 0 0 1em;
    }
    &::after {
      right: 0;
      border-width: 1em 1em 0 0;
    }
  }
}

.product-info {
  font-size: 14px;
  .product-name {
    font-size: 18px;
  }
  .product-price {
    justify-content: space-between;
    p:first-child {
      span {
        color: red;
        font-size: 18px;
      }
    }
  }
  .product-package {
    color: #333;
    span {
      color: #2663f3;
    }
  }
}

.product-desc {
  font-size: 16px;
  margin-top: .5rem;
  border: 1px solid #f9f9f9;

  border-radius: 5px;
  padding: 5px;
  p {
    text-indent: 2em;
  }
}
</style>