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
		mounted(){
			if(!!this.$store.state.data){
				this.retrievedData = this.$store.state.data;
			}	
		},
		watch:{
			sortType:function(value){
				this.retrievedData = this.startSorting(value);
			},
		},
		data:()=>{
			return{
				search:'',
				sortType:'',
				retrievedData:[],
			}
		},
		computed:{
			csv_data(){
					return this.retrievedData.filter(item => {
							return JSON.stringify(Object.values(item))
          						.toLowerCase()
          						.includes(this.search.toLowerCase());
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
					return this.retrievedData.sort((a,b)=>{
						return a.Name.localeCompare(b.Name);
					});
				}
				if(sort == "Amount"){
					console.log('test');
					return this.retrievedData.sort((a,b)=>{
						return a.Amount - b.Amount;
					});
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