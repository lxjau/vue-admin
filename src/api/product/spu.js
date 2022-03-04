import request from '@/utils/request'
// spu列表
export const reqGetSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, params: { category3Id }, method: 'get' })
// 获取spufrom-spu信息
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 品牌信息
export const reqTraderMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })
// 获取图片/admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 销售属性,最多三个
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })
// 添加or修改spu
export const reqAddOrUPdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', data: spuInfo, method: 'post' })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', data: spuInfo, method: 'post' })
    }
}
// 删除spu
export const reqDeleteSpu =(spuId) =>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})


// 获取销售属性的数据 GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList =(spuId) =>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})
// 获取平台属性数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id) =>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
// 添加sku /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) =>request({url:'/admin/product/saveSkuInfo',data:skuInfo,method:'post'})
// 获取sku列表数据 /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) =>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
