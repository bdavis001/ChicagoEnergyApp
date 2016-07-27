$.getJSON("https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa", function(data) {
    var resinfo = [];
    var cominfo = [];
    rescumulative = 0;

    comcumulative = 0;
    rescounter = 0;
    comcounter = 0;
    resinfo.push ("<h2>Residential</h2>");
    cominfo.push ("<h2>Commercial</h2>");
   $.each( data, function( key, val ) {

       if (val.building_type == "Residential") {
           //items.push( "<li id='" + key + "'>" + val.kwh_january_2010 + "</li>" );
           console.log(rescumulative);
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
   $("body").append("<h2>Residential Power usage in January 2010</h2><h6>Buildings Evaluated:" + rescounter + "</h6><h6>Cumulative kwh usage:" + rescumulative + "</h6><h6>Average kwh usage: " + resaverage + "</h6>");
});