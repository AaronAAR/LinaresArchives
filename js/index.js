$(function(){
    $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
    });
    console.log('Aaron rocks')
    var getBooks = 'http://localhost:6969/catalog/'
    $.ajax(getBooks)
    .done(function(data){
        var _book = data;
        
        $.each(_book, (index, value)=>{
            console.log(value);
            $('#book-list').append(
                '<article class="card col-lg-4 col-md-6 col-sm-12 px-0 book-card overflow-hidden"><section class="row no-gutters h-100 overflow-hidden"><section class="col-xs-5 col-sm-4 col-md-5 col-lg-6 h-100 overflow-auto book-card-img"><img src="'+ value.imageLink + '" class="book-img" alt=""></section><section class="col-xs-7 col-sm-8 col-md-7 col-lg-6 h-100 book-card-description"><article class="card-body h-100 px-2 py-0"><h5 class="card-title h-10 p-0 m-0">' + value.title + '</h5><p class="card-text h-5 p-0 m-0"><small class="text-muted">'+ value.author +'</small></p><p class="card-text h-5 p-0 m-0"><small>Rating</small></p><div class=" h-75 overflow-auto"><p class="card-text">'+ value.link +'</p></div></article></section></section></article>');
        })
    })
    .fail(function(err){
        alert(err);
    })
})
