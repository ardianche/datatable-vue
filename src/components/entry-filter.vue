<template>
    <div class="filter-holder">
        <div>
            <span>Available key</span>
            <input type="text">
        </div>
        <div>
            <span>Condition</span>
            <input type="text">
        </div>
        <div>
            <span>Parameter</span>
            <input type="text">
        </div>
    </div>
</template>
<script>
export default {
    
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
                padding: 10px;
                border-radius: 4px;
                margin-top: 5px;
            }
        }
        div:not(:last-child){
                margin-right:15px;
        }
    }
</style>
