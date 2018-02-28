<template>
  <div id="app">
    <app-header></app-header>
      <div class="container">
        <router-view/>
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
</style>
