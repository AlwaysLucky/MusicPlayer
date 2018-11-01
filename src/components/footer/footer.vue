<template>
  <footer>
      <div class="foot">
          <span class="btn forward back" id="back" @click="back"></span>
          <span class="btn" :class="{start: flag, play: !flag}" id="play" @click="play"></span>
          <span class="btn forward" id="forward" @click="forward"></span>
      </div>
  </footer>
</template>

<script>
var picker, imger, imgblur;
var imgIndex = 1; // 图片指针
export default {
  name: 'Footer',
  props: {
  	songsId: {
  		type: Array
  	},
  	gallery: {
  		type: Array
  	}
  },
  data () {
  	return {
  		flag: this.$parent.$refs.lyricer.isWX
  	};
  },
  methods: {
  	play: function () {
	  	// this.$nextTick(function () {
		  	let audio = this.$parent.$refs.audio;
	  		if (!this.flag) {
	  			this.flag = !this.flag;
	  			audio.pause();
	  			let iTransform = getComputedStyle(imger).transform;
				let cTransform = getComputedStyle(picker).transform;
	  			picker.style.transform = cTransform === 'none' ? iTransform : iTransform.concat(' ', cTransform);
	  			this.$parent.$refs.header.canplay = false; // 头像暂停
	  		} else {
	  			if (this.$parent.autoPlay === false) {
	  				this.$parent.autoPlay = true;
	  			}
	  			this.flag = !this.flag;
	  			audio.play();
	  			this.$parent.$refs.header.canplay = true; // 头像旋转
	  		}
	  	// });
  	},
  	back: function () {
  		this.turnHeadImg(imgIndex, 'back');
  	},
  	forward: function () {
  		let songsId = this.songsId;
  		let id = Math.floor(Math.random() * songsId.length);
  		this.$parent.$refs.header.canplay = false; // 头像暂停
  		this.$parent.$refs.lyricer.init(songsId[id]);
  		this.turnHeadImg(imgIndex, 'forward');
  	},
  	autoPlayAudio: function() {
  		wx.config({
  		    // 配置信息, 即使不正确也能使用 wx.ready
  		    debug: false,
  		    appId: '',
  		    timestamp: 1,
  		    nonceStr: '',
  		    signature: '',
  		    jsApiList: []
  		});
  		wx.ready(function() {
  		    this.$parent.$refs.audio.play();
  		});
  	},
  	turnHeadImg: function(i, flag) {
  		let gallery = this.gallery;
  		imger.style.backgroundImage = 'url(' + gallery[i] + ')';
  		imgblur.style.backgroundImage = 'url(' + gallery[i] + ')';
  		if (flag === 'forward') imgIndex++;
  		if (flag === 'back') imgIndex--;
  		if (imgIndex === gallery.length) imgIndex = 0;
  		if (imgIndex < 0) imgIndex = gallery.length - 1;
  	}
  },
  mounted() {
  	picker = this.$parent.$refs.header.$refs.picker;
  	imger = picker.querySelector('.imger');
  	imgblur = this.$parent.$refs.imgblur;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
	.foot
		font-size: 0
		span:nth-child(2)
			margin: 0 20px
		.btn
			display: inline-block
			width: 5rem
			height: 5rem
			border-radius: 100%
			color: rgba(255,155,0,.8)
		.play
			background: linear-gradient(0deg, currentColor, currentColor) no-repeat 38% center,
			linear-gradient(0deg, currentColor, currentColor) no-repeat 62% center
			background-size: 4px 50%
		.pause
			background: linear-gradient(0deg, currentColor, currentColor) no-repeat center
			background-size: 40% 40%
		.start,.forward
			position: relative
			&:before
				content: ""
				position: absolute
				left: 0
				right: 0
				top: 0
				bottom: 0
				width: 40%
				height: 40%
				margin: auto auto auto 20%
				background: linear-gradient(135deg, currentColor, currentColor 50%, hsla(0, 0%, 100%, 0) 50%) no-repeat center
				transform: rotate(135deg)
		.forward
			&:before,&:after
				content: ""
				position: absolute
				left: 0
				right: 0
				top: 0
				bottom: 0
				width: 30%
				height: 30%
			&:before
				margin: auto auto auto 17%
				background: linear-gradient(135deg, currentColor, currentColor 50%, hsla(0, 0%, 100%, 0) 50%) no-repeat center
				transform: rotate(135deg)
			&:after
				margin: auto auto auto 40%
				background: linear-gradient(135deg, currentColor, currentColor 50%, hsla(0, 0%, 100%, 0) 50%) no-repeat center
				transform: rotate(135deg)
		.back
			transform: rotate(-180deg)
</style>
