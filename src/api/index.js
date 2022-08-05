import server from '@/plugins/axios'
export default {
  $nodeRevenueInfo(params) {
    return server.get('/api/node_revenue_info', params)
  },
}
