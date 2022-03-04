import mockRequest from '@/utils/mockRequest'

const actions = {
    // 发请求获取首页mock数据
   async getData({commit}){
      let result = await mockRequest.get('/home/list')
      if(result.code==20000){
          commit('GETDATA',result.data)
      }
    }
}

const mutations = {
    GETDATA(state,value){
        state.list = value
    }
}

const state = {
    list:{}
}

export default {
    actions,
    mutations,
    state
}