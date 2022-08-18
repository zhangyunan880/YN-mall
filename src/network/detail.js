import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getGoodsRecommend(){
    return request({
        url:'/recommend'
    });
}

//把数据整合到一起方便拿数据
export class Goods{
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop{
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount=shopInfo.cGoods
    }
}

export class GoodsParam{
    constructor(info, rule) {
        this.image = info.image ? info.sthis.image[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}

