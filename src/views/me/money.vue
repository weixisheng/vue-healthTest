<template>
	<div class="v-bg-lightgray">
		<div class='flex flex-between top-1'>
			<div class="flex-item text-center">
				<span class="fa fa-check"></span>
				<p>收付款</p>
			</div>
			<div class="flex-item text-center">
				<span class="fa fa-money"></span>
				<p>零钱</p>
				<p class="v-fz-14">￥1.88</p>			
			</div>
			<div class="flex-item text-center">
				<span class="fa fa-credit-card"></span>
				<p>银行卡</p>
			</div>
		</div>
		<h2 class="grid-title">腾讯服务</h2>
		<grid class='v-bg-white'>
			<grid-item v-for="item in cellList" :icon='item.icon' :label='item.label'></grid-item>
		</grid>
		<h2 class="grid-title">第三方服务</h2>
		<grid class='v-bg-white'>
			<grid-item v-for="item in cellList2" :icon='item.icon' :label='item.label'></grid-item>
		</grid>
	</div>

</template>
<script>
	import {Grid,GridItem} from 'vux';
	export default {
		name:'money',
		data(){
			return {
				cellList:[
					{icon:'/static/images/w01.png',label:'面对面红包'},
					{icon:'/static/images/w02.png',label:'手机充值'},
					{icon:'/static/images/w03.png',label:'理财通'},
					{icon:'/static/images/w04.png',label:'微粒贷借钱'},
					{icon:'/static/images/w05.png',label:'Q币充值'},
					{icon:'/static/images/w06.png',label:'生活缴费'},
					{icon:'/static/images/w07.png',label:'城市服务'},
					{icon:'/static/images/w08.png',label:'信用卡还款'},
					{icon:'/static/images/w09.png',label:'腾讯公益'}
				],
				cellList2:[
					{icon:'/static/images/w10.png',label:'摩拜单车'},
					{icon:'/static/images/w11.png',label:'滴滴出行'},
					{icon:'/static/images/w12.png',label:'火车票机票'},
					{icon:'/static/images/w13.png',label:'酒店'},
					{icon:'/static/images/w14.png',label:'美团外卖'},
					{icon:'/static/images/w15.png',label:'58到家'},
					{icon:'/static/images/w16.png',label:'美丽说'},
					{icon:'/static/images/w17.png',label:'京东优选'},
					{icon:'/static/images/w18.png',label:'电影演出赛事'},
					{icon:'/static/images/w19.png',label:'吃喝玩乐'}
				]
			}
		},
		components:{
			Grid,GridItem
		},
		created(){
			this.$store.commit('setPageTitle','钱包');
		}
	}
</script>
<style lang='less'>
.top-1{
	font-size: 16px;
	color:#fff;
	background-color: rgba(53, 73, 94, 0.79);
}
.flex-between{
		justify-content: space-around;
	}
	.flex-item{
		padding:15px;
		span{
			font-size: 30px;
		}
	}
	.grid-title{
		padding:10px;
		font-size:16px;
		font-weight:normal;
		color:#aaa;
	}
	
</style>