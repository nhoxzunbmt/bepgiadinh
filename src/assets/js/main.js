(function (window, $) {

  $('#off-canvas-left-o').mmenu({
    // options
    'pageScroll': true,
    'navbar': { 'title': 'DANH MỤC' },
    'offCanvas': {
      'position': 'left',
      'zposition': 'front'
    },
    'extensions': ['pagedim-black', 'effect-listitems-drop', 'shadow-page']
  }, {
    // configuration
    clone: true
  });
})(window, jQuery);
//# sourceMappingURL=main.js.map
