$("#add_user").submit(function(event){
    alert("Data inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })

    console.log(data.id);

    var request = {
        "url":`https://node-js-transporter.herokuapp.com/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})

if(window.location.pathname == "/"){
    $ondelete = $('.table tbody td a.delete')
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var request = {
            "url":`https://node-js-transporter.herokuapp.com/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Are you sure you want do delete?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted successfully");
                location.reload()
            }) 
        }

    })
}

$('#sms').click(function(){
    $.ajax({
        type: 'GET',
        url : 'https://node-js-transporter.herokuapp.com/api/users/sms',
        success: function(){
            console.log('Done');
        }
    })
})