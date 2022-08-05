import BigNumber from 'bignumber.js'
import Web3 from 'web3'
export default {
  data() {
    return {
      textText: '',
      switchList: [
        {
          id: process.env.VUE_APP_DEFAULT_NEW_CHAIN_ID,
          abi: process.env.VUE_APP_DEFAULT_NEW_CHAIN,
        },
        {
          id: process.env.VUE_APP_DEFAULT_CHAIN_ID,
          abi: process.env.VUE_APP_DEFAULT_CHAIN,
        },
      ],
    }
  },
  computed: {},
  methods: {
    numberHandle(amount) {
      return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(8)
    },
    jiaNumber(num1, num2) {
      return new BigNumber(num1).plus(num2)
    },
    checkMetaMaskExtension() {
      if (!window.ethereum) {
        this.$message.error(
          'Please install the MetaMask wallet plug-in and try again!'
        )
      }
    },
    // accountAuthorization() {
    //   window.ethereum
    //     .request({
    //       method: 'eth_requestAccounts',
    //     })
    //     .then((accounts) => {
    //       this.textText = accounts[0]
    //       window.textText = this.textText
    //     })
    //     .catch((err) => {
    //       if (err.code === 4001) {
    //         // EIP-1193 userRejectedRequest error
    //         console.log('Please connect to MetaMask.')
    //       } else {
    //         this.$message.error('Account authorization failed!')
    //       }
    //     })
    // },
    async accountAuthorization() {
      if (!window.ethereum) {
        this.$message.error(
          'Please install the MetaMask wallet plug-in and try again!'
        )
      }
      return await window.ethereum?.request({
        method: 'eth_requestAccounts',
      })
    },
    async accountConnect() {
      try {
        let accountList = await this.accountAuthorization()
        this.textText = accountList[0]
        window.textText = this.textText
        this.$store.commit('replaceAdd', { address: accountList[0] })
      } catch (err) {
        this.isLoading = false
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          throw new Error('Please connect to MetaMask.')
        } else {
          throw new Error(err.message)
        }
      }
    },
    // switch
    async switchChain(index) {
      this.webB3 = new Web3(window.ethereum)
      let defaultChainId = Web3.utils.numberToHex(this.switchList[index].id)
      return await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: defaultChainId }],
      })
    },
    async chainCont(index = 0) {
      try {
        return await this.switchChain(index)
      } catch (err) {
        this.isLoading = false
        if (err.code == 4902) {
          try {
            return await this.addChain(index)
          } catch (error) {
            this.isLoading = false
            this.$message.error('Failed to add a default network to MetaMask!')
            throw new Error(error.message)
          }
        } else {
          throw new Error(err.message)
        }
      }
    },
    async addChain(index) {
      let defaultChainJSON = JSON.parse(this.switchList[index].abi)
      return await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: defaultChainJSON,
      })
    },
    rowClass() {
      return 'background: #ECF2F4;'
    },
    //
    goLink() {
      window.location.href = 'https://www.whitelist.vip'
    },
    goBacks() {
      window.location.href = 'https://docs.whitelist.vip'
    },
    Ttimeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async getReceipt(txHash, url) {
      await this.Ttimeout(3000)
      let receipt = await this.sendNodeRequest(
        url,
        'eth_getTransactionReceipt',
        txHash
      )
      if (receipt === null || receipt.blockNumber === null) {
        receipt = await this.getReceipt(txHash, url)
      }
      return receipt
    },
    async sendNodeRequest(url, method, signedData) {
      if (!Array.isArray(signedData)) {
        signedData = [signedData]
      }
      const request = await fetch(url, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          method,
          params: signedData,
          id: 1,
        }),
      })
      const json = await request.json()
      if (typeof json.error === 'undefined' || json.error === null) {
        if (method === 'eth_sendRawTransaction') {
          // assert.strictEqual(json.result.length, 66, `Tx wasn't sent ${json}`);
        }
        return json.result
      }
      throw new Error(`web3 RPC failed: ${JSON.stringify(json.error)}`)
    },
  },
  created() {},
  mounted() {},
}
