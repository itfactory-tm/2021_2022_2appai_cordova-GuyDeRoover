const Favorite = function () {

    let _favorites = [];

    const _setLocalStorage = function () {
        localStorage.setItem('favorites', JSON.stringify(_favorites)); //localStorage.setItem('key', 'value')
        _favoritesList();
    }
    const _favoritesList = function () {
        $('#favorites').empty(); //remove all li tags
        _favorites.forEach(function (value, key) {
            //console.log(value , key)
            //Maak URL voor preview van de full image URL
            const previewUrl = Main.remakeUrl(value);

            const item = `<div class="col s12 no-padding">
                             <div class="card">
                                <div class="card-image">
                                    <img class="favorite preview" src="${previewUrl}" alt="preview" data-fullUrl="${value}" role="button">
                                    <a class="btn-delete btn-floating halfway-fab waves-effect waves-light color-delete" role="button" data-favorite="${key}"><i class="material-icons">delete_forever</i></a>
                                    <a class="btn-save btn-floating halfway-fab waves-effect waves-light color" role="button"><i class="material-icons">file_download</i></a>
                                    <a class="btn-set btn-floating halfway-fab waves-effect waves-light color" role="button"><i class="material-icons">wallpaper</i></a>
                                    <span class="card-title">${key+1}</span>
                                </div>
                                <div class="card-content">
                                    <p>${value}</p>
                                </div>
                             </div>
                          </div>`;
            $('#favorites').append(item);
        });
    };

    const init = function () {
        const urlString = localStorage.getItem('favorites')
        if (urlString !== null) {
            _favorites = []; //empty the array
            _favorites = JSON.parse(urlString);
        }
        _favoritesList();
    };

    const addFavorite = function (value) {
        if (_favorites.indexOf(value) !== -1) {
            alert('You already have this wallpaper saved in favorites ♥');
        }
        else {
            _favorites.push(`${value}`); //add the url at the end (push) or in front (unshift) of the array
            _setLocalStorage();
            alert('Wallpaper saved in favorites ♥');
        }
    };

    const deleteFavorite = function (id) {
        if(confirm('Delete this favorite?')) {
            _favorites.splice(id, 1); //remove the x-th element from the array
            _setLocalStorage();
        }
    };

    return {
        init: init,
        addFavorite: addFavorite,
        deleteFavorite : deleteFavorite,
    };
}();