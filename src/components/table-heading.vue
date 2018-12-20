<template>
	<div style="display:flex;margin-bottom: 50px;width:100%">
		<ul class="heading" :style="styleObject">
			<li v-for="key in keys">{{key}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props:['keys'],
		mounted(){
		},
		computed:{
			freeSpaces(){
				let nrOfFreeSpaces = "";
				for(var i = 1; i <= this.keys.length; i++){
					nrOfFreeSpaces+=1 + 'fr ';
				}
				return nrOfFreeSpaces;
			},
			styleObject(){
				return {
					display:'grid',
					gridTemplateColumns:`${this.freeSpaces}`,
					width:'90%',
					textAlign:'center',
					borderBottom:'1px solid lightgray',
					fontWeight:600,
					position:'fixed',
					backgroundColor:'white',
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.heading{
		margin:0;
		padding:0;
		list-style: none;
		li{

		}
	}
</style>