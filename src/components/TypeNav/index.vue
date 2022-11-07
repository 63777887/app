<!--  -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="removeItemIndex()" @mouseenter="showItem">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                   :class="{cur:this.currentIndex==index}">
                <h3 @mouseenter="changeItemIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-itemType="1">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" v-show="currentIndex == index">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-itemType="2">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-itemType="3">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from ‘《组件路径》‘;
import {mapState} from 'vuex';
import {throttle} from 'lodash';

export default {
  name: 'TypeNav',
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
//这里存放数据
    return {
      currentIndex: -1,
      show: true,
    };
  },
//监听属性 类似于data概念
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，使用计算属性时，会调用这个函数
      // 注入一个参数state, 其实就是大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 16);
      }
    })
  },
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    // changeItemIndex(index) {
    //   this.currentIndex = index
    // },
    // 添加loadsh中的节流函数
    changeItemIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    removeItemIndex() {
      this.currentIndex = -1;
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    showItem() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    // 编程式导航进行跳转
    goSearch(event) {
      // 最好的办法: 编程式导航+事件委派
      // 利用事件委派存在的问题:
      // 1.如何保证点击a标签时才跳转
      // 2.如何确定是第几级的跳转

      // 1. 给a标签加上一个自定义属性,保证其余节点是没有的
      // 2. 加自定义属性itemType,获取item层级
      let target = event.target;
      // 获取到发出事件的节点,如何带有自定义属性,那么一定是a便签
      // dataset可以获取到自定义属性和属性值,dataset: 获取到 data-后面的名字
      let {categoryname, itemtype} = target.dataset;
      if (categoryname) {
        let location = {name: 'search'};
        let query = {categoryName: categoryname};
        query.itemType = itemtype
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 通知Vuex发请求，获取数据，存储与仓库中
    this.$store.dispatch('categoryList')
    // 动态隐藏联级
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  beforeMount() {
  }, //生命周期 - 挂载之前
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        // 改变鼠标指向的item的背景颜色 方法一： 直接修改css样式
        //.item:hover{
        //  background: skyblue;
        //}
        // 改变鼠标指向的item的背景颜色 方法二： 通过js动态增加class样式
        .cur {
          background: skyblue;
        }

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    .sort-enter{
      height: 0px;
    }

    .sort-enter-to{
      height: 461px;
    }

    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}

</style>


