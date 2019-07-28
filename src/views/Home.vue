<template>
<div>
    <header-bar></header-bar>
    <div class="content">
        <nav-bar></nav-bar>
        <!-- <div class="big-title">
            <h1>金融普惠 信用未来</h1>
            <i>为企业提供融资、查询审批等多项综合服务</i>
        </div> -->
        <div style="font-size:80px;color:red">
            <router-view />
        </div>
        
    </div>
</div>
</template>

<script>
// @ is an alias to /src

import HeaderBar from "components/layout/HeaderBar.vue";
import NavBar from "components/layout/NavBar.vue";
export default {
    name: "home",
    components: {
        HeaderBar,
        NavBar
    }
};
</script>
