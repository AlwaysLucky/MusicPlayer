<template>
  <div id="container">
    <audio  ref="audio" hidden="true" autoplay="{autoPlay}"></audio>
    <v-header ref="header"></v-header>
    <v-lyricer ref="lyricer" v-bind:songsId="songsId"></v-lyricer>
    <v-footer ref="footer" v-bind:songsId="songsId" v-bind:gallery="gallery"></v-footer>
    <div class="imgblur" ref="imgblur"></div>
    <!-- <div class="words" ref="words">
      <ul class="sayword"></ul>
    </div> -->
    <div class="gallery" ref="gallery">
      <img v-for="(item, index) in gallery" :data-src="item" :key="index" style="display: none">
    </div>
  </div>
</template>
<script>
import header from '@/components/header/header';
import lyricer from '@/components/lyricer/lyricer';
import footer from '@/components/footer/footer';
import Typed from 'typed.js';
import swal from 'sweetalert';
var posY = 0;
var ani;
export default {
  name: 'App',
  data () {
    return {
      autoPlay: false,
      words: [],
      songsId: ['29431066', '27646198', '254574', '490602750', '202373', '35476049', '29567188', '534540557', '513791211'],
      gallery: ['../static/image/img1.jpg', '../static/image/img2.jpg', '../static/image/img3.jpg', '../static/image/img4.jpg', '../static/image/img5.jpg']
    };
  },
  components: {
    'v-header': header,
    'v-lyricer': lyricer,
    'v-footer': footer
  },
  methods: {
    sayWords: function () {
      this.$http.get('../static/words.txt')
      .then(response => {
        let txt = response.body;
        this.words = txt.split('\n');
      }, response => {
        console.log('error');
      });
    },
    say: function (words) {
      let that = this;
      let liArr = '';
      words.forEach(function (e, i) {
          liArr += '<li>' + e + '</li>^400';
      });
      ani = setInterval(this.scrollWords, 55); // number: 滚动速度
      typed = new Typed(".sayword", {
          strings: [liArr],
          startDelay: 1000,
          typeSpeed: 20,
          contentType: 'html',
          onComplete: function (self) {
            // isSayOk = false ;
            (function (i) {
                setTimeout(function () {
                    clearInterval(i); // 延迟清除定时器 防止过早清除而滚动未结束
                    swal({
                        title: "(标题)",
                        text: "内容",
                        icon: "../static/image/img1.jpg",
                        buttons: ['cancel', 'ok'],
                        dangerMode: true
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("ok", {
                                icon: "success"
                            });
                            that.$refs.words.innerHTML = '';
                        } else {
                            swal("fail!");
                            that.$refs.words.innerHTML = '';
                        }
                    });
                }, 20000);
            })(ani);
          }
      });
    },
    scrollWords: function (flag) {
      this.$refs.words.scrollTo(0, posY);
      posY++;
    },
    typedControl: function (flag) {
      if (flag) {
        // typed.stop();
        clearInterval(ani);
      } else {
        // typed.start();
        // ani = setInterval(this.scrollWords, 55);
      }
    },
    loadGallery: function() {
      let imgs = this.$refs.gallery.querySelectorAll('img');
      Array.prototype.forEach.call(imgs, function(e, i) {
        e.src = e.getAttribute('data-src');
      });
    }
  },
  mounted () {
    // this.sayWords();
    this.loadGallery();
  }
};

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './common/css/base.styl'
  #container
    text-align: center
    color: hsla(0, 0%, 100%, .6)
    background-color: rgba(7, 17, 27, .5)
    overflow: hidden
    .imgblur
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      background-image: url(../static/image/img1.jpg)
      background-repeat: no-repeat
      background-size: cover
      filter: blur(10px)
      z-index: -1
    .words
        position: absolute
        top: 4rem
        left: 0
        z-index: 0
        height: -webkit-calc(60vw + 2rem)
        height: calc(60vw + 2rem)
        overflow: auto
        text-align: left
      ul li
        color: hsla(0, 0%, 100%, .6)
</style>
