class Library {
    constructor(datasource) {
        this.datasource = datasource;
    }

    Search(params) {
        try{
            var lResult = {};
            if (params['filter']){
                var book = [];
                var STATUS = 200;
                var _filter = params['filter'];
                _filter = _filter.toLowerCase();
                if (_filter != null){
                    this.datasource.forEach(sortBook => {
                        var title = sortBook['title'].toLowerCase();
                        var author = sortBook['author'].toLowerCase();
                        if (title.includes(_filter) || author.includes(_filter)) {
                            book.push(sortBook);
                        }
                    });
                }
                if (book.length < 1) {
                    lResult['message'] = 'No books found with the search ' + params['title'];
                    STATUS = 404;
                } else {
                    lResult['quantity'] = book.length;
                    lResult['books'] = book;
                    STATUS = 200;
                }
            }
            else
            {
                return{RESULT: 'Parametro incorrecto', STATUS: 404};
            }
            return {RESULT : lResult, STATUS : STATUS};
        }
        catch (e)
        {
            STATUS = 400;
            return {RESULT: e.message, STATUS: STATUS};
        }
    }
}

module.exports = Library;