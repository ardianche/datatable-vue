<template>
	<div class="layout-rows">
		<table-filters></table-filters>
		<table-heading :keys="keys"></table-heading>
		<table-row :row="rows" :keys="keys" v-for="(rows,$index) in csv_data" :key="$index"></table-row>
	</div>
</template>
<script>
	import TableRow from '@/components/table-rows.vue';
	import TableHeading from '@/components/table-heading.vue';
	import TableFilters from '@/components/table-filters.vue';
	export default {
		props:['data'],
		components:{
			TableRow,
			TableHeading,
			TableFilters,
		},
		computed:{
			csv_data(){

				return this.$store.state.data;
			},
			keys(){
				return this.csv_data.reduce((b,a)=>{
					b = Object.keys(a);
					return b;
				},{});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.layout-rows{
		min-width:200px;
		min-height:200px;
		height:400px;
		width:90%;
		margin:auto;
	}
</style>