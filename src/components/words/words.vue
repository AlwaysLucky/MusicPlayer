<template>
  <div class="words">
    <ul class="sayword"></ul>
  </div>
</template>

<script>
export default {
  name: 'Words'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.words
    position: absolute
    top: 4rem
    left: 0
    z-index: 0
    height: -webkit-calc(60vw + 2rem)
    height: calc(60vw + 2rem)
    overflow: auto
  ul li
    color: hsla(0, 0%, 100%, .6)
</style>