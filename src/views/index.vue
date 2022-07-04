<template>
    <div>
        <el-container>
            <el-aside>
                <div style="padding:10px">
                    <span>违约客户管理系统</span>
                </div>
                <el-menu :default-openeds="['1']">
                    <el-menu-item index="1">
                        <template #title>
                            <i class="el-icon-menu"></i>
                            <router-link to="/home">首页</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" v-if="!isReview">
                        <template #title>
                            <i class="el-icon-edit-outline"></i>
                            <router-link to="/application/default">违约认定申请</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" v-if="isReview">
                        <template #title>
                            <i class="el-icon-s-claim"></i>
                            <router-link to="/review/defaultApplication">违约认定审核</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3" v-if="!isReview">
                        <template #title>
                            <i class="el-icon-document-checked"></i>
                            <router-link to="/application/defaultRenewal">违约重生申请</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3" v-if="isReview">
                        <template #title>
                            <i class="el-icon-circle-check"></i>
                            <router-link to="/review/defaultRenewalApplication">违约重生审核</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <template #title>
                            <i class="el-icon-search"></i>
                            <router-link to="/dataSearch">违约信息查询</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <template #title>
                            <i class="el-icon-pie-chart"></i>
                            <router-link to="/statistics">违约统计</router-link>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="6" v-if="isReview">
                        <template #title>
                            <i class="el-icon-s-tools"></i>
                            <router-link to="/reasons">违约风险原因维护</router-link>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <i class="el-icon-setting" style="margin-right: 5px"></i>
                    <router-link to="/" style="margin-right: 10px">退出登录</router-link>
                    <span>admin</span>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default{
        name: 'Login',
        data(){
            return{
                isReview:false,
            }
        },
        methods: {
            
        }
    }
</script>


<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
  
    .el-aside {
        color: #333;
        height:100%;
        width:15%;
    }
    .el-menu{
        height:calc(100% - 50px) ;
    }
    .el-container{
        height:100vh;
    }

</style>