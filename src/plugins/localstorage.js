import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
// Or you can specify any other name and use it via this.$ls, this.$whatEverYouWant
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})

var STORAGE_KEY = 'vue-js-todo-P7oZi9sL'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}