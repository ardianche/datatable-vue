<template>
	<div class="filter-layout">
		<input type="text" name="search" placeholder="Search" :value="search" @input="synchronise($event)">
	<el-dropdown>
	  <el-button type="success">
	    Sort By {{selected}}<i class="el-icon-arrow-down el-icon--right"></i>
	  </el-button>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item v-for="(sort,$index) in sortings" :key="$index" @click.native="appointSort(sort.title,$index)">
	    	{{sort.title}}
				<up class="icon" v-if="sort.status==='up' && sort.checked"></up>
				<down class="icon" v-else-if="sort.checked"></down>
	    </el-dropdown-item>
	  </el-dropdown-menu>
	</el-dropdown>
	</div>
</template>
<script>
	import { ArrowUpIcon,ArrowDownIcon } from 'vue-feather-icons'
	export default{
		props:['search'],
		data:()=>{
			return {
				sortings:[{index:0,title:'Amount',status:'down',checked:false,},
									{index:1,title:'Date',status:'down',checked:false},
									{index:0,title:'Name',status:'down',checked:false}
								],
				selected:'Default',
			}
		},
		components:{
			Up:ArrowUpIcon,
			Down:ArrowDownIcon,
		},
		methods:{
			synchronise(event){
				this.$emit('update:search',event.target.value);
			},
			appointSort(title,index){
				this.$emit('update:sortType',title);
				this.selected = title;
			  if(this.sortings[index].status === 'down'){
					this.sortings[index].status = 'up';
					this.sortings[index].checked = !this.sortings[index].checked;
				}else {
					this.sortings[index].status = 'down';
					this.sortings[index].checked = !this.sortings[index].checked;
				}
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
	.icon{
		width:19px;
	}
</style>