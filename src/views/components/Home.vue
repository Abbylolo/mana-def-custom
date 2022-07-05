<template>
  <div id="building"> 
  </div>
  <h1>首页&nbsp;/&nbsp;审核人</h1>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :header-cell-style="{fontSize:'16px'}"
    >
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
        tableData:[]
      }
    },
    created(){
        this.getReviewerData();
    },
    methods:{
        getReviewerData(){
            this.$api.get('/reviewer/queryReviewer',{
              params:{
                reviewerId:'RV000001',
                reviewerName:'',
                reviewerSex:'',
                reviewerIdCard:'',
                reviewerTel:'',
                reviewerEmail:'',
                startTime:'',
                endTime:''
              }
            }).then( res =>{
              this.tableData=res.data.data;
              console.log(this.tableData)
           })
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