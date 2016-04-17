
;(function ( $, window, document, undefined ) {

    var pluginName = "mytab",
        defaults = {
            effect  : 'fideout',
            trigger : 'click'
        };



    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.find('a');

            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabclear"></span>');

            if (this.options.effect == 'fideout') {
             tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidefideout');
            } else if (this.options.effect == 'slide') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideleft');
            } 

            var firstdiv = this.$elem.find('.tab-con:first');
            var firstdivheight = firstdiv.find('div:first').height();

            var alldivs = this.$elem.find('div:first').find('div');

            alldivs.css({'position': 'absolute','top':'40px'});

            firstdiv.css('height',firstdivheight+'px');

            firstchild.addClass('tab_active');
            if(this.options.trigger == 'click'){
                var triggerEvent=this.options.trigger;
            }else if(this.options.trigger == 'hover'){
                var triggerEvent='mouseover';
            }
            links.bind(triggerEvent, {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = $options.effect;
                if($options.trigger == 'click'){
                    var triggerEvent=$options.trigger;
                }else if($options.trigger == 'hover'){
                    var triggerEvent='mouseover';
                }

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');


                firstdiv.addClass('transition');

                links.removeClass('tab_active');
                mythis.addClass('tab_active');
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'fideout') {
                    alldivs.removeClass('showfideout').addClass('make_transist').addClass('hidefideout');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showfideout');
                } else if (effect == 'slide') {
                    alldivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showleft');
                } 

                firstdiv.css('height',thisdivwidth+'px');

                


            });

           


         
            
        },


    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );


