/*
 Tyler Miller
 AVF 1309
 Week One Demo App
 Sept. 8, 2013
 */

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $("#camButton").on("click", camInit);
    $("#instagram").on("pageinit", instagramLoad);
    $("#geo").on("pageinit", geoFun);
    $("#weather").on("pageinit", weatherData);
    $("#netBtn").on("click", netFun);
    $("#conBtn").on("click", contactFun);
    $("#noteBtn").on("click", noteFun);
    //etc...    
}; // phonegap deviceready

$('#streamRefresh').on("click", function(){//should clear all page contents
                            //alert("Refresh");
                            $('#imageOutput').empty();                            
                            instagramLoad();
                            
                            
});

var instagramLoad = function(){
//alert("instagramLoad");
    var tag = "liftedtrucks",
        urlData = "https://api.instagram.com/v1/tags/"+ tag +"/media/recent?callback=?&amp;client_id=608a30958bfc4d96ba6e9d6ed8198670";
        
        //$('#imageOutput').empty();//should clear all page contents
            $.getJSON(urlData, instaOutput);
            
                                

};

    var instaOutput = function(info){
        console.log(info);
        
        //<img src="{url}" alt="{caption}" /><p>{caption}</p><p>{username}, <h4>{user}</h4></p>
        $.each(info.data, function(index, photo){
            var pic = $(
            "<li class='picBox'><img src='" + photo.images.standard_resolution.url + "' class='img' alt='" + photo.user.id +
             "'/><h4>" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>"
            );
            
             
            
            $("#imageOutput").append(pic);
        
        $("#loadMessage").html("<h2>Lifted Trucks have been loaded!</h2>");
        
        
        
        
        
        });
    };

var weatherData = function(){

$('#weatherRefresh').on("click", function(){//should clear all page contents
        
                            //alert('Refresh');
							$('#weatherOutput').empty();                            
                            weatherData();

});

    $.ajax({
        url: "http://api.wunderground.com/api/28c819b00021bff1/geolookup/forecast/q/MI/Hope.json",
        
        dataType: "jsonp",
        success : function(weatherInfo){


            var forcast = weatherInfo['forecast']['simpleforecast']['forecastday'];
            //var current = weatherInfo['conditions'];
            var displayWeather = $(
            //"<li class='weatherOut'>Current Temp: " + current[0]['temp_f'] + "</li>" +
            "<li>High: " + forcast[0]['high']['fahrenheit'] + ' Fahrenheit' + "</li>" +
            "<li>Low: " + forcast[0]['low']['fahrenheit'] + ' Fahrenheit' + "</li>"+
            "<li>Average Humidity: " + forcast[0]['avehumidity'] + '%' + "</li>"+
            "<li>Max Humidity: " + forcast[0]['maxhumidity'] + '%' + "</li>"+
            "<li>Minimum Humidity: " + forcast[0]['minhumidity'] + '%' + "</li>"+
            "<li>Wind Direction: " + forcast[0]['avewind']['dir'] + "</li>" +
            "<li>Conditions: " + forcast[0]['conditions'] + "</li>" +
            "<li>Max wind Speed: " + forcast[0]['maxwind']['mph']+' Mph' + "</li>" +
            "<li>Average Wind Speed: " + forcast[0]['avewind']['mph']+' Mph' + "</li>" 
            
            
                        );
                        
            $('#weatherOutput').empty();//makes sure new resluts load
            
            $("#weatherOutput").append(displayWeather);
            
            
            $("#weatherMessage").html("<h2>Weather for " + forcast[0]['date']['weekday_short'] + ", " + forcast[0]['date']['monthname'] + " " + forcast[0]['date']['day']);
        }

    });  

};        

    //Function to open camera 
var camInit = function(){

    navigator.camera.getPicture( cameraSuccess, cameraError, { quality: 100,
        saveToPhotoAlbum: true  } );

    
        
};

