<template>
    <div>
        <el-button @click="clickLogin">去登录</el-button>
        <el-button @click="goPerson">去个人设置</el-button>
    </div>
    
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        clickLogin(){
            console.log('clickLogin2');
            this.$store.dispatch('userLogin');
            console.log('33333',this.$router)
        },
        goPerson(){
            this.$router.push('/ucenter/person')
        }
    }
}
</script>

