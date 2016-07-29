// City of Chicago Hermosa Dashboard - Build 1.0 - 7/28/2016
// Copyright 2016 Ben Davis

    // initialize key arrays
    propertytypes = [];
    timeframes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    kwhtimeframes = [];
    thermstimeframes = [];
    propertysubtypes = [];
    outputdata = [];

    // gathers data from the City of Chicago API and triggers parsing and rendering
    function hermosaData(datatype, datalist, counts, unit, title) {

        if (datatype == "Residential"){
        // Grabs Hermosa Residential Data from City of Chicago
            $.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Residential&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function (data) {
                // Parses JSON for both kwh and therms used
                parseData(data);
                // Renders selected residential data
                renderData(datalist, counts, unit, title);
            });
        }
        else if (datatype == "Commercial"){
        // Grabs Hermosa Commercial Data from City of Chicago
            $.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Commercial&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function (data) {
                // Parses JSON for both kwh and therms used
                parseData(data);
                // Renders selected commercial data
                renderData(datalist, counts, unit, title);
            });
        }
    }

    // Parses JSON data passed from hermosadata()
    function parseData(passeddata) {
        $.each( passeddata, function( key, val ) {
            // JSON keys for monthly data for both therms and kwh
            kwhtimeframes = [val.kwh_january_2010,val.kwh_february_2010,val.kwh_march_2010,val.kwh_april_2010,val.kwh_may_2010,val.kwh_june_2010,val.kwh_july_2010,val.kwh_august_2010,val.kwh_september_2010,val.kwh_october_2010,val.kwh_november_2010,val.kwh_december_2010];
            thermstimeframes = [val.therm_january_2010,val.therm_february_2010,val.therm_march_2010,val.term_april_2010,val.therm_may_2010,val.therm_june_2010,val.therm_july_2010,val.therm_august_2010,val.therm_september_2010,val.therm_october_2010,val.therm_november_2010,val.therm_december_2010];

            for (i = 0; i < timeframes.length; i++) {

                // determines cumulative values for kwh usage for each month and how many entries and stores each in an set of paired arrays
                if (kwhtimeframes[i] > 0 && kwhtimeframes[i] || 0 && kwhtimeframes[i] !== "undefined") {

                    kwhcumulative[i] += parseInt(kwhtimeframes[i]);
                    kwhcounts[i]++;
                }
                // determines cumulative values for therms usage for each month and how many entries and stores each in an set of paired arrays
                if (thermstimeframes[i] > 0 && thermstimeframes[i] || 0 && thermstimeframes[i] !== "undefined") {

                    thermcumulative[i] += parseInt(thermstimeframes[i]);
                    thermcounts[i]++;
                }
            }
        });
    }

    // renders a bar graph of data about monthly use of datatype for all of the months of data in 2010.
    function renderData(whichdata, divisor, datatype, datatitle){

        for (i = 0; i < whichdata.length; i++) {
            outputdata[i] = parseInt(whichdata[i] / divisor[i]);
        }
        //finds the month with the highest value
        var maxval = Math.max.apply(Math,outputdata);

        $("#main--app--data--chart").append('<h3 class="main-app-data-title">' + datatitle + '</h3>');

        // Determines the percentage of width of the available space for each bar in the graph as a comparison to the largest
        for (i = 0; i < timeframes.length; i++) {
            var percentage = ((outputdata[i] / maxval) * 70) + 30;
            var percentage = percentage + "%";
            if (outputdata[i] == maxval){
                $("#main--app--data--chart").append('<div style="width:' + percentage + '" class="main--app--data--bar max-val">' + timeframes[i] + ': ' + outputdata[i] + " " + datatype + '</div>');
            }
            else {
                $("#main--app--data--chart").append('<div style="width:' + percentage + '" class="main--app--data--bar">' + timeframes[i] + ': ' + outputdata[i] + " " + datatype + '</div>');
            }
        }
    }
    // On load do this
    $(document).ready(function(){
        
        // Click function for anytime the "Update Dashboard" button is clicked
        $(".main--app-control--button").click(function(){
           processFields();
        });
        // Click function for mobile/tablet dashboard control collapse/show
        $(".main--app-control--mobile--menu").click(function(){
            if ($("#main--app--control").hasClass("collapsed")){
                $("#main--app--control").removeClass("collapsed");
            }
            else {
                $("#main--app--control").addClass("collapsed");
            }
        });
        
        processFields();
    });
    // Processes field inputs
    function processFields(){
        $("#main--app--control").addClass("collapsed");
        $("#main--app--data--chart").html("");
        //sets empty array values for each month of data
        kwhcounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        thermcounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        kwhcumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        thermcumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        dividebyself = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        // gathers values of field inputs
        var dataselect = $("input[name='datatype--select']:checked").attr("value");
        var buildingtypeselect = $("input[name='buildingtype--select']:checked").attr("value");
        var comparisonselect = $("input[name='comparisontype--select']:checked").attr("value");

        // determines parsing and rendering parameters
        if (dataselect == "therms"){

            if (comparisonselect == "average"){
                hermosaData(buildingtypeselect,thermcumulative,thermcounts,"Therms",buildingtypeselect + " properties: Average Therms per month per location");
            }
            else if (comparisonselect == "cumulative"){
                hermosaData(buildingtypeselect,thermcumulative,dividebyself,"Therms",buildingtypeselect + " properties: Total Therms per month in Hermosa")
            }
        }
        else if (dataselect == "kWh"){
            if (comparisonselect == "average"){
                hermosaData(buildingtypeselect,kwhcumulative,kwhcounts,"kWh",buildingtypeselect + " properties: Average kWh per month per location");
            }
            else if (comparisonselect == "cumulative"){
                hermosaData(buildingtypeselect,kwhcumulative,dividebyself,"kWh",buildingtypeselect + " properties: Total kWh per month in Hermosa")
            }
        }
    }