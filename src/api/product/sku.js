import request from '@/utils/request'

// 获取sku列表 /admin/product/list/{page}/{limit}
export const reqSkuList = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
// 上架 /admin/product/onSale/{skuId}
export const reqOnSale =(skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'get'})
// 下架 /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
// 详情 /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
