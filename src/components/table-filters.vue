<template>
	<div class="filter-layout">
		<input type="text" name="" placeholder="Search">
	<el-dropdown>
	  <el-button type="success">
	    Sort By<i class="el-icon-arrow-down el-icon--right"></i>
	  </el-button>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item>Amount</el-dropdown-item>
	    <el-dropdown-item>Date</el-dropdown-item>
	    <el-dropdown-item>Name</el-dropdown-item>
	  </el-dropdown-menu>
	</el-dropdown>
	</div>
</template>
<script>
	export default{

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