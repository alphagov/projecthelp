//Original radar from https://github.com/alangrafu/radar-chart-d3
//Updated radar code taken from http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html

var RadarChart = {
    draw: function (id, d, options) {
        var cfg = {
            radius: 5,
            w: 400,
            h: 400,
            factor: 1,
            factorLegend: .85,
            levels: 4,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.0,
            opacityAreaHover: 0.05,
            stroke: 1,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 50,
            ExtraWidthY: 50,
            color: d3.scale.linear()
                .domain([0, 1])
                .range(["grey", "grey"])
        };

        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) {
            return d3.max(i.map(function (o) {
                return o.value;
            }))
        }));

        var allAxis = (d[0].map(function (i, j) {
            return i.axis
        }));
        var total = allAxis.length;
        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        var Format = d3.format(".2n");
        d3.select(id).select("svg").remove();

        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w + cfg.ExtraWidthX)
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 -50 600 1")
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");;

        var tooltip;

        //Circular segments
        for (var j = 0; j < cfg.levels - 1; j++) {
            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function (d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("y1", function (d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("x2", function (d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
                })
                .attr("y2", function (d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
                })
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.2px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
        }

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = 0,
                    tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }

        //Text indicating at what number each level is
        for (var j = 0; j < cfg.levels - 1; j++) {
            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data([1]) //dummy data
                .enter()
                .append("svg:text")
                .attr("x", function (d) {
                    return levelFactor * (1 - cfg.factor * Math.sin(0));
                })
                .attr("y", function (d) {
                    return levelFactor * (1 - cfg.factor * Math.cos(0));
                })
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "11px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
                .attr("fill", "#737373")
                .text(Format((j + 1) * cfg.maxValue / cfg.levels))
        }

        series = 0;

        // Create radar legend
        var lgw = 450,
            lgh = 500;

        var colorscale = d3.scale.linear()
            .domain([0, 1])
            .range(["#00008b", "#f442ce"]);

        ////Legend titles
        var LegendOptions = ['Selected country', 'Average'];

        //Create the title for the legend
        var text = g.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(0,-30)')
            .attr("x", lgw - 65)
            .attr("y", 0)
            .attr("font-size", "12px")
            .attr("fill", "#404040")
            .text("Legend");

        //Initiate Legend
        var legend = g.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 200)
            .attr('transform', 'translate(0,-20)');

        //Create colour squares
        legend.selectAll('rect')
            .data(LegendOptions)
            .enter()
            .append("rect")
            .attr("x", lgw - 65)
            .attr("y", function (d, i) {
                return i * 20;
            })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
                return colorscale(i);
            });

        //Create text next to squares
        legend.selectAll('text')
            .data(LegendOptions)
            .enter()
            .append("text")
            .attr("x", lgw - 52)
            .attr("y", function (d, i) {
                return i * 20 + 9;
            })
            .attr("font-size", "12px")
            .attr("fill", "#737373")
            .text(function (d) {
                return d;
            });


        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w / 2)
            .attr("y1", cfg.h / 2)
            .attr("x2", function (d, i) {
                return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
            })
            .attr("y2", function (d, i) {
                return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
            .attr("class", "line");

        axis.append("text")
            .attr("class", "legend")
            .text(function (d) {
                return d
            })
            .attr("text-anchor", "top")
            .attr("dy", "1.5em")
            .attr("transform", function (d, i) {
                return "translate(-30,-15)"
            })
            .attr("x", function (d, i) {
                return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 50 * Math.sin(i * cfg.radians / total);
            })
            .attr("y", function (d, i) {
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
            })
            .call(wrap, 40);;




        d.forEach(function (y, x) {
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function (j, i) {
                    dataValues.push([
                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "" + y[0].name.split(' ').join('').replace(/[()]/g, ''))
                .attr("points", function (d) {
                    var str = "";
                    for (var pti = 0; pti < d.length; pti++) {
                        str = str + d[pti][0] + "," + d[pti][1] + " ";
                    }
                    return str;
                })
                .on('mouseover', function (d) {
                    element = d3.select(this).attr("class").split(' ').join('').replace(/[()]/g, '')
                    z = 'rect.' + element;
                    d3.selectAll(z).classed("active", true);
                    t = 'polygon.' + element;
                    d3.selectAll(t).classed("active", true);
                    newX = 50;
                    newY = 50;
                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .attr("class", "tooltip")
                        .text(d.Country)
                        .transition(200)
                        .style('opacity', 1);
                })
                .on('mouseout', function () {
                    d3.selectAll("rect").classed('active', false);
                    d3.selectAll("polygon").classed('active', false);
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                });
            series++;
        });
        series = 0;


        d.forEach(function (y, x) {
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "" + y[0].name.split(' ').join(''))
                .attr("alt", function (j) {
                    return Math.max(j.value, 0)
                })
                .attr("cx", function (j, i) {
                    dataValues.push([
                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                    return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("cy", function (j, i) {
                    return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("data-id", function (j) {
                    return j.axis
                })
                .append("svg:title")
                .text(function (j) {
                    return Math.max(j.value, 0)
                });

            series++;
        });


        //Tooltip
        tooltip = g.append('text');
    }
};