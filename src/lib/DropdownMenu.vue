<template>
    <div class="dropdown-menu" v-if="show_menu">
      <ul>
        <li v-for="item in items" :key="item.id" @click="handleClick(item)">
            teste
          {{ item.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      show_menu : Boolean
    },
    data() {
      return {
        show: true,
      };
    },
    methods: {
      handleClick(item) {
        this.$emit("click", item);
        this.show = false;
      },
    },
    watch : {
        show_menu(value){
            alert(value)
        }
    }
  };
  </script>
  
  <style>
  .dropdown-menu {
    position: relative;
    display: inline-block;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    min-width: 120px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  li {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  li:hover {
    background-color: #f1f1f1;
  }
  </style>
  