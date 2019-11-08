var AJAX = new XMLHttpRequest;
var _book = []; 

AJAX.onreadystatechange = function(){
    console.log(this.status);
    if (this.readyState === 4){
        if(this.status === 200){
            var result = this.responseText; 
            try
            {
                result = JSON.parse(result);
                _book = result; 
            }
            catch(e)
            {
                console.log('There was an error parsing the document ' + e );
            }
            
            
        }
        else {
            //alert('Something went wrong!' + this.status);
            console.log('Something went wrong ' + this.status);
        }
    }
};

AJAX.open('GET', 'http://localhost:666/library/search?filter=bo', true);
AJAX.send();

$(function(){
    
    for(var i = 0; i < _book.length; i++)
    {
        console.log(_book[i].imageLink);
        $('#book-list').append(
            '<article class="col-sm-4">'+
                '<div class="card">'+
                    '<header class="">'+
                        '<img class="card-img-top" src="' + _book[i].imageLink + '">'+
                    '</header>'+
                    '<main class="card-body">'+
                        '<h3 class="text-center" >'+ _book[i].title +'</h3>'+
                        '<p>by: '+ _book[i].author +'</p>'+
                    '</main>'+
                    '<footer class="card-footer">'+
                        '<p>'+ +'</p>'+
                    '</footer>'+
                '</div>'+
        '</article>');
    }
});
