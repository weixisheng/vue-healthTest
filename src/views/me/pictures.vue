<template>
	 <swiper :list="list"
                :loop='true'
                :auto='false'>
        </swiper>
</template>
<script>
	import { Swiper } from 'vux'
	export default {
    name: 'home',
    components: {
        Swiper
    },
    data(){
    	return {
    		list: [
                { img: '/static/1.jpg', title: '舌尖上的美食1' },
                { img: '/static/2.jpg', title: '舌尖上的美食2' },
                { img: '/static/3.jpg', title: '舌尖上的美食3' }
            ]
    	}
    },
    created(){
    	this.$store.commit('setPageTitle','相册')
    }
}
</script>