//Success function 
function cameraSuccess() {
    alert("Your Image Has Been Saved!");
};

//Fail function 
function cameraError() {
    alert("No Picture Was Taken");
};

var geoFun = function(){

$('#geoRefresh').on("click", function(){//should clear all page contents
        
                            //alert('Refresh');
							$('#geoOutput').empty();                            
                            geoFun();

});


navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
                                       
    
};

var geoSuccess =  function(position) {



        var geoData = $(     
                            "<li>Latitude: "           + position.coords.latitude              + "</li>" +
                            "<li>Longitude: "           + position.coords.longitude             + "</li>" +
                            "<li>Altitude:  "          + position.coords.altitude              + "</li>" +
                            "<li>Accuracy:  "          + position.coords.accuracy              + "</li>" +
                            "<li>Altitude Accuracy: "  + position.coords.altitudeAccuracy      + "</li>" +
                            "<li>Heading: "            + position.coords.heading               + "</li>" +
                            "<li>Speed: "              + position.coords.speed                 + "</li>" +
                            "<li>Timestamp:"           + position.timestamp                    + "</li>" 
                            ); 
                            
                            $('#geoOutput').empty();//makes sure new resluts load                          
                            
                            $("#geoOutput").append(geoData);
                            
                            $("#geoInfo").html("<h2>GEO info has been loaded!</h2>");
    };

    // onError Callback receives a PositionError object
    
   var geoError = function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    };
    

//network connection check
var netFun = function(){
    
    var netStatus = navigator.connection.type;
    
    var status = {};
    
    status[Connection.UNKNOWN]  = 'Unknown connection';
    status[Connection.ETHERNET] = 'Ethernet connection';
    status[Connection.WIFI]     = 'WiFi connection';
    status[Connection.CELL_2G]  = 'Cell 2G connection';
    status[Connection.CELL_3G]  = 'Cell 3G connection';
    status[Connection.CELL_4G]  = 'Cell 4G connection';
    status[Connection.CELL]     = 'Cell generic connection';
    status[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + status[netStatus]);
    
    

};


var contactFun = function(){
 
    
    var createCon = navigator.contacts.create({"displayName": 
        $("#conName").val()
        
        });
        
        createCon.phoneNumber = $("#conNum").val();
        createCon.email = $("#conEmail").val();
        createCon.note =$("#conNote").val();
        
        var contactDisplay = $(
        
            "<li>Contact Name: " + createCon.displayName + "</li>" +
            "<li>Contact Phone Number: " + createCon.phoneNumber + "</li>" +
            "<li>Contact Email: " + createCon.email + "</li>" +
            "<li>Contact Notes: " + createCon.note + "</li>" 
            
            
        
        );
        
        
        
        $("#contactInfoDisplay").append(contactDisplay);
        
       
        
        
        
        // save to device
        var saveCon = createCon.save(onSaveSuccess, onSaveError);
        
        
        // onSaveSuccess: Get a snapshot of the current contacts
        
        function onSaveSuccess(createCon) {
        alert("Contact was Saved!");
        
 
    }
    
    /* doesn't work
    var onSaveSuccess = function(createCon) {
        alert("Contact was Saved!");
    }
*/

        // onSaveError: Failed to get the contacts
        
        function onSaveError(contactError) {
        alert("Error = " + contactError.code);
        
        
    }
    
    /*doesn't work
    var onSaveError = function(contactError) {
        alert("Error = " + contactError.code);
    }
*/


	$('form').submit(function(event) {
    event.preventDefault();
    
});
    
           $( '#contactForm' ).each(function(){this.reset();
    });
    
   
    
};

    var noteFun = function(){
    
    var missed = function(){
        alert("Nice wasn't it?");
    };
    
    var dialogNote = navigator.notification.alert(
    "Look at that truck!", 
    missed, 
    "Sir", 
    "Done"
    );
    
            

    
    

};
    
