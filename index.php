<!DOCTYPE html>
<html>
<head>
    <script src="https://use.fortawesome.com/4ff47a2e.js"></script>
<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700|Lato:400,700,400italic' rel='stylesheet' type='text/css'>
    <link href='css/chicago-nrg-app.css' rel='stylesheet' type='text/css'>
</head>
<body>
<header class="header">
    <img src="img/chicago_logo.png" class="header__logo">
    <h3 class="header__text">Hermosa Energy Dashboard</h3>
</header>
<div class="main--app">
    <aside class="main--app--control collapsed" id="main--app--control">
        <!-- change this to handlebars later -->
        <div class="main--app-control--mobile--menu">Dashboard Options <i class="fa fa-bars"></i></div>
        <div class="main--app--control--option datatype">
            <h3 class="main--app--control--datatype--title">Select Data Type</h3>
            <div class="main--app-control--datatype--select">
                <label for="therms" class="datatype-selector-button"><input type="radio" name="datatype--select" id="therms" value="therms"><span>Therm consumption</span></label>
                <label for="kwh" class="datatype-selector-button"><input type="radio" name="datatype--select" id="kwh" value="kWh"><span>kilowatt hours (kWh)</span></label>
            </div>
        </div>

        <div class="main--app--control--option" id="propertytype">
            <h3 class="main--app--control--datatype--title">Property Type</h3>
            <div class="main--app-control--datatype--select">
                <label for="commercial" class="datatype-selector-button"><input type="radio" name="buildingtype--select" id="commercial" value="Commercial"><span>Commercial</span></label>
                <label for="residential" class="datatype-selector-button"><input type="radio" name="buildingtype--select" id="residential" value="Residential"><span>Residential</span></label>
            </div>
        </div>
        <div class="main--app--control--option" id="dataoutputtype">
            <h3 class="main--app--control--datatype--title">Comparison</h3>
            <div class="main--app-control--datatype--select">
                <label for="average" class="datatype-selector-button"><input type="radio" name="comparisontype--select" id="average" value="average"><span>Average</span></label>
                <label for="cumulative" class="datatype-selector-button"><input type="radio" name="comparisontype--select" id="cumulative" value="cumulative"><span>Cumulative</span></label>
            </div>
        </div>
        <div class="main--app--control--option" id="timeframe">
            <div class="main--app-control--button">Update Dashboard</div>
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

