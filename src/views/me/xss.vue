<template>
  <div>
    <form action="http://localhost:82/dashboard/xss.php">
    <h2>XSS攻击代码演示:</h2>
      <input type="text" name="xss_input" v-model="message" placeholder="请输入内容">
      <p>{{message}}</p>
      <button type="submit">提交</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "XSS",
  data() {
    return {
      message: 'hello xss'
    }
  },
  created(){
    this.$store.commit('setPageTitle','XSS')
  }
}
</script>
<style lang='less' scoped>
form {
  margin-top: 10px;
  h2{
    font-size: 18px;
  }
  input {
    display: block;
    width: 80%;
    margin: 0 auto; 
    padding:10px;
    border: 1px solid #04c;
  }
  p {
    height: 2rem;
  }
  button {
    display: block;
    width: 5rem;
    margin: 0 auto;
    padding:10px;    
    border: 1px solid #04c;
    border-radius: 2rem;
    font-size: 16px;
  }
}
</style>