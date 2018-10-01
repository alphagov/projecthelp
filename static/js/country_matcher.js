function handleHover(datum){
        z = "polygon." + datum.split(' ').join('').replace(/[()]/g, '');
        d3.selectAll(z).classed("active", !d3.select(z).classed("active"));
        x = "rect." + datum.split(' ').join('').replace(/[()]/g, '');
        d3.selectAll(x).classed("active", !d3.select(x).classed("active"))
    }

$(document).ready(function() {
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    var country = ['Canada', 'United Kingdom', 'Estonia', 'Australia', 'New Zealand', 'Sweden', 'Korea ( Republic of)', 'Finland', 'Norway', 'United States of America', 'Denmark', 'Mexico', 'Belgium', 'Switzerland', 'Austria', 'Spain', 'Japan', 'Turkey', 'Netherlands', 'France', 'Ireland', 'Slovenia', 'Chile', 'Poland', 'Portugal', 'Germany', 'Italy', 'Czechia', 'Hungary', 'Greece', 'Slovakia'];

    $('#country_name').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'country',
        source: substringMatcher(country)
    }).on('typeahead:open', onOpened)
    .on('typeahead:selected', onAutocompleted)
        .on('typeahead:autocompleted', onSelected);

    function onChange($e) {
        d3.selectAll('rect').classed("active", false);
        d3.selectAll('polygon').classed("active", false);
    }

    function onOpened($e) {
        d3.selectAll('rect').classed("active", false);
        d3.selectAll('polygon').classed("active", false);
    }

    function onAutocompleted($e, datum) {
        handleHover(datum);
    }

    function onSelected($e, datum) {
        handleHover(datum);
    }
})