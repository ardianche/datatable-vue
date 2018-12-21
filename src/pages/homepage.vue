<template>
	<div class="layout">
		<div class="topheader">
			<span>Datatable</span>
		</div>
		<div class="content">
			<data-table class="datatable"></data-table>
		</div>
		<div class="bottomfooter">
			<span style="font-size:1.1em">Copyright @ArdianIbrahimi</span>
		</div>
	</div>
</template>
<script>
	import DataTable from '@/components/datatable.vue';
	export default{
		components:{
			DataTable
		}
	}
</script>
<style lang="scss">
	.layout{
		height:100%;
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		.topheader,.bottomfooter{
			padding:20px;
			background-color:#368a04;
			color:white;
			display:flex;
			justify-content: center;
			align-items:center;
			span{
				font-weight:500;
				font-size:1.5em;
			}
		}
		.content{
			overflow:scroll;
			display:flex;
			justify-content: center;
			align-items:center;
		}
	}
</style>