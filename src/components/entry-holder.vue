<template>
    <div class="entry-wrapper" v-if="entries.length > 0">
        <h4 style="margin:0;padding:0">
            Entries you've modified!
        </h4>
        <div class="entry-list-wrapper">
            <ul class="entry-list-container">
                <li class="entry-list-item" v-for="(entry,$index) in entries" :key="$index">
                    <span>
                        {{entry.ID}}
                    </span>
                    <span>
                        {{entry.Name}}
                    </span>
                    <span class="description">
                        {{entry.Description}}
                    </span>
                    <span>
                        {{entry.Amount}}
                    </span>
                    <span>
                        {{entry.Date}}
                    </span>
                    <img src="@/assets/error.svg" alt="" @click="removeEntry(entry)">
                </li>
            </ul>
        </div>
        <div class="entry-action-wrapper">
            <button @click="updateEntry()">
                Submit
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props:['entries'],
    data:()=>{
        return{

        }
    },
    mounted(){

    },
    computed:{

    },
    methods:{
        removeEntry(entry){
            console.log('test": ', entry);
            this.$emit('removeEntry',entry);
        },
        updateEntry(){
            this.$store.dispatch('updateEntries',this.entries);
            this.$emit('onSubmit');
        }
    }
}
</script>
<style lang="scss" scoped>
    .entry-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        flex-direction: column;
        border: 1px solid lightgray;
        border-radius: 4px;
        box-shadow: 0px 0px 20px 2px lightgrey;
        /* width: 90%; */
        margin-bottom: 20px;
        .entry-list-wrapper{
            width:100%;
            ul{
                width:100%;
                padding: 0;
                margin:0;
                list-style: none;
                height: calc(100vh - 70%);
                max-height: calc(100vh - 648px) !important;
                overflow: scroll;
                li{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 20px;
                    grid-column-gap:10px;
                    align-items: center;
                    margin-bottom: 10px;
                    border-bottom: 1px solid lightgray;
                    span{
                        text-align: left;
                    }
                    img{
                        width:20px;
                        height:20px;
                        margin-left: auto;
                    }
                    img:hover{
                        transform:scale(1.09);
                        cursor: pointer;
                        transform: rotate(90deg);
                        transition: ease-in 1s;
                    }
                    .description{
                        max-width: 221px;
                        word-break: break-word;
                        width: 215px;
                    }
                }
            }
        }
        .entry-action-wrapper{
            button{
                padding:10px 30px;
                background: transparent;
                border:1px solid lightgray;
                border-radius: 4px;
            }
            button:hover{
                transform: scale(1.09);
                cursor: pointer;
                background-color: #6dca01;
                border-color: #6dca01;
                color:white;
            }
        }
    }
</style>