
<template>
  <div class="input">
    <v-icon
        small
        class="icon"
    >
      {{icon}}
    </v-icon>
    <input ref="input"
           class="input"
           :name="name"
           oninput="this.value = this.value.replace(/[^0-9]/g, '');
           this.value = this.value.replace(/(\..)\./g, '$0');"
           :type=type
           :maxlength=maxlength
           :value="value"
           @input="$emit('input', $event.target.value)"
           :disabled="disabled"
           @focus="$emit('focusInput', $event.target.focus)"
           :id="id"
    >
  </div>

</template>

<script>
export default {
  name: 'my-input',

  data(){
     return{
       focus:''
     }
  },
  props:{
    name:String,
    id:String,
    icon:{
      type:String,
      required:true,
    },
    maxlength:{
      type:String,
    },
    value:{
      type:String,
    },
    type:String,
    disabled:{
      type:Boolean,
      default: false
    },
  },
  mounted() {
    this.$refs.input.value = this.value;
  }

}

</script>

<style scoped>
.input{
  width: 100%;
}
input{
  border: 1px solid black;
  border-radius: 2px;
  width: 100%;
}
.icon {
  width: 26px;
  height: 26px;
  text-align: center;
  margin-right: -26px;
  position: relative;
  z-index: 1;
  float: left;
}
.icon + input {
  padding-left: 20px;
}

</style>