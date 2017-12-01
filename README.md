# react-project

项目名称:西十区

项目介绍:西十区是一个B2B2C兼C2B2C票务交易平台

技术栈:react react-router-4.x react-redux thunk webpack sass antd-mobile restful-api git lodash

安装环境:node.js

功能模块:首页、详情页、分类、搜索、购物车

演示地址:https://github.com/GGsimidaO/react-project.git

技术难点:redux中action的异步请求以及购物车商品添加的判断

解决方案:action异步请求采用thunk中间件处理，购物车商品添加采用lodash类库处理数组中对象去重，然后循环处理后的数组渲染商品列表，然后根据重复次数获取重复商品数量。