(function($){

    $.fn.myTabs = function(options){

        var settings = $.extend({
            activeClass:"active",
            speed:300,
            defaultTab:0
        }, options);

        return this.each(function(){

            var container = $(this);
            var tabs = container.find(".tab-links li");
            var links = container.find(".tab-links a");
            var sections = container.find(".tab-section");

            sections.hide();
            tabs.removeClass(settings.activeClass);

            var hash = window.location.hash;

            if(hash){
                sections.hide();
                $(hash).show();
                links.each(function(){
                    if($(this).attr("href") == hash){
                        $(this).parent().addClass(settings.activeClass);
                    }
                });
            }
            else{
                sections.eq(settings.defaultTab).show();
                tabs.eq(settings.defaultTab).addClass(settings.activeClass);
            }

            links.click(function(e){
                e.preventDefault();

                var target = $(this).attr("href");

                sections.hide();
                $(target).fadeIn(settings.speed);

                tabs.removeClass(settings.activeClass);
                $(this).parent().addClass(settings.activeClass);

                window.location.hash = target;
            });

            links.keydown(function(e){

                var currentIndex = links.index(this);

                if(e.keyCode == 39){ 
                    var next = currentIndex + 1;
                    if(next >= links.length){
                        next = 0;
                    }
                    links.eq(next).focus().click();
                }

                if(e.keyCode == 37){ 
                    var prev = currentIndex - 1;
                    if(prev < 0){
                        prev = links.length - 1;
                    }
                    links.eq(prev).focus().click();
                }

            });

        });

    };

})(jQuery);