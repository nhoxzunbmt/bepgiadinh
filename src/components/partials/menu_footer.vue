<template>
    <div class="menu_footers">
    <b-nav>
        <b-nav-item v-for="menu in menu_footers" :key="menu.id" class="item" :active="menu.active" :to="menu.url">
            {{ menu.name }}
        </b-nav-item>
    </b-nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menu_footers: [
        {
          id: 1,
          name: "Hôm nay",
          icon: "",
          active: true,
          url: 'category'
        },
        {
          id: 2,
          name: "Cần xem",
          icon: "",
          active: false,
          url: ''
        },
        {
          id: 3,
          name: "Cần làm",
          icon: "",
          active: false,
          url: ''
        },
        {
          id: 4,
          name: "Ứng dụng",
          icon: "",
          active: false,
          url: ''
        },
        {
          id: 5,
          name: "Cộng đồng",
          icon: "",
          active: false,
          url: ''
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
    .menu_footers{
        background-color:#6dcef5;
        position: fixed;
        bottom: 0;
        left:0;
        .nav-link{
            color:#cbedfb;
        }
    }
</style>  