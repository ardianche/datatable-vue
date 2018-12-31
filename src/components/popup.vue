<template>
  <div>
    <div class="popup-layout">
    </div>
    <div class="popup-card">
         <div class="slotHeader">
            <slot name="header"></slot>
        </div>
        <div class="slotContent">
            <slot name="content"></slot>
        </div>
        <div class="slotFooter">
            <slot name="footer"></slot>
        </div>
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.popup-layout{
  position: fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  margin:auto;
  width:100vw;
  height:100vh;
  opacity:0.7;
  z-index:2;
  background-color:white;
}
.popup-card {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0px 0px 200px 10px lightgray;
  min-height: 500px;
  min-width: 600px;
  width: 600px;
  border: 1px solid lightslategray;
  height: 500px;
  background-color: white;
  color: black;
  border-radius: 4px;
  z-index: 10;
  opacity:1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.popup-card > div {
  padding: 20px;
}
.popup-card > .slotHeader {
  border-bottom: 1px solid lightgray;
}
.popup-card > .slotFooter {
  border-top: 1px solid lightgray;
}
.popup-card > .slotHeader,
.slotFooter {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.slotFooter > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
