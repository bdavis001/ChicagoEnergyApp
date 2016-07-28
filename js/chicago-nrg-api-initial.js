$.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&$limit=1000&$$app_token=z6DdE5IguzIp3G6lGD3D85bH6", function(data) {
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