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
                            <span>首页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <template #title>
                            <i class="el-icon-edit-outline"></i>
                            <span>违约认定申请</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <template #title>
                            <i class="el-icon-document-checked"></i>
                            <span>违约重生申请</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <template #title>
                            <i class="el-icon-search"></i>
                            <span>违约信息查询</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <template #title>
                            <i class="el-icon-pie-chart"></i>
                            <span>违约统计</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <i class="el-icon-setting" style="margin-right: 15px" @click="back">退出登录</i>
                    <span>admin</span>
                </el-header>
                <el-main>
                    内容
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default{
        name: 'Login',
        methods: {
            back(){
                this.$router.push("/");
            }
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