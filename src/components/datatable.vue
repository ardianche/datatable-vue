<template>
	<div class="layout-rows">
		<table-filters :search.sync="search" :sortType.sync="sortType"></table-filters>
		<table-heading :keys="keys"></table-heading>
		<div class="row-wrapper">
			<table-row  :row="rows" :keys="keys" v-for="(rows,$index) in csv_data" :key="$index"></table-row>
		</div>
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
		data:()=>{
			return{
				search:'',
				sortType:'',
			}
		},
		computed:{
			csv_data(){

				return this.$store.state.data.filter(item => {

					if(this.sortType != ''){
						this.startSorting(this.sortType);
					}else {
						return JSON.stringify(Object.values(item))
          				.toLowerCase()
          				.includes(this.search.toLowerCase());
					}
      			});

			},
			keys(){
				return this.csv_data.reduce((b,a)=>{
					b = Object.keys(a);
					return b;
				},{});
			},
		},
		methods:{
			startSorting(sort){
				if(sort == "Name") {

				}
			}
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
		.row-wrapper{
			overflow:scroll;
			max-height:60%;
		}
	}
</style>