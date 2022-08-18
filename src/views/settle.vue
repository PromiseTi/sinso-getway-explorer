<template>
  <div>
    <TopBar />
    <div class="settle">
      <div class="backCCC">
        <div class="minCont marlrAuto padding-tb-xl" v-if="!isSettlement">
          <h3 class="margin-bottom-xs">
            Please connect to the node address to view your node information. Do
            a good job in node reward settlement.
          </h3>
          <h3 class="margin-bottom">
            Please settle within the specified time, thank you for your
            cooperation!
          </h3>

          <div class="flex align-center coloCCC">
            <img
              class="dataIcon"
              src="../assets/img-icon-time.png"
              alt=""
              srcset=""
            />
            <p class="fontSize-14">
              Settlement time 2022.03.14 00:00 to 2022.04.15 24:00
            </p>
          </div>
        </div>
        <div class="minCont marlrAuto padding-tb-xl" v-else>
          <h3 class="margin-bottom-xs">
            Because the network was congested before, which brought you some bad
            experience, so now we upgrade the network.
          </h3>
          <h3>
            Build your own network to ensure the stable operation of everyone's
            machines.
          </h3>
        </div>
      </div>
      <div>
        <div
          class="minCont marlrAuto margin-bottom-xl margin-top-xl fontSize-12 backCCC padding-sm"
          v-if="!isSettlement"
        >
          <p class="flexCont margin-bottom-sm">
            <span>Node Adress</span>
            <span>{{ address | filNum(this) }}</span>
          </p>
          <h2 class="margin-bottom-xs">BSC(Test chain)</h2>
          <p class="flexCont margin-bottom-sm">
            <span>Total Node Revenue</span>
            <span>
              <span class="margin-right">
                {{ objOb.BscNodeRevenue | filNum(this) }}</span
              >TSINSO</span
            >
          </p>
          <h2 class="margin-bottom-xs">SSC(Test chain)</h2>
          <p class="flexCont margin-bottom-sm">
            <span>Total Node Revenue</span>
            <span>
              <span class="margin-right">
                {{ objOb.SscNodeRevenue | filNum(this) }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont margin-bottom-sm">
            <span>Total</span>
            <span>
              <span class="margin-right"> {{ objOb.Total | filNum(this) }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont">
            <span>Total settlement</span>
            <span>
              <span class="margin-right">
                {{ objOb.TotalSettlement | filNum(this) }}</span
              >TSINSO</span
            >
          </p>
          <div class="flex justify-end margin-tb-xl">
            <!-- 结算 -->
            <el-button
              class="buttWid"
              v-if="
                objOb.BscSettlementStatus == 0 || objOb.SscSettlementStatus == 0
              "
              @click="openDialog"
              :loading="isLoading"
              type="primary"
              round
              >Settle accounts
            </el-button>
            <!-- 结算中 -->
            <el-button
              v-else-if="
                objOb.BscSettlementStatus == 1 && objOb.SscSettlementStatus == 1
              "
              class="buttWid"
              disabled
              type="info"
              round
              >In settlement
            </el-button>
            <!-- 已经结算完成 -->
            <el-button
              v-else-if="
                objOb.BscSettlementStatus == 2 && objOb.SscSettlementStatus == 2
              "
              class="buttWid"
              disabled
              type="info"
              round
              >Settled
            </el-button>
            <!-- 无收益 -->
            <el-button
              v-else-if="
                objOb.BscSettlementStatus == 3 && objOb.SscSettlementStatus == 3
              "
              class="buttWid"
              disabled
              type="info"
              round
              >No income
            </el-button>
            <!-- 查询  未结算 已结算-->
            <el-button
              v-if="
                [0, 2].includes(objOb.BscSettlementStatus) &&
                [0, 2].includes(objOb.SscSettlementStatus)
              "
              class="buttWid"
              type="primary"
              round
              @click="isSettlement = true"
              >Inquire</el-button
            >
          </div>
        </div>
        <div class="minCont marlrAuto margin-top-xl fontSize-12" v-else>
          <p class="flexCont">
            <span>Node Adress</span>
            <span>{{ address | filNum(this) }}</span>
          </p>
          <p class="flexCont addition">
            <span>Total settlement</span>
            <span>
              <span class="margin-right">
                {{ objOb.TotalSettlement | filNum(this) }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont margin-bottom">
            <span>State</span>
            <!-- 未开始
            <span v-if="isChoise == 1" class="colBlue">Unsettled</span> -->
            <!-- 待定 -->
            <span
              v-if="
                objOb.BscSettlementStatus == 0 || objOb.SscSettlementStatus == 0
              "
              class="colBlue"
              >Unsettled</span
            >
            <span
              v-else-if="
                objOb.BscSettlementStatus == 2 && objOb.SscSettlementStatus == 2
              "
              class="colBlue"
              >Settled</span
            >
          </p>
          <p class="fontSize-14 margin-top margin-bottom-sm">
            Please go to the new network to check the wallet balance
          </p>
          <p class="flexCont addition">
            <span>Chain name</span>
            <span> SSC</span>
          </p>
          <div class="flexCont">
            <span>RPC URL</span>
            <div>
              <p>https://data-seed-pressc-1.sinso.io/</p>
              <p>https://data-seed-pressc-2.sinso.io</p>
              <p>https://data-seed-pressc-3.sinso.io</p>
            </div>
          </div>
          <p class="flexCont addition">
            <span>Chain ID</span>
            <span>8845</span>
          </p>
          <p class="flexCont">
            <span>Currency Symbol</span>
            <span>SIN</span>
          </p>
          <p class="flexCont addition">
            <span>Blockchain browser</span>
            <span>https://testssc.sinso.io/</span>
          </p>
          <div class="flex justify-end margin-tb-xl">
            <el-button
              type="primary"
              class="buttWid"
              round
              @click="isSettlement = false"
              >Return
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog
      title="Tips"
      :visible.sync="settleStatus"
      :width="inSuccess == 1 ? '530px' : '430px'"
      center
      :show-close="false"
    >
      <div v-if="inSuccess == 2" class="flex flex-direction align-center">
        <p>Your node settlement information is being</p>
        <p>executed, please be patient</p>
        <i class="el-icon-loading fontSize-32 colorLoading margin-top"></i>
      </div>
      <div v-if="inSuccess == 0">
        <p icon="el-icon-circle-close fontSize-14">
          <i class="el-icon-error fontSize-16 colorFail"></i>Your node reward
          settlement failed, please try again！
        </p>
        <el-button
          class="marlrAuto disBlock margin-top"
          type="primary"
          @click="settleStatus = false"
          >Confirm
        </el-button>
      </div>
      <div v-if="inSuccess == 1">
        <div class="text-center lin-height-2">
          <p>Your node reward has been settled successfully！</p>
          <p>Please go to the corresponding network to check the wallet</p>
          <p>balance.</p>
        </div>
        <div class="padding-lr margin-tb-sm">
          <el-table :data="tableData" border :show-header="false">
            <el-table-column prop="date" align="center"></el-table-column>
            <el-table-column prop="name" align="center"></el-table-column>
          </el-table>
        </div>

        <el-button
          class="marlrAuto disBlock"
          type="primary"
          @click="settleStatus = false"
          >Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from 'web3'
import TopBar from '../components/topBar'
import api from '@/api/index'
export default {
  data() {
    return {
      that: this,
      address: '',
      objOb: {},
      isLoading: false,
      loadNum: 0, //  0 loading  1 succ  2 err
      isSettlement: false, // 是否是结算完成后的状态
      settleStatus: false, // el-dialog
      inSuccess: 0, // 1 suress 2 loading...   0 error
      hxi1: '', // 哈希
      hxi2: '',
      tableData: [
        {
          date: 'Chain name',
          name: 'SSC',
        },
        {
          date: 'RPC URL',
          name: 'https://data-seed-pressc-2.sinso.io',
        },
        {
          date: 'Chain ID',
          name: '8845',
        },
        {
          date: 'Currency Symbol',
          name: 'SIN',
        },
        {
          date: 'Blockchain browser',
          name: 'https://testssc.sinso.io/',
        },
      ],
    }
  },
  filters: {
    filNum(val, that) {
      if (!that.$store.state.address) {
        return ''
      } else if (val) {
        return val
      } else if (that.loadNum == 0) {
        return 'loading...'
      } else if (that.loadNum == 2) {
        return 'error'
      }
    },
  },
  components: { TopBar },
  methods: {
    init() {
      this.loadNum = 0
      this.objOb = {}
      api
        .$nodeRevenueInfo({
          nodeAddress: this.address,
        })
        .then((res) => {
          if (res.error_code == 0) {
            this.objOb = res.data
          } else {
            this.loadNum = 2
          }
        })
        .catch(() => {
          this.loadNum = 2
        })
    },
    async openDialog() {
      let { SscSettlementStatus, BscSettlementStatus } = this.objOb
      this.isLoading = true
      if (SscSettlementStatus == 0) {
        await this.chainCont()
        this.hxi1 = await this.sscTransaction()
      }
      if (BscSettlementStatus == 0) {
        await this.chainCont(1)
        this.hxi2 = await this.bscTransaction()
      }
      // eslint-disable-next-line no-unused-vars
      let url
      // eslint-disable-next-line no-unused-vars
      let hxHx
      if (this.hxi2) {
        url = process.env.VUE_APP_RAW_URL
        hxHx = this.hxi2
      } else {
        url = process.env.VUE_APP_TARGET_CHAIN_URL
        hxHx = this.hxi1
      }
      this.inSuccess = 2
      this.settleStatus = true
      let { status: status1 = '0x0' } = await this.getReceipt(hxHx, url)
      console.log(status1)
      if (status1 == '0x1') {
        this.inSuccess = 1
      } else {
        this.inSuccess = 0
      }
      this.isLoading = false
    },
    async sscTransaction() {
      let encode = await this.getSscInstance()
        .methods.confirmProfits()
        .encodeABI()
      var tx = {
        from: this.$store.state.address,
        to: process.env.VUE_APP_SOURCE_SSC_ADDRESS,
        data: encode,
      }
      try {
        return window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
        })
      } catch (err) {
        this.isLoading = false
        throw new Error(err)
      }
    },
    async bscTransaction() {
      let encode = await this.getBscInstance()
        .methods.confirmProfits()
        .encodeABI()
      var tx = {
        from: this.$store.state.address,
        to: process.env.VUE_APP_SOURCE_BSC_ADDRESS,
        data: encode,
      }
      try {
        return window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
        })
      } catch (err) {
        this.isLoading = false
        throw new Error(err)
      }
    },
    getSscInstance() {
      if (!this.sscInstance) {
        let web3 = this.web3
        this.sscInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_PROFIT_CONFIRM_ABI),
          process.env.VUE_APP_SOURCE_SSC_ADDRESS
        )
      }
      return this.sscInstance
    },
    getBscInstance() {
      if (!this.bscInstance) {
        let web3 = this.bscWeb3
        this.bscInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_PROFIT_CONFIRM_ABI),
          process.env.VUE_APP_SOURCE_BSC_ADDRESS
        )
      }
      return this.bscInstance
    },
  },
  watch: {
    // eslint-disable-next-line no-dupe-keys
    '$store.state.address': {
      async handler(val) {
        this.address = val
        val && this.init()
      },
      immediate: true,
    },
    settleStatus(val) {
      // 弹窗关闭时
      if (!val) {
        this.hxi1 = ''
        this.hxi2 = ''
        this.init()
      }
    },
  },
  created() {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_TARGET_CHAIN_URL)
    )
    this.web3 = web3

    let bscWeb3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_RAW_URL)
    )
    this.bscWeb3 = bscWeb3
  },
  mounted() {},
}
</script>

<style scoped>
.paddingDioText {
  padding: 17px 0;
}

.colorLoading {
  color: #00abeb;
}

.colorFail {
  color: #fb2745;
}

.colorText {
  color: #092530;
}

.lineHeight {
  line-height: 2;
}

.dataIcon {
  width: 18px;
  height: 16px;
  margin-right: 6px;
}

/* .el-button--primary {
    background-color: #00abeb;
    border-color: #00abeb;
  } */
.flexCont {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
  padding: 20px;
  background-color: #ecf2f4;
}

.addition {
  background-color: #f3f5f8;
}

.colBlue {
  color: #1bbe7f;
}
</style>
