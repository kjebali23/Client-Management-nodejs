
//Currently not linked to the index ejs page

$( "#sms" ).on( "click", function() {
    var request ={
        "url":'http://localhost:3000/sms',
        "method":"GET",
    }
    $.ajax(request).done(function(response){
        console.log("sent successfully");
    })
});
$( "#sms" ).trigger( "click" );