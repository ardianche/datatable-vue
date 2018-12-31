<template>
	<div class="layout-rows">
		<table-filters :search.sync="search" :sortType.sync="sortType"></table-filters>
		<table-heading :keys="keys"></table-heading>
		<div class="row-wrapper">
			<table-row class="onhover" @click.native="open($index)" :row="rows" :keys="keys" v-for="(rows,$index) in csv_data" :key="$index"></table-row>
		</div>
		<popup v-if="open_popup">
			<div slot="header">Editing data for <span style="font-weight:600;">{{selected_record.Name}}</span>
                    </div>
                    <div slot="content">
						<div class="input-groups">
							<div>
								<span>ID</span>
								<input type="text" v-model="selected_record.ID">
							</div>
							<div>
								<span>Name</span>
								<input type="text" v-model="selected_record.Name">
							</div>
							<div>
								<span>Amount</span>
								<input type="text" v-model="selected_record.Amount">
							</div>
							<div>
								<span>Date</span>
								<input type="text" readonly v-model="selected_record.Date">
							</div>
						</div>
                    </div>
                    <div slot="footer">
                        <button class="cancel" @click="close()">
                            Close
                        </button>
                        <button class="approve" @click="save()">
                            Save
                        </button>
                    </div>
		</popup>
		<tooltip v-if="successful"></tooltip>
	</div>
</template>
<script>
	import TableRow from '@/components/table-rows.vue';
	import TableHeading from '@/components/table-heading.vue';
	import TableFilters from '@/components/table-filters.vue';
	import Popup from '@/components/popup.vue';
	import Tooltip from '@/components/tooltip.vue';
	import {format} from 'date-fns/format';
	export default {
		props:['data'],
		components:{
			TableRow,
			TableHeading,
			TableFilters,
			Popup,
			Tooltip
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
				open_popup:false,
				selected_record:null,
				index_of_selected:null,
				successful:false,
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
			},
			open(index){
				this.open_popup = !this.open_popup;
				this.selected_record = this.csv_data[index];
				this.index_of_selected = index;
			},
			save(){
				this.$delete(this.csv_data,this.index_of_selected);
				this.csv_data.push(this.selected_record);
				this.$store.commit('SET_CSV_DATA',this.csv_data);
				this.$forceUpdate();
				this.close('from_save').then(()=>{
					this.successful = false
					console.log('TEST');
					}
				);
			},
			close(param){
				this.open_popup = !this.open_popup;
				if(!!param && param === 'from_save'){
					this.successful = true;
					return new Promise((resolve,reject)=>{
						setTimeout(()=>{
							resolve(true);
						},1300);
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
		height:700px;
		width:90%;
		margin:auto;
		.row-wrapper{
			overflow:scroll;
			max-height:60%;
		}
	}
	.onhover:hover{
		cursor:pointer;
		background-color:whitesmoke !important; 
	}
	button{
		padding:13px 20px;
		background-color:transparent;
		border:1px solid lightgray;
		border-radius:3px;
	}
	button:hover{
		cursor:pointer;
		transform:scale(1.11);
	}

	.input-groups {
		display:grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 30px;
		grid-column-gap: 20px;
		text-align: left;
		div{
			display:flex;
			flex-direction: column;
			input{
				padding:10px;
				border:1px solid lightgray;
				border-radius:3px;
			}
		}
	}
</style>