<template>
  <div class="header">
     <h1>&nbsp;<span>{{title}}</span>&nbsp;</h1>
     <div class="picker" ref="picker">
        <div class="imger" :class="{ani: canplay}"></div>
        <div class="imger-mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '',
      canplay: false
    };
  },
  created () {
  },
  methods: {
    getTitle: function(id) {
      this.$http.get('https://api.imjad.cn/cloudmusic/', {
        params: {
          type: 'detail',
          id: id
        }
      })
      .then(response => {
        let title = response.body.songs[0].name;
        this.title = title;
      }, response => {
        console.log('error');
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    h1
      span
        white-space: nowrap;
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
        background-image: url('../../../static/image/img1.jpg');
        background-size: 100%;
        background-position: center top;
        transition: background .4s;
        box-shadow: 0 0 8px 3px rgba(0, 0, 0, .5);
        &.ani
          animation: run 30s .3s linear infinite;
  @keyframes run
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
  @media screen and (min-width: 500px)
    .picker
      max-width: 400px
</style>
