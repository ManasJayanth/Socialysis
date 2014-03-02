define(['d3Cloud', 'jQuery'], function () {

    var renderWordCloud = function () {
        var containerId = '#wordcloud';
        d3.json('/javascripts/wordcloud-data.json', function(dataset) {
            
            var fill = d3.scale.category20();

            d3.layout.cloud().size([600, 600])
                .words(dataset.map(function(d) {
                    return {text: d.word, size: d.count};
                }))
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();

            function draw(words) {
                $(containerId).html('');
                d3.select(containerId)
                    .style('border', '1px solid gray')
                    .append("svg")
                    .attr("width", 600)
                    .attr("height", 600)
                    .append("g")
                    .attr("transform", "translate(300,300)") //Idk why (300, 300)
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
            }
        });
    };

    return {
        render: renderWordCloud
    }  
});
