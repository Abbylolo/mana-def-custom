<template>
    <div>
        <el-container>
            <el-aside>
                <div style="padding:20px;height:80px;text-align:center">
                    <span>违约客户管理系统</span>
                    <!-- <img src="../assets/pics/background-logo.jpg" style="width:190px;" /> -->
                </div>
                <el-row class="tac">
                    <el-col>
                        <el-menu :default-openeds="['1']" background-color="#545c64" text-color="#fff"
                            active-text-color="#ffd04b">
                            <el-menu-item index="1">
                                <template #title>
                                    <i class="el-icon-menu"></i>
                                    <router-link to="/home" style="text-decoration: none;color: #fff;">首页</router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <template #title>
                                    <i class="el-icon-s-claim"></i>
                                    <router-link to="/review/defaultApplication"
                                        style="text-decoration: none;color: #fff;">
                                        违约认定审核
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <template #title>
                                    <i class="el-icon-circle-check"></i>
                                    <router-link to="/review/defaultRenewalApplication"
                                        style="text-decoration: none;color:#fff;">违约重生审核
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <template #title>
                                    <i class="el-icon-search"></i>
                                    <router-link to="/dataSearch" style="text-decoration: none;color: #fff;">违约信息查询
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="5">
                                <template #title>
                                    <i class="el-icon-pie-chart"></i>
                                    <router-link to="/statistics" style="text-decoration: none;color: #fff;">违约统计
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="6">
                                <template #title>
                                    <i class="el-icon-s-tools"></i>
                                    <router-link to="/reasons" style="text-decoration: none;color: #fff;">违约风险原因
                                    </router-link>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <img src="../assets/pics/man.png"
                        style="margin-right: 10px;height:40px;float:left;margin-top: 20px;" />
                    <span style="margin-right: 10px;font-size: 16px;float:left;">{{loginName}}</span>
                    <router-link to=" /"
                        style="margin-right: 10px;text-decoration: none;color: #658dfb;font-size: 16px;">退出登录
                    </router-link>
                    <i class="el-icon-setting" style="margin-right: 10px;width:16px"></i>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      loginName: ''
    }
  },
  created () {
    this.checkIdentity()
  },
  methods: {
    checkIdentity () {
      this.$api.get('/reviewer/queryAll', {}).then(
        res => {
          this.loginName = res.data.data[0].reviewerName
        })
    }
  }
}
</script>

<style scoped>

    .el-header {
        background-color: #060120;
        color: rgb(246, 228, 228);
        text-decoration: none;
        line-height: 80px;
    }

    .el-aside {
        color: rgb(255, 255, 255);
        height:100%;
        width:15%;
        text-decoration: none;
        background-color: #0a0234;
        font-size:20px;
    }
    .el-menu{
        height:calc(100% - 50px) ;
        background-color: #0a0234;
        text-decoration: none;
    }
    .el-container{
        height:100vh;
    }

    .el-menu-item{
        text-decoration: none;
    }

</style>
