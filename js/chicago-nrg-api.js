
    // initialize key arrays

    propertytypes = [];
    timeframes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    kwhtimeframes = [];
    thermstimeframes = [];
    propertysubtypes = [];
    outputdata = [];



    function hermosaData(datatype, datalist, counts, unit, title) {


        if (datatype == "Residential"){
        // Grabs Hermosa Residential Data from City of Chicago
            $.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Residential&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function (data) {
                // Parses JSON for both kwh and therms used
                parseData(data);
                renderData(datalist, counts, unit, title);
            });
        }
        else if (datatype == "Commercial"){
        // Grabs Hermosa Commercial Data from City of Chicago
            $.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Commercial&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function (data) {
                // Parses JSON for both kwh and therms used
                parseData(data);
                renderData(datalist, counts, unit, title);
            });
        // Renders selected data

        }
    }



function parseData(passeddata) {
    $.each( passeddata, function( key, val ) {
        kwhtimeframes = [val.kwh_january_2010,val.kwh_february_2010,val.kwh_march_2010,val.kwh_april_2010,val.kwh_may_2010,val.kwh_june_2010,val.kwh_july_2010,val.kwh_august_2010,val.kwh_september_2010,val.kwh_october_2010,val.kwh_november_2010,val.kwh_december_2010];
        thermstimeframes = [val.therm_january_2010,val.therm_february_2010,val.therm_march_2010,val.term_april_2010,val.therm_may_2010,val.therm_june_2010,val.therm_july_2010,val.therm_august_2010,val.therm_september_2010,val.therm_october_2010,val.therm_november_2010,val.therm_december_2010];


        for (i = 0; i < timeframes.length; i++) {

            // populates the data about kwh usage
            if (kwhtimeframes[i] > 0 && kwhtimeframes[i] || 0 && kwhtimeframes[i] !== "undefined") {

                kwhcumulative[i] += parseInt(kwhtimeframes[i]);
                kwhcounts[i]++;
            }
            // populates the data about therms usage
            if (thermstimeframes[i] > 0 && thermstimeframes[i] || 0 && thermstimeframes[i] !== "undefined") {

                thermcumulative[i] += parseInt(thermstimeframes[i]);
                thermcounts[i]++;
            }
        }


    });
}



    function renderData(whichdata, divisor, datatype, datatitle){
        console.log("rendering");
        for (i = 0; i < whichdata.length; i++) {
            console.log("Data is:" + whichdata[i]);
            outputdata[i] = parseInt(whichdata[i] / divisor[i]);
        }
        var maxval = Math.max.apply(Math,outputdata);
        $("#main--app--data--chart").append('<h3 class="main-app-data-title">' + datatitle + '</h3>');
        for (i = 0; i < timeframes.length; i++) {
            var percentage = ((outputdata[i] / maxval) * 75) + 25;
            var percentage = percentage + "%";

            console.log("Percentage:" + percentage);
            $("#main--app--data--chart").append('<div style="width:' + percentage + '" class="main--app--data--bar">' + timeframes[i] + ': ' + outputdata[i] + " " + datatype + '</div>');
            console.log("appended");
        }
    }
    $(document).ready(function(){
        
        // Function for anytime the "Update Dashboard" button is clicked
        $(".main--app-control--button").click(function(){
           processFields();


        });
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

    function processFields(){
        $("#main--app--control").addClass("collapsed");
        $("#main--app--data--chart").html("");
        //sets empty array values for each month of data
        kwhcounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        thermcounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        kwhcumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        thermcumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        dividebyself = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        var dataselect = $("input[name='datatype--select']:checked").attr("value");
        var buildingtypeselect = $("input[name='buildingtype--select']:checked").attr("value");
        var comparisonselect = $("input[name='comparisontype--select']:checked").attr("value");

        console.log("Data Select:" + dataselect);
        console.log("Building Select:" + buildingtypeselect);
        console.log("Comparison Select:" + comparisonselect);
        if (dataselect == "therms"){

            if (comparisonselect == "average"){
                hermosaData(buildingtypeselect,thermcumulative,thermcounts,"Therms",buildingtypeselect + " buildings: Average Therms per month per location");
            }
            else if (comparisonselect == "cumulative"){
                hermosaData(buildingtypeselect,thermcumulative,dividebyself,"Therms",buildingtypeselect + " buildings: Total Therms per month in Hermosa")
            }
        }
        else if (dataselect == "kWh"){
            if (comparisonselect == "average"){
                hermosaData(buildingtypeselect,kwhcumulative,kwhcounts,"kWh",buildingtypeselect + " buildings: Average kWh per month per location");
            }
            else if (comparisonselect == "cumulative"){
                hermosaData(buildingtypeselect,kwhcumulative,dividebyself,"kWh",buildingtypeselect + " buildings: Total kWh per month in Hermosa")
            }
        }
    }
    /*
    var resinfo = [];
    var cominfo = [];
    communitieslist = [];
    subtypelist = [];
    rescumulative = 0;

    comcumulative = 0;
    rescounter = 0;
    comcounter = 0;
    resinfo.push ("<h2>Residential</h2>");
    cominfo.push ("<h2>Commercial</h2>");




   $.each( data, function( key, val ) {

       communities(val);
       subtypes(val);
       if (val.building_type == "Residential") {
           //items.push( "<li id='" + key + "'>" + val.kwh_january_2010 + "</li>" );
          // console.log(rescumulative);
           if (val.kwh_january_2010 > 0){
               rescumulative += parseInt(val.kwh_january_2010);
               // console.log(rescumulative);
               rescounter++;
           }

           if (val.building_type == "Commercial") {
               //  items.push( "<li id='" + key + "'>" + val. + "</li>" );
               comcumulative += parseInt(val.kwh_january_2010);
               comcounter++;
           }
       }

   });
    var resaverage = parseInt(rescumulative / rescounter);
   $("body").append("<h2>Residential Power usage in January 2010</h2><h6>Buildings Evaluated:" + rescounter + "</h6><h6>Cumulative kwh usage:" + rescumulative + "</h6><h6>Average kwh usage: " + resaverage + "</h6><h3>Communities included</h3>" + communitieslist + "<h3>Building subtypes</h3>" + subtypelist);
});

function communities(dataset){
    //console.log(dataset.community_area_name);
    if ( communitieslist.indexOf( dataset.community_area_name ) > -1 ) {


    }
    else{
        communitieslist.push(dataset.community_area_name);
    }


}

function subtypes(dataset) {
   // console.log(dataset.building_subtype);
    if (subtypelist.indexOf(dataset.building_subtype) > -1) {


    }
    else {
        subtypelist.push(dataset.building_subtype);
    }
}

    */