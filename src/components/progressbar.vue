<template>
  <div>
    <div class="circle">
      <div class="track"></div>
      <div class="left transition-rotate"></div>
      <div class="right transition-rotate"></div>
      <div class="mask"></div>
      <span id="hour">{{ valValue }}</span
      ><span class="percent">%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    valValue: {
      type: Number,
      default: 0,
    },
    message: {
      type: Array,
      default: () => [
        { progress: 10, timing: 1000 },
        { progress: 20, timing: 4000 },
        { progress: 30, timing: 9000 },
        { progress: 40, timing: 12000 },
        { progress: 50, timing: 20000 },
        { progress: 60, timing: 30000 },
        { progress: 80, timing: 40000 },
        { progress: 90, timing: 40000 },
        { progress: 95, timing: 42000 },
      ],
    },
  },
  name: '',
  components: {},
  watch: {
    valValue() {
      this.changeHour()
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    changeHour() {
      var mask = document.querySelectorAll('.mask')[0]
      var left = document.querySelectorAll('.left')[0]
      var right = document.querySelectorAll('.right')[0]
      var n
      n = this.valValue || 0
      if (n <= 50) {
        left.style.webkitTransform = 'rotate(' + 3.6 * n + 'deg)'
        right.style.opacity = 0
        mask.style.opacity = 1
      } else {
        right.style.opacity = 1
        mask.style.opacity = 0
        left.style.webkitTransform = 'rotate(' + 180 + 'deg)'
        right.style.webkitTransform = 'rotate(' + 3.6 * n + 'deg)'
      }
    },
    times() {
      for (const { progress, timing } of this.message) {
        setTimeout(() => {
          this.valValue = progress
        }, timing)
      }
    },
  },
  created() {},
  mounted() {
    this.times()
  },
}
</script>
<style scoped>
/* Progress bar style */
.circle {
  position: relative;
  width: 130px;
  height: 130px;
  text-align: center;
}
.circle .track,
.circle .mask,
.circle .left,
.circle .right {
  width: 130px;
  height: 130px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 20px #e7e7e7 solid;
  box-sizing: border-box;
}
.circle .mask,
.circle .left,
.circle .right {
  clip: rect(0 65px 130px 0);
}
.circle .left,
.circle .right {
  border-color: #6fec6f;
}
.circle .right {
  opacity: 0;
  transform: rotate(180deg);
}
/* Progress display text style */
.circle #hour {
  color: #666;
  font-size: 48px;
  line-height: 130px;
}
.circle .percent {
  font-size: 20px;
  color: #999;
  margin-left: 5px;
}
.transition-rotate {
  transition: transform 0.1s ease-in-out;
}
</style>
