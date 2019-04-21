<template>
<div>
 <div id="results" class="table-container" v-if="(!!csv_data && csv_data.length > 0 ) && !loading"> 
        <h3>Datatable Beta</h3> 
        <entry-holder :entries="editedRows" @removeEntry="removeEntries" @onSubmit="editedRows = [];success=true;"></entry-holder>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <div style="display:flex;justify-content:center;flex-direction:column">
                <span>Search </span>
                <input type="text" name="search" id="search" class="search" placeholder="Search here" v-model="searchKey">
            </div>
            <entry-filter @filter="filterEntries" :keys="keys"></entry-filter>
        </div>
        <div class="table">
            <table id="table">
            <thead>
            <tr>
                <th 
                    v-for="(key,$index) in keys"
                    :key="$index" 
                    @click="sortBy(key)">
                    {{key}}
                    <span class="arrow" :class="sortKeys[key] > 0 ? 'asc' : 'dsc'">
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(entry,$index) in sortedDatum" :key="$index">
                <td v-for="(key,$index2) in keys" :id="key" :key="$index2" @click="openInput(key,$index,entry,$index2)">
                    <input class="cell-input" 
                            type="text"  
                            ref="inputField" 
                            :value="entry[key]" 
                            name="inputField" 
                            id="" 
                            v-if="clicked.state && sortedDatum[$index] == clicked.cell.entry 
                                                && $index2 == clicked.cell.cellIndex"
                            @keyup.enter="saveValue(entry,$event,key)">
                                        
                    <span v-else>
                          {{entry[key]}}
                    </span>
                </td>
            </tr>
            <tr v-if="sortedDatum.length == 0">
                <h4 style="margin:auto;text-align:center;">No data available!</h4>
            </tr>
            </tbody>
        </table>
        </div>
        <div v-if="submitedData" class="popup">
            You successfully modified the data!
        </div>
    </div>
            <div v-if="loading" class="loader">
            <div></div>
            <h4>Loading</h4>
        </div>
