<template>
    <div class="table-container" v-if="!!csv_data && csv_data.length > 0"> 
        <h3>Datatable Beta</h3> 
        <entry-holder :entries="editedRows" @removeEntry="removeEntries" @onSubmit="editedRows = [];success=true;"></entry-holder>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="display:flex;justify-content:center;flex-direction:column">
                <span>Search </span>
                <input type="text" name="search" id="search" class="search" placeholder="Search here" v-model="searchKey">
            </div>
            <entry-filter></entry-filter>
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
            </tbody>
        </table>
        </div>
        <div v-if="submitedData" class="popup">
            You successfully modified the data!
        </div>
    </div>
</template>
<script>
import entryFilter from '@/components/entry-filter.vue';
import entryHolder from '@/components/entry-holder.vue';
import {mapMutations} from 'vuex';
export default {
    components:{
        entryHolder,
        entryFilter,
    },
    mounted(){
    },
    watch:{
        clicked:() => {
            
            // this.$forceUpdate();

            // this.$nextTick(()=>{
            //      this.$refs.inputField.$el.focus();
            // });
        },
        success:function (){
            if(this.success == true){
                setTimeout(()=>{
                    console.log('test 1111');
                    this.SET_SUBMIT_ACTION(false);
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
            sortedDatum:null,
            clicked:{
                cell:null,
                key:null,
                state:false,
            },
            editedRows:[],
            success:false,
        }
    },
    computed:{
        csv_data(){
		    return !!this.$store.state.data && this.$store.state.data || [];
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

            console.log();

            return reduced_keys;
        },
        submitedData(){
            return this.$store.state.submit_action;
        }
    },
    methods:{
        ...mapMutations(['SET_SUBMIT_ACTION']),
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
								  .includes(this.searchKey.toLowerCase());
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
    padding: 10px;
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
</style>