<template>
	<div class="filter-layout">
		<input type="text" name="search" placeholder="Search" :value="search" @input="synchronise($event)">
	<el-dropdown>
	  <el-button type="success">
	    Sort By {{selected}}<i class="el-icon-arrow-down el-icon--right"></i>
	  </el-button>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item v-for="(sort,$index) in sortings" :key="$index" @click.native="appointSort(sort.title)">
	    	{{sort.title}}
	    </el-dropdown-item>
	  </el-dropdown-menu>
	</el-dropdown>
	</div>
</template>
<script>
	export default{
		props:['search'],
		data:()=>{
			return {
				sortings:[{index:0,title:'Amount'},{index:1,title:'Date'},{index:0,title:'Name'}],
				selected:'Default',
			}
		},
		methods:{
			synchronise(event){
				this.$emit('update:search',event.target.value);
			},
			appointSort(title){
				this.$emit('update:sortType',title);
				this.selected = title;
			}
		},
	}
</script>
<style lang="scss" scoped>
	.filter-layout{
		width:100%;
		display:flex;
		padding:20px;
		justify-content: flex-end;
		input{
			padding:10px;
			border:1px solid lightgray;
			color:black;
			background-color:white;
			border-radius:3px;
		}
		*:not(:last-child) {
			margin-right:20px;
		}
	}
</style>