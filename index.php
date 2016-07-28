<!DOCTYPE html>
<html>
<head>
<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700|Lato:400,700,400italic' rel='stylesheet' type='text/css'>
    <link href='css/chicago-nrg-app.css' rel='stylesheet' type='text/css'>
</head>
<body>
<header class="header">
    <img src="img/chicago_logo.png" class="header__logo">
    <h3 class="header__text">Hermosa Energy Dashboard</h3>
</header>
<div class="main--app">
    <aside class="main--app--control">
        <!-- change this to handlebars later -->
        <div class="main--app--control--option datatype">
            <h3>Select Data Type</h3>
            <div class="main--app-control--datatype--select">
                <label for="therms" class="datatype-selector-button"><input type="radio" name="datatype--select" id="therms" value="therms"><span>Therm consumption</span></label>
                <label for="kwh" class="datatype-selector-button"><input type="radio" name="datatype--select" id="kwh" value="kwh"><span>kilowatt hours (kWh)</span></label>
            </div>
        </div>

        <div class="main--app--control--option" id="propertytype">
            <h3>Property Type</h3>
            <!-- property types and subtypes populate here -->
        </div>
        <div class="main--app--control--option" id="timeframe">
            <h3>Timeframe</h3>
            <!-- timeframe options populate here -->
        </div>
    </aside>
    <section class="main--app--data">
        <div id="main--app--data--chart"></div>
    </section>
</div>


<script src="https://code.jquery.com/jquery-3.1.0.js" type="application/javascript"></script>
<script src="js/chicago-nrg-api.js" type="application/javascript"></script>
</body>
</html>

