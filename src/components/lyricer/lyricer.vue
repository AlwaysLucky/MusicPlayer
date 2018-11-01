<template>
  <div class="lyricer" ref="lyricer">
    <ul>
      <li v-for="(item, index) in lyric" :key="index">
        &nbsp;{{item[1]}}&nbsp;
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
  name: 'Lyricer',
  props: {
    songsId: {
      type: Array
    }
  },
  data() {
    return {
      lyric: [],
      isWX: false
    };
  },
  created() {
    this.forWexin();
  },
  methods: {
    init: function(id) {
      let that = this;
      let audio = that.$parent.$refs.audio;
      audio.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3';
      audio.addEventListener('canplay', function() {
        if (that.$parent.autoPlay === true) {
          that.$parent.$refs.header.canplay = true; // 控制是否可以头像旋转
        }
      });
      this.$parent.$refs.header.getTitle(id);
      this.getLyric(id); // 歌词填充

      let lyricerHeight = window.getComputedStyle(this.$refs.lyricer).height;
      let fontSize = window.getComputedStyle(this.$refs.lyricer).fontSize;
      var level = Math.floor(parseInt(lyricerHeight) / 2 / (parseInt(fontSize) * 2));
      audio.ontimeupdate = function(e) {
        for (let i = 0, l = that.lyric.length; i < l; i++) {
          if (parseInt(this.currentTime) === parseInt(that.lyric[i][0])) {
            let el = that.$refs.lyricer.querySelectorAll('ul li');
            el[i].classList.add('actived');
            if (i !== 0) {
              el[i - 1].classList.remove('actived');
            }
            if (i > level) {
              that.lyricScroll.scrollToElement(el[i - level], 100);
            }
          }
        }
      };
      audio.addEventListener('ended', function() {
        let id = Math.floor(Math.random() * that.songsId.length);
        that.init(that.songsId[id]);
      });
    },
    _initScroll() {
      this.lyricScroll = new BScroll(this.$refs.lyricer, {
        probeType: 3
      });
    },
    getLyric: function(id) {
      this.$http.get('https://api.imjad.cn/cloudmusic/', {
          params: {
            type: 'lyric',
            id: id
          }
        })
        .then(response => {
          let data = response.body;
          this.parseLyric(data.lrc.lyric);
          this.$nextTick(function() {
            this._initScroll();
          });
        }, response => {
          console.log('error');
        });
    },
    parseLyric: function(text) {
      var lines, pattern, result;
      lines = text.split('\n');
      pattern = /\[\d{2}:\d{2}.\d{2,4}\]/g;
      result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      };
      lines[lines.length - 1].length === 0 && lines.pop();
      lines.forEach(function(v, i, a) {
        var time, value;
        time = v.match(pattern);
        value = v.replace(pattern, '');
        time.forEach(function(v1, i1, a1) {
          var t = v1.slice(1, -1).split(':');
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
      });
      result.sort(function(a, b) {
        return a[0] - b[0];
      });
      this.lyric = result;
    },
    forWexin: function() {
      // var ua = window.navigator.userAgent.toLowerCase();
      // var uaArr = ua.match(/MicroMessenger/i);
      // if (uaArr && uaArr[0] === 'micromessenger') {
        this.isWX = true;
      // }
    }
  },
  mounted() {
    let id = Math.floor(Math.random() * this.songsId.length);
    this.init(this.songsId[id]);
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .lyricer
    height: calc(100vh - 60vw - 2em - 0.67em*2 - 9rem - 3.98px)
    overflow: hidden
  @media screen and (min-width: 500px)
    .lyricer
      height: calc(100vh - 400px - 2em - 0.67em*2 - 9rem - 3.98px)
</style>
