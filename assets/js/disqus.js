  // Lazy Loading Disqus
  //   // http://jsfiddle.net/dragoncrew/SHGwe/1/
   var ds_loaded = false,
      top = $('#disqus_thread').offset().top;
  window.disqus_shortname = $('#disqus_thread').attr('name');

  function check() {
    if ( !ds_loaded && container.scrollTop() + container.height() > top ) {
      $.ajax({
        type: 'GET',
        url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
        dataType: 'script',
        cache: true
      });
      ds_loaded = true;
    }
  }check();
  container.scroll(check);
}afterPjax();
