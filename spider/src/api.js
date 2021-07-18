import ApiClientFactory from "./lib/ApiClientFactory"

const apiConfig = {
        dictionary: {
                add: {
                        method: "post",
                        url: "/dictionary"
                },
                getList: {
                        method: "get",
                        url: "/dictionary/page"
                },
                updateById: {
                        method: "put",
                        url: "/dictionary/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/dictionary/update/batch"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/dictionary/delete/batch"
                },
                deleteById: {
                        method: "delete",
                        url: "/dictionary/{id}"
                },
                getAll: {
                        method: "get",
                        url: "/dictionary/all"
                }
        },
        crawler: {
                add: {
                        method: "post",
                        url: "/crawler"
                },
                updateById: {
                        method: "put",
                        url: "/crawler/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/crawler/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/crawler/page"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/crawler/delete/batch"
                },
                deleteById: {
                        method: "delete",
                        url: "/crawler/{id}"
                }
        },
        downSystem: {
                add: {
                        method: "post",
                        url: "/downSystem"
                }, updateById: {
                        method: "put",
                        url: "/downSystem/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/downSystem/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/downSystem/page"
                }, deleteById: {
                        method: "delete",
                        url: "/downSystem/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/downSystem/delete/batch"
                }
        },
        downSystemSite: {
                add: {
                        method: "post",
                        url: "/downSystemSite"
                },
                updateById: {
                        method: "put",
                        url: "/downSystemSite/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/downSystemSite/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/downSystemSite/page"
                }, deleteById: {
                        method: "delete",
                        url: "/downSystemSite/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/downSystemSite/delete/batch"
                },
                getBySiteId: {
                        method: "get",
                        url: "/downSystemSite/getBySiteId/{siteId}"
                },
                balance:{
                        method: "post",
                        url: "/downSystemSite/balance"
                },
                resetConcurrency:{
                        method: "post",
                        url: "/downSystemSite/resetConcurrency/{downSystemSiteId}"
                },
                resetJob:{
                        method: "post",
                        url: "/downSystemSite/resetJob"
                }
        },
        siteAccount: {
                add: {
                        method: "post",
                        url: "/siteAccount"
                }, updateById: {
                        method: "put",
                        url: "/siteAccount/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/siteAccount/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/siteAccount/page"
                },
                getBySite: {
                        method: "get",
                        url: "/siteAccount/getBySite"
                },
                deleteById: {
                        method: "delete",
                        url: "/siteAccount/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteAccount/delete/batch"
                }
        },
        proxy: {
                add: {
                        method: "post",
                        url: "/proxy"
                },
                updateById: {
                        method: "put",
                        url: "/proxy/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/proxy/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/proxy/page"
                }, deleteById: {
                        method: "delete",
                        url: "/proxy/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/proxy/delete/batch"
                }
        },
        cookie: {
                add: {
                        method: "post",
                        url: "/cookie"
                },
                updateById: {
                        method: "put",
                        url: "/cookie/{id}"
                },
                getList: {
                        method: "get",
                        url: "/cookie/page"
                }, deleteById: {
                        method: "delete",
                        url: "/cookie/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/cookie/delete/batch"
                }
        },
        site: {
                add: {
                        method: "post",
                        url: "/site"
                },
                updateById: {
                        method: "put",
                        url: "/site/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/site/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/site/page"
                }, deleteById: {
                        method: "delete",
                        url: "/site/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/site/delete/batch"
                }
        },
        template: {
                add: {
                        method: "post",
                        url: "/template"
                },
                updateById: {
                        method: "put",
                        url: "/template"
                },
                updateBatch: {
                        method: "put",
                        url: "/template/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/template/page"
                }, deleteById: {
                        method: "delete",
                        url: "/template/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/template/delete/batch"
                }
        },
        siteIpDelayMap: {
                getList: {
                        method: "get",
                        url: "/siteIpDelayMap/page"
                }, deleteById: {
                        method: "delete",
                        url: "/siteIpDelayMap/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteIpDelayMap/delete/batch"
                }
        },
        siteIpBlockMap: {
                getList: {
                        method: "get",
                        url: "/siteIpBlockMap/page"
                }, deleteById: {
                        method: "delete",
                        url: "/siteIpBlockMap/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteIpBlockMap/delete/batch"
                }
        },
        crawlTask: {
                getList: {
                        method: "get",
                        url: "/crawlTask/page"
                },
                deleteById: {
                        method: "delete",
                        url: "/siteIpBlockMap/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/site/delete/batch"
                }
        },
        enableTask: {
                getList: {
                        method: "get",
                        url: "/enableTask/page"
                }
        },
        enum: {
                getAll: {
                        method: "get",
                        url: "/enum/all"
                }
        },
        dispatchRecord: {
                getByTaskId: {
                        method: "get",
                        url: "/dispatchRecord/getByTaskId/{taskId}"
                }
        },
        bindRecord: {
                getByTaskId: {
                        method: "get",
                        url: "/bindRecord/getByTaskId/{taskId}"
                }
        },
        url: {
                getSeedUrlByDownSystemSiteId: {
                        method: "get",
                        url: "/url/getSeedUrlByDownSystemSiteId/{downSystemSiteId}"
                },
                addSeedUrl: {
                        method: "post",
                        url: "/url/seed"
                },
                deleteById: {
                        method: "delete",
                        url: "/url/{id}"
                },
        },
        blockRule: {
                getByDownSystemSiteId: {
                        method: "get",
                        url: "/blockRule/getByDownSystemSiteId/{downSystemSiteId}",
                },
                add: {
                        method: "post",
                        url: "/blockRule"
                },
                deleteById: {
                        method: "delete",
                        url: "/blockRule/{id}"
                },
        },
        downSystemSiteDispatch: {
                getBySourceDownSystemSiteId: {
                        method: "get",
                        url: "/downSystemSiteDispatch/getBySourceDownSystemSiteId/{sourceDownSystemSiteId}",
                },
                add: {
                        method: "post",
                        url: "/downSystemSiteDispatch"
                },
                deleteById: {
                        method: "delete",
                        url: "/downSystemSiteDispatch/{id}"
                },
        },
        file :{
                download:{
                        method:"get",
                        url:"/file/download"
                },
                
                upload:{
                        method:"post",
                        url:"/file/upload"
                }

        }

}

export default ApiClientFactory.create(apiConfig);