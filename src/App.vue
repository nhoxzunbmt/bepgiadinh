<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
    <app-go-to-top></app-go-to-top>
  </div>
</template>

<script>
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import GoToTop from '@/components/footer/GoToTop';
export default {
  name: 'App',
  components: {
    'AppHeader' : Header,
    'AppFooter' : Footer,
    'AppGoToTop': GoToTop
  }
}
</script>

<style>
</style>
