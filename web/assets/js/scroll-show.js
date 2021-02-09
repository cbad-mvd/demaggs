(function($) {
  
    $.fn.isVisible = function(partial) {
        var $t            = $(this);
            winInnerH     = window.innerHeight;
            viewTop       = window.scrollY;
            viewBottom    = viewTop + winInnerH;
            _top          = $t.offset().top;
            _bottom       = _top + $t.height();
            compareTop    = partial === true ? _bottom : _top;
            compareBottom = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

    $.fn.shouldBeVisible = function(partial) {
        var $t            = $(this);
            winInnerH     = window.innerHeight;
            viewTop       = window.scrollY;
            viewBottom    = viewTop + winInnerH;
            _top          = $t.offset().top;      
        return (_top <= viewBottom);
    };

  })(jQuery);
  
  $(document).ready(function () {

    var win = $(window);
    
    var allMods = $(".TextPic");
    
    allMods.each(function(i, el) {
        var el = $(el);
        if (el.shouldBeVisible(true)) {
            el.addClass("already-visible"); 
        } 
    });
    
    win.scroll(function(event) {
        
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.isVisible(true)) {
                el.addClass("motionUp"); 
            }         
        });

    });
});