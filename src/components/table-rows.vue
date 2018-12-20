<template>
	<div class="row-details" :style="styleObject">
		<div v-for="ro in row">
			<span> {{ro}}</span>
		</div>
	</div>
</template>
<script>
	import format from 'date-fns/format';
	export default{
		props:['row'],
		filters:{
			normalize:function(value){
				return format(value,'ddd MM, YYYY');
			},
			whitespace:function(value){
				return value.replace(/^\s+/g, '');
			},
		},
		computed:{
			freeSpaces(){
				let nrOfFreeSpaces = "";
				for(var i = 1; i <= Object.keys(this.row).length; i++){
					nrOfFreeSpaces+=1 + 'fr ';
				}
				return nrOfFreeSpaces;
			},
			styleObject(){
				return {
					display:'grid',
					gridTemplateColumns:`${this.freeSpaces}`,
					backgroundColor:'white',
				}
			},
		}
	}
</script>
<style lang="scss">
	.row-details{
		margin-bottom:20px;
		div{
			display:flex;
			border-bottom:1px solid lightgray;
			justify-content: center;
		}
		// div:last-child,div:nth-child(4){
		// 	justify-content: center;
		// }
	}
</style>