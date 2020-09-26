<template>
    <div class="wrapper">
         <HomeHead></HomeHead>
        <HomeSidebar></HomeSidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <HomeTags></HomeTags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import HomeHead from "./Header.vue";
import HomeSidebar from "./Sidebar.vue";
import HomeTags from "./Tags.vue";
import bus from "../../utils/bus";
export default {
    data(){
        return {
            tagsList: [],
            collapse: false
        }
    },
    components: {
        HomeHead,
        HomeSidebar,
        HomeTags
    },
    created() {
        bus.$on('collapse-content',msg => {
            this.collapse = msg;
        });

        bus.$on('tags',msg => {
            let arr = [];
            for(let i=0,len = msg.length;i<len;i++){
                msg[i],name && arr.push(msg[i].name)
            }
            this.tagsList = arr;
        })
    },
};
</script>
