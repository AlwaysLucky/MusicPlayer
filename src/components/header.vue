<template>
  <div class="header">
     <h1>&nbsp;<span>曾经沧海难为水</span>&nbsp;</h1>
     <div class="picker">
        <div class="imger"></div>
        <div class="imger-mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    h1
      span
        letter-spacing: .4rem
    .picker
      position: relative
      width: 60%;
      font-size: 0
      margin: 2rem auto
      .imger-mask
        position: absolute;
        padding: 50%;
        left: 0;
        top: 0;
        border-radius: 100%;
        background-color: rgba(7, 17, 27, .2);
      .imger
        padding: 50%;
        border-radius: 50%;
        background-image: url('./img1.jpg');
        background-size: 100%;
        background-position: center top;
        transition: background .4s;
        box-shadow: 0 0 8px 3px rgba(0, 0, 0, .5);
</style>
