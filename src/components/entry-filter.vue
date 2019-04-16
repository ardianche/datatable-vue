<template>
    <div class="filter-holder">
        <div>
            <span>Available key</span>
            <select @change="attachKey($event,'key')">
                <option 
                    :value="key" 
                    v-for="(key,$index) in incoming_keys" 
                    :key="$index">
                    {{key}}
                </option>
            </select>
        </div>
        <div>
            <span>Condition</span>
            <select @change="attachKey($event,'condition')">
                <option value="">Choose a condition</option>
                <option value="greater">Greater than</option>
                <option value="less">Less than</option>
                <option value="equal">Equal to</option>
                <option value="contains">Contains</option>
            </select>
        </div>
        <div>
            <span>Parameter</span>
            <input v-model="filter_object.parameter" type="text">
        </div>
        <div>
            <button @click="startFilter()">Filter</button>
        </div>
    </div>
</template>
<script>
export default {
    props:['keys'],
    mounted(){
        this.incoming_keys = this.keys;
        this.incoming_keys = this.incoming_keys.filter(key => key == 'Name' || key == 'Description' || key == 'Amount');
        this.filter_object.key = this.incoming_keys[0];
    },
    data:()=>{
        return{
            incoming_keys : [],
            filter_object: {
                key:null,
                condition:null,
                parameter:null,
            }
        }
    },
    methods:{
        attachKey(event,param){
            console.log('test',event.target.value);
            switch(param){
                case 'key':
                    this.filter_object.key = event.target.value;
                    break;
                case 'condition':
                    this.filter_object.condition = event.target.value;
                    break;
            }
           
        },
        startFilter(){
            console.log('this. ', this.filter_object.condition);
            this.$emit('filter',this.filter_object);
        }
    }
}
</script>
<style lang="scss" scoped>
    .filter-holder{
        display: flex;
        justify-content: space-around;
                    h4{
                margin-right: 50px;
            }
        align-items: center;

        div{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            input{
                border: 1px solid lightgray;
                padding: 4px;
                border-radius: 4px;
            }
            select{
                border: 1px solid lightgray;
                background: transparent;
                font-size: .959em;

                *{
                    padding:10px;
                }
                ::-ms-expand{
                    display: none;
                }
            }
        }
        div:not(:last-child){
                margin-right:15px;
        }
    }
</style>
