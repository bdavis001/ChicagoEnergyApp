
    // initialize key arrays
    propertytypes = [];
    timeframes = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    kwhtimeframes = [];
    thermstimeframes = [];
    propertysubtypes = [];
    
    // Grabs Hermosa Data from City of Chicago
    $.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function(data) {
    console.log("got JSON");
        //sets empty array values for each month of data
        kwhcounts = [0,0,0,0,0,0,0,0,0,0,0,0];
        thermcounts = [0,0,0,0,0,0,0,0,0,0,0,0];
        kwhcumulative = [0,0,0,0,0,0,0,0,0,0,0,0];
        thermcumulative = [0,0,0,0,0,0,0,0,0,0,0,0];
        // Parses JSON for both kwh and therms used
    parseData(data);

        console.log(kwhcumulative);
        console.log(kwhcounts);
        console.log(thermcumulative);
        console.log(thermcounts);


    });





function parseData(passeddata) {
    $.each( passeddata, function( key, val ) {
        kwhtimeframes = [val.kwh_january_2010,val.kwh_february_2010,val.kwh_march_2010,val.kwh_april_2010,val.kwh_may_2010,val.kwh_june_2010,val.kwh_july_2010,val.kwh_august_2010,val.kwh_september_2010,val.kwh_october_2010,val.kwh_november_2010,val.kwh_december_2010];
        thermstimeframes = [val.therm_january_2010,val.therm_february_2010,val.therm_march_2010,val.term_april_2010,val.therm_may_2010,val.therm_june_2010,val.therm_july_2010,val.therm_august_2010,val.therm_september_2010,val.therm_october_2010,val.therm_november_2010,val.therm_december_2010];

        createSelector("building_type","#propertytype", propertytypes,val.building_type);
        for (i = 0; i < timeframes.length; i++) {

        //console.log(kwhtimeframes[i]);
            if (kwhtimeframes[i] > 0 && kwhtimeframes[i] || 0 && kwhtimeframes[i] !== "undefined") {
                //console.log(parseInt(kwhtimeframes[i]));
                kwhcumulative[i] += parseInt(kwhtimeframes[i]);
                kwhcounts[i]++;
            }
            if (thermstimeframes[i] > 0 && thermstimeframes[i] || 0 && thermstimeframes[i] !== "undefined") {
                //console.log(parseInt(kwhtimeframes[i]));
                thermcumulative[i] += parseInt(thermstimeframes[i]);
                thermcounts[i]++;
            }
        }

       // monthlyData()
        //createSelector("building_type","#propertytype", propertytypes,val.building_type);
    });
}



function createSelector(contenttype,contentblock,arraylist,jsondata) {
    // console.log(dataset.building_subtype);

    if (arraylist.indexOf(jsondata) > -1) {
       // console.log("no match");
    }
    else {
        arraylist.push(jsondata);
        //console.log(jsondata);
        $(contentblock).append('<input type="checkbox" name="' + jsondata + '" id="' + jsondata + '"/><label for="' + jsondata + '">' + jsondata + '</label>');
    }
}
    function renderData(){
        Math.max.apply(Math,kwhcumulative); // 3
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