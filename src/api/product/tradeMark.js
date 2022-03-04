import request from '@/utils/request'
// 获取品牌列表接口
export const reqTradeMark =(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
// 添加or修改
export const reqAddorUpdateTradeMark =(data)=>{
    if(data.id){
        return request({url:'/admin/product/baseTrademark/update',data,method:'put'})
    }else{
        return request({url:'/admin/product/baseTrademark/save',data,method:'post'})
    }
}
// 删除
export const reqDeleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})