</div>
</template>
<script>
import entryFilter from '../components/entry-filter.vue';
import entryHolder from '../components/entry-holder.vue';
import {mapMutations} from 'vuex';
export default {
    components:{
        entryHolder,
        entryFilter,
    },
    mounted(){
    },
    created(){
        this.$store.dispatch('getData');
    },
    watch:{
        clicked:() => {
        },
        success:function (){
            if(this.success == true){
                setTimeout(()=>{
                    console.log('test 1111');
                    this.$store.commit('SET_SUBMIT_ACTION',false);
                },3000);
            }
        },
        searchKey:function(){
            this.sorted_data();
        }
    },
    data:()=> {
        return {
            searchKey:'',
            sortKey:'',
            sortKeys: {},
            sortKeysArray:{},
            sortedDatum:[],
            clicked:{
                cell:null,
                key:null,
                state:false,
            },
            editedRows:[],
            success:false,
            filtering:false,
        }
    },
    computed:{
        csv_data:{
            get:function(){
                 return !!this.$store.state.data && this.$store.state.data || ['1','2'];
            },
            set:function(value){
                this.sortedDatum = value;
            }
		},
        keys(){
            let reduced_keys = this.$store.state.data.reduce((b,a)=>{
                b = Object.keys(a)
                return b;
            },[]);

            reduced_keys.forEach(key => {
                this.sortKeys[key]=1;
                this.sortKeysArray[key]=1;
                this.sortedDatum = this.csv_data;
            });

            return reduced_keys;
        },
        submitedData(){
            return this.$store.state.submit_action;
        },
        loading(){
            return this.$store.state.loading;
        },
    },
    methods:{
        sortBy(key) {
            this.sortKey = key
            this.sortKeysArray[key] = this.sortKeysArray[key] * -1;
            this.sorted_data();
        },
        sorted_data(){
            let keyToSortBy = this.sortKey;
            let searchQuery = this.searchQuery && this.searchQuery.toLowerCase();
            let order = this.sortKeysArray[keyToSortBy] || 1;
            let csv_data = this.csv_data;

            if (this.searchKey) {

				this.sortedDatum = this.csv_data.filter(item => {
							return JSON.stringify(Object.values(item))
          						.toLowerCase()
								  .includes(this.searchKey.trim().toLowerCase());
                });

                return csv_data;
            }
            if (keyToSortBy) {
                csv_data = csv_data.slice().sort(function (a, b) {
                    a = a[keyToSortBy]
                    b = b[keyToSortBy]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                    });
            }
            this.sortedDatum = csv_data;

            return csv_data
        },
        openInput(key,i1,entry,i2,incoming_key){
            this.clicked.state = false;
            let selectedCell = {
                key: key,
                rowIndex: i1, 
                cellIndex: i2,
                entry: entry
            }

            this.clicked.cell = selectedCell;
            this.clicked.state = !this.clicked.state;

            // console.log('condition : ',clicked.state && sortedDatum[$index][key] == clicked.cell.entry[`${key}`] && $index2 == clicked.cell.cellIndex)

            this.$forceUpdate();
            setTimeout(()=>{
                document.getElementsByName('inputField')[0].blur();
                document.getElementsByName('inputField')[0].focus();
            },100);

            this.rowToEdit = this.sortedDatum[i1];


            // this.$nextTick(()=>{
            //     console.log('element is : ',document.getElementsByName('inputField')[0]);
            //      document.getElementsByName('inputField')[0].focus();
            // });
        },
        saveValue(row,event,key){
            row[key] = event.target.value;
            let index = this.editedRows.indexOf(row);

            console.log('index' , index);

            if(index >= 0){
                this.editedRows.splice(index,1,row);
            }else{
                this.editedRows.push(row);
            }
            console.log('asdadas',document.getElementsByName('inputField')[0].blur());
            console.log('row is : ',row);
            console.log('event: ',event.target.value);
            this.sortedDatum.forEach((item)=>{
                if(item.ID = row.ID){
                    item = row;
                }
            });
            this.clicked.state = false;
        },
        removeEntries(value){
             this.editedRows.splice(this.editedRows.indexOf(value),1);
             this.$forceUpdate();
        },
        filterEntries(event){
            this.filtering = true;
            let filteredEntries = [];
            this.sorted_data();
            if(event.parameter == null || event.key == null || event.condition == null){
                return this.sorted_data();
            }
            if(event.parameter == ''){
                return this.sorted_data();
            }
            this.sortedDatum = this.sortedDatum.filter((entry,index) => {
                switch(event.condition){
                    case 'greater' :
                        let amount = entry[event.key];
                        console.log('amount ',amount);
                        if(amount > event.parameter){
                            return true;
                        }
                        break;
                    case 'equal' :

                        let first_name = entry[event.key].split(' ')[0];
                        let last_name = entry[event.key].split(' ')[1];

                        let first_condition = !!first_name && first_name.toLowerCase() == event.parameter.trim().toLowerCase();
                        let second_condition = !!last_name && last_name.toLowerCase() == event.parameter.trim().toLowerCase() 

                        if(first_condition || second_condition || event.parameter == ''){
                            return true;
                        }
                        break;
                    case 'less'  :
                        amount = entry[event.key];
                        if(amount < event.parameter){
                            return true;
                        }
                        break;

                    case 'contains' : 
                        if(entry[event.key].toLowerCase().includes(event.parameter.trim().toLowerCase()) || event.parameter == ''){
                            return true;
                        }
                        break; 
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>

body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

.cell-input {
    background: transparent;
    padding: 5px;
    color: white;
    font-size: 0.9em;
    border:1px solid white;
    border-radius: 4px;
    outline: white;
}

.cell-input:active{
}

.table-container{
    height: 100%;
    display: grid;
    grid-template-rows: 60px 1fr;
    justify-content: center;
    align-items: center;
    width:70%;
    margin:auto;
    .header{
        padding:20px;
    }
    .table > table {
        table-layout: fixed;
        border: 2px solid #026c86;
        border-radius: 3px;
        background-color: white;
        box-shadow: 0px 0px 20px 2px lightgrey;
        }
        thead{
             display:block;
        }
        th {
            width:auto !important;
            background-color: #404040;
            color: rgba(255,255,255,0.66);
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            min-width: 171px;
            max-width: 171px;
            td{
                padding:unset !important;
            }
        }
        tbody{
            display: block;
            height:calc(100vh - 200px);
            overflow:scroll;
        }

        td {
            background-color: #208daf;
            min-width: 171px;
            max-width: 171px;
            color:white;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        th, td {
        padding: 10px 20px;
        }

        th.active {
        color: #fff;
        }

        th.active .arrow {
        opacity: 1;
        }

        .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
        }

        .arrow.asc {
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        }

        .arrow.dsc {
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #fff;
        }
}
.search{
    max-width: 300px;
    border: 1px solid lightgray;
    padding: 4px;
    border-radius: 4px;
    margin-top: 5px;
}
.popup{
    position: absolute;
    /* background-color: #06b706; */
    background: rgba(3, 160, 37, 0.9);
    color: white;
    padding: 20px;
    border: 1px solid #06b706;
    border-radius: 4px;
    /* box-shadow: 0px 0px 20px 2px lightgrey; */
    /* top: 0; */
    right: 40px;
    bottom: 40px;
    transition: ease-in 5s;
}
.loader{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
        display: inline-block;
        width: 64px;
        height: 64px;
    }
    div::after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #fff;
        border-color:lightgray white;
        animation: div 1.2s linear infinite;
    }
    @keyframes div {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>