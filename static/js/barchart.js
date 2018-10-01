var BarChart = {
    draw: function(id, d, xTitle) {
        var xtitle = xTitle;
        data = d;
        //Store width, height and margin in variables
        var w = 500;
        var h = 500;
        var margin = {
            top: 50,
            right: 20,
            bottom: 20,
            left: 150
        };
        // Scale the width and height
        var xScale = d3.scale.linear()
            .range([0, w - (margin.right + margin.left)]);

        var yScale = d3.scale.ordinal()
            .rangeRoundBands([margin.top, h - margin.bottom], 0.45);

        var Format = d3.format(".3n");
        // Creat Axes i.e. xAxis and yAxis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        // Create SVG
        var barchart = d3.select(id)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 -50 650 1");

        // Entering data
        data.sort(function(a, b) {
            return d3.descending(+a.Overall, +b.Overall)
        });
        //Setting a dynamic domain for the xScale based on Data
        xScale.domain([
            0, d3.max(data, function(d) {
                return +d.Overall;
            })
        ]);

        //Setting a dynamic domain for the yScale based on Data
        yScale.domain(data.map(function(d) {
            return d.Country;
        }));

        //Rendering the xAxis
        barchart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + (margin.left + 65) + "," + (h - margin.top + 30) + ")")
            .call(xAxis);

        //Rendering the yAxis
        barchart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left + 65) + ",0)")
        // Moving the axis to fit in country names
        .call(yAxis)
            .append("text")
            .attr("x", margin.left - 50)
            .attr("y", margin.top)
            .style("font-size", "14")
            .style("text-anchor", "start")
            .text(xtitle);


        // Rendering the rectangles
        var rects = barchart.selectAll("rect")
            .data(data)
            .enter()
            .append("rect");

        rects.attr("x", margin.left + 65)
            .attr("y", function(d, i) {
                return yScale(d.Country);
            })
            .attr("width", function(d) {
                return xScale(+d.Overall);
            })
            .attr("height", yScale.rangeBand)
            .attr("class", function(d) {
                return "" + d.Country.split(' ').join('').replace(/[()]/g, '')
            })
            .append("title")
            .text(function(d) {
                return d.Country + "'s overall result is " + Format(d.Overall) + "";

            })

        //rollover functionality
        barchart.selectAll("rect")
            .on("click", function(d) {
                element = d3.select(this).attr("class").split(' ').join('').replace(/[()]/g, '');
                z = 'rect.' + element;
                d3.selectAll("rect").classed('active', false);
                d3.selectAll("polygon").classed('active', false);
                d3.selectAll(z).classed("active", true);
                t = 'polygon.' + element;
                d3.selectAll(t).classed("active", true);
            })
//            .on('mouseout', function(d) {
//                d3.selectAll("rect").classed('active', false);
//                d3.selectAll("polygon").classed('active', false);
//            })
        ;
    }
};