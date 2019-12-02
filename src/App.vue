<template>
  <div class="app">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="left">
        <el-checkbox v-model="item.checkAll"
        @change="handleallFlag(item.id, $event)"
        >{{item.title}}</el-checkbox>
      </div>
      <div class="right">
        <span v-for="item in item.list" :key="item.id"  
        :class="item.flag?'active':''"
        @click="handleCheckAllChange(item.id)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.data;
    }
  },
  components: {},
  methods: {
    handleCheckAllChange(id) {
      this.$store.commit({type:'setridioFlag',id:id})
      
    },
    handleallFlag(id, checked){
      this.$store.commit({type:'allFlag',id, checked})
    }
  },
  updated(){
    this.$store.dispatch({type:'setdata'})
  },
  created() {
    this.$store.dispatch({ type: "changeFlag" });
  }
};
</script>

<style scoped lang='scss'>
.item {
  display: flex;
  margin: 10px;
  line-height: 25px;
  .left {
    margin-right: 10px;
  }
  .right {
    span {
      display: inline-block;
      margin: 0 5px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 1px solid #000;
      text-align: center;
      line-height: 25px;
      &.active {
        background: #f00;
      }
    }
  }
}
</style>