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
                                    <router-link to="/home-sponsor" style="text-decoration: none;color: #fff;">首页</router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <template #title>
                                    <i class="el-icon-edit-outline"></i>
                                    <router-link to="/application/default"
                                        style="text-decoration: none;color: #fff;">
                                        违约认定申请
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <template #title>
                                    <i class="el-icon-document-checked"></i>
                                    <router-link to="/application/defaultRenewal"
                                        style="text-decoration: none;color:#fff;">违约重生申请
                                    </router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <template #title>
                                    <i class="el-icon-search"></i>
                                    <router-link to="/dataSearchSponsor" style="text-decoration: none;color: #fff;">违约信息查询
                                    </router-link>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <img src="../assets/pics/boy.png"
                        style="margin-right: 10px;height:40px;float:left;margin-top: 20px;" />
                    <span style="margin-right: 10px;font-size: 16px;float:left;">{{loginName}}</span>
                    <router-link to="/"
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
  name: 'indexSponsor',
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
      this.$api.get('/sponsor/queryAll', {
      }).then(res => {
        this.loginName = res.data.data[0].sponsorName
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
        height: 100%;
        width: 15%;
        text-decoration: none;
        background-color: #0a0234;
        font-size: 20px;
    }

    .el-menu {
        height: calc(100% - 50px);
        background-color: #0a0234;
        text-decoration: none;
    }

    .el-container {
        height: 100vh;
    }

    .el-menu-item {
        text-decoration: none;
    }

</style>