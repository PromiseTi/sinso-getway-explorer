<template>
  <div class="" v-loading.fullscreen.lock="isLoading">
    <TopBar />
    <div class="backTu">
      <img class="margin-tb-xl" src="../assets/imgs/img-banner-yinhao.png" />
      <h2 class="margin-bottom fontSize-28">
        SINSO distributed high-speed cache node
      </h2>
      <p class="fontSize-20 margin-bottom-xs coloCCC">
        which solves the distribution of VR, AR, video streaming and
      </p>
      <p class="fontSize-20 coloCCC">
        high-speed CDN, and high-speed response of DAPP
      </p>
    </div>
    <div class="marlrAuto widthCont">
      <div class="flex justify-between">
        <div
          class="flex flex-direction justify-center text-center bgBacks"
          v-for="item in list1"
          :key="item.name"
        >
          <p class="margin-bottom-sm fontSize-24 fontBlod">
            {{ isTimes ? 'load timeout' : item.uv }}
          </p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
      <div class="flex justify-between margin-bottom-xl">
        <div
          class="flex flex-direction justify-center text-center bgBacks"
          v-for="item in list2"
          :key="item.name"
        >
          <p class="margin-bottom-sm fontSize-24 fontBlod">
            {{ isTimes ? 'load timeout' : item.uv }}
          </p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- error -->
    <el-dialog
      title="Tips"
      :visible.sync="isTimes"
      width="400px"
      center
      :show-close="false"
    >
      <p class="margin-bottom-sm">
        Please re request data due to network congestion
      </p>
      <el-button class="buttos" type="primary" @click="openFullScreen">
        save
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import TopBar from '../components/topBar'
export default {
  name: '',
  components: { TopBar },
  props: {},
  data() {
    return {
      time: { days: 0, hours: 0, mins: 0, seconds: 0 },
      poolInfo: '',
      isTimes: false,
      isLoading: true,
      web3: '',
      mineInstance: '',
      list1: [
        { name: 'Total Network Nodes', uv: 'loading' },
        { name: 'Total Active Nodes', uv: 'loading' },
        { name: 'Number of completed staked nodes', uv: 'loading' },
      ],
      list2: [
        { name: 'Total number of TSINSO mineable', uv: 'loading' },
        { name: 'Total number of TSINSO mined', uv: 'loading' },
        { name: 'Total TSINSO Staked for Mining', uv: 'loading' },
      ],
    }
  },
  computed: {},
  watch: {
    poolInfo(value) {
      if (value) {
        this.isTimes = false
        this.isLoading = false
      }
    },
  },
  methods: {
    getMineInstance() {
      if (!this.mineInstance) {
        let web3 = this.web3
        this.mineInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_NEW_MINE_CONTRACT_ABI),
          process.env.VUE_APP_NEW_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    async getPoolInfo() {
      this.timing()
      let poolInfo = await this.getMineInstance().methods.getPoolInfo().call()
      this.list1[0].uv = poolInfo[0]
      this.list1[1].uv = poolInfo[1]
      this.list1[2].uv = poolInfo[2]
      this.list2[0].uv = this.numberHandle(poolInfo[3])
      this.list2[1].uv = this.numberHandle(poolInfo[4])
      this.list2[2].uv = this.numberHandle(poolInfo[5])
      this.poolInfo = poolInfo
    },
    openFullScreen() {
      this.isTimes = false
      this.isLoading = true
      this.getPoolInfo()
    },
    numberHandle(amount) {
      return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(8)
    },
    timing() {
      setTimeout(() => {
        if (!this.poolInfo) {
          this.isTimes = true
          this.isLoading = false
        }
      }, 45000)
    },
    switchCli() {
      let web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.VUE_APP_TARGET_CHAIN_URL)
      )
      this.web3 = web3
      this.getPoolInfo()
    },
  },
  created() {
    let val = true
    this.$store.commit('modifyOdd1', { val })
    this.switchCli()
  },
  mounted() {},
}
</script>
<style scoped>
.backTu {
  width: 100%;
  height: 450px;
  background: url(../assets/imgs/img-banner.png) no-repeat;
  background-size: cover;
  padding-left: 150px;
  margin-bottom: 50px;
}
.backTu > img {
  width: 65px;
}
.bgBacks {
  width: 460px;
  height: 236px;
  background: url(../assets/imgs/img-shuju-bg.png) no-repeat;
  background-size: cover;
}
.hash {
  height: 98px;
  background: linear-gradient(180deg, #f9fdff, #edf6f9);
}
.buttos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 140px;
}

/* dialog */
.notice {
  width: 100%;
  height: 640px;
  background: url('../assets/img-gonggao-bg.png');
  background-size: cover;
  padding: 63px 52px 52px 52px;
}
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 79px 23px 60px;
}
.noticeIcon {
  width: 86px;
  height: 86px;
  margin-top: -43px;
}
.timeRender > span {
  padding: 6px 6px 8px 6px;
  color: #00abeb;
}
.timeRender > .buleCircle {
  background: #00abeb;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
::v-deep .dialogs .el-dialog__body {
  padding: 0 !important;
}
::v-deep .dialogs .el-dialog {
  box-shadow: none !important;
  background-color: transparent !important;
}
.colorTitle {
  color: #242526;
}
.colorText {
  color: #092530;
}
.lineHeight {
  line-height: 2;
}
</style>
