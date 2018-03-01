<template>
  <div id="app">
    <app-header></app-header>
      <div class="container">
           <router-view/>
        <!-- <transition name="fade" mode="out-in">
       
        </transition> -->
      </div>
    <app-footer></app-footer>
    <app-go-to-top></app-go-to-top>
    <app-menu-footer></app-menu-footer>
  </div>
</template>

<script>
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import GoToTop from '@/components/footer/GoToTop';
import MenuFooter from '@/components/partials/menu_footer'
export default {
  name: 'App',
  components: {
    'AppHeader' : Header,
    'AppFooter' : Footer,
    'AppGoToTop': GoToTop,
    'AppMenuFooter': MenuFooter
  }
}
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity 2s ease;
  opacity: 0;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
