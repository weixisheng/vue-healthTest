<template>
    <div>
        <form action="http://localhost:82/dashboard/a.php">
            <input v-model="message" type="text" name="xss_input_value" placeholder="输入字符">
            <br> {{message}}
            <br>
            <button type="submit">提交</button>
        </form>
    </div>
</template>
<script>
export default {
    name: "A",
    data() {
        return {
            message: ''
        }
    },
    created(){
        this.$store.commit('setPageTitle','A')
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
form {
    margin-top: 1rem;
    input {
        width: 80%;
        border: 1px solid #10ff00;
        padding: 10px;
        margin: 0 auto;
        display: block;
        box-shadow: 0 0 5px #00c4ff;
    }
    button {
        display: block;
        width: 5rem;
        border: 1px solid #fff;
        border-radius: 2rem;
        padding: 10px 0;
        margin: 0 auto;
        background: #57de35;
        color: #fff;
        font-size: 16px;
    }
}
</style>