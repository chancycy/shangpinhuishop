<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 动画效果 name属性: 用来自定义过渡类名前缀 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
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
import { mapState } from "vuex";
// import _ from "lodash"; // 全部引入
import throttle from "lodash/throttle"; // 按需引入
export default {
  name: "TypeNav",
  data() {
    return {
      // 添加一个响应式属性 对应存储用户鼠标碰到的是哪一个分类
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    // ...mapState(["categoryList"]), // 对象写法
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  mounted() {
    // 20240930 看视频p30的时候忽然发现这里我少了这个判断show=f忘记加了
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex

    // 为了使用节流，然后为了能用上_.lodash，选择es5的函数写法
    // throttle回调函数别用箭头函数，上下文this可能会有问题。
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      console.log("鼠标进入 :>> ", index);
    }, 50),

    // 鼠标移除时的动作触发的方法
    leaveIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      let el = event.target;
      // dataset获取节点的自定义属性和属性值，但dataset为es6新增，有的
      // 自定义属性用驼峰命名的，获取的时候记得小写
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      // 如果标签身上拥有categoryname的话，则这个标签一定是a标签
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
      }
      if (this.$route.params) {
        location.params = this.$route.params;
      }
      location.query = query;
      this.$router.push(location);
      // console.log('event.target.dataset.categoryname :>> ', event.target.dataset.categoryname);
      // this.$router.push("/search");
    },
    // 当鼠标移入时，页面是search时，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      // 原先的鼠标移出事件
      this.leaveIndex();
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
            display: none;
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

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // 13.3 加背景色 加css样式就能解决（以下） 但就不用，要用js做（目的是为了熟悉事件委派）
        // .item:hover{
        //   background: skyblue;
        // }

        .cur {
          background: skyblue;
        }
      }
    }

    // 过渡动画的样式
    .sort-enter {
      // 过渡动画开始阶段
      height: 0;
    }
    .sort-enter-to {
      // 过渡动画结束阶段
      height: 461px;
    }
    .sort-enter-active {
      // 定义动画时间、速率等
      transition: all 0.5s linear;
    }
  }
}
</style>