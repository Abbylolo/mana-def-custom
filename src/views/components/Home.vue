<template>
  <div id="building"> 
  </div>
  <h1>首页</h1>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :header-cell-style="{fontSize:'16px'}"
    v-if="isSponsor">
    
    <el-table-column
      prop="sponsorId"
      label="ID"
      width="180"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="sponsorName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sponsorSex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="sponsorTel"
      label="联系方式">
    </el-table-column><el-table-column
      prop="sponsorEmail"
      label="邮箱">
    </el-table-column>
  </el-table>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :header-cell-style="{fontSize:'16px'}"
    v-else>
    <el-table-column
      prop="reviewerId"
      label="ID"
      width="180"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="reviewerName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="reviewerSex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="reviewerTel"
      label="联系方式">
    </el-table-column><el-table-column
      prop="reviewerEmail"
      label="邮箱">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    name:'Home',
    data(){
      return{
        isSponsor:true,
        tableData:[]
      }
    }
}
</script>

<style>
  #building{
    background:url("~@/assets/pics/background-logo.jpg");
    width:50%;
    height:90%;
    margin-left:15%;
    position:fixed;
    background-size:100% 100%;
    opacity: 0.2;
  }
</style>