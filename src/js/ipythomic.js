/* Load processing.js in the notebook. */
IPython.load_extensions("processing.min");

require(["widgets/js/widget"], function(WidgetManager) {
    /* Define the MicrophoneWidget */
    var MicrophoneWidget = IPython.DOMWidgetView.extend({
        render: function() {
            /*** HTML ***/
            /* Canvas */
            this.$canvas = $('<canvas width="900" height="500" />')
                .attr('id', 'canvas')
                .attr('tabindex', '1')
                .appendTo(this.$el);

            /* Radio inputs */
            this.$graphLine = $('<input type="radio" id="lines" />')
                .attr('name', 'gType')
                .attr('checked', 'checked')
                .attr('onclick', 'window.graphType = "lines";')
                .attr('tabindex', '1')
                .appendTo(this.$el);

            this.$graphBar = $('<input type="radio" id="bars" />')
                .attr('name', 'gType')
                .attr('onclick', 'window.graphType = "bars";')
                .attr('tabindex', '1')
                .appendTo(this.$el);

            /*** SCRIPT ***/
            /* Constants */
            var WIDTH = this.$canvas[0].width;
            var HEIGHT = this.$canvas[0].height;
            var BARS = 50;
            var SPACE = WIDTH / BARS;

            /* Array contains mic signal level */
            this.micArray = new Array();
            for (var i = 0; i < BARS; i++)
                this.micArray[i] = 0;

            window.graphType = "lines";

            /* Use processingjs for drawing */
            function Visualization(processing) {
                processing.size(WIDTH, HEIGHT);

                processing.draw = function(micArray, thickness, background) {
                    processing.strokeWeight(thickness);
                    if (micArray != null) {
                        /* Clear the screen */
                        processing.background(background);
                        if (window.graphType === "lines") {
                            /* Draw delta = yleft - yprevious */
                            for (var i = 0; i < WIDTH - SPACE; i += SPACE)
                                processing.line(i + thickness,
                                    HEIGHT - micArray[i / SPACE],
                                    i + thickness,
                                    HEIGHT - micArray[i / SPACE + 1]);
                        } else if (window.graphType === "bars") {
                            for (i = 0; i < WIDTH; i += SPACE)
                                processing.line(i + thickness,
                                    HEIGHT,
                                    i +thickness,
                                    HEIGHT - micArray[i / SPACE]);
                        }
                    }
                }
            }

            this.graph = new Processing(this.$canvas[0], Visualization);
        },

        update: function() {
            /* Update value */
            var level = this.model.get('value');
            this.micArray.shift();
            this.micArray.push(level);
            this.graph.draw(this.micArray,
                            this.model.get('thickness'),
                            this.model.get('background'));
        },
    });

    /* Register the MicrophoneWidget with the widget manager. */
    WidgetManager.register_widget_view('MicrophoneWidget', MicrophoneWidget);
});
