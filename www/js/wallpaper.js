let Wallpaper = function() {
    const wallhavenUrl = "https://wallhaven.cc/api/v1/search"
    //const wallhavenKey = "6NyKaLrzoDa8kgW7zw93aDZ40bpf1hhT"
    //const searchwithAPI = `${wallhavenUrl}?apikey=${wallhavenKey}`

    let init = function() {

        $('#test').click(function () {
            //Maak het #wallpapers element leeg bij elke nieuwe zoekactie
            $('#wallpapers').empty()
            //console.log('Button werkt!');

            //Maak een JSON-object met alle parameters
            const pars = {
                q: 'anime', //q = query parameter for tagnames, id, @username, type, etc.
                categories: '111', //general,anime,people => 1 is on, 0 is off
                //purity: '110' //sfw,sketchy,nsfw => 1 is on, 0 is off (nsfw enkel met API key)
            }

            //Toon URL met query parameters in console
            console.log('API call:', `${wallhavenUrl}?${$.param(pars)}`)

            // Search MET API Key + static filters:
            //$.getJSON(searchwithAPI, pars, function (data) {
                //Search ZONDER API Key + custom filters:
            $.getJSON(wallhavenUrl, pars, function (data) {

                $.each(data, function (index, value) {

                    //Looping door de Array
                    for (i = 0; i < value.length; i = i +1) {
                        console.log(value[i])

                        //Variabele met de large wallpaper link
                        const image = value[i].thumbs.large
                        //Variabele met de resolutie
                        const resolution = value[i].resolution
                        //Variabele met de categorie
                        const category = value[i].category

                        //Plaats de afbeeldingen in het #wallpapers element
                        //$('#wallpapers').append(`<img src='${current_img}' alt='wallpaper'>`)

                        $('#wallpapers').append(
                            `<div class="col s12">
                        <div class="card">
                            <div class="card-image">
                                <img src="${image}" alt="wallpaper">
                                <span class="card-title">${category}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light green" href="${image}"><i class="material-icons">add</i></a>
                            </div>
                            <div class="card-content">
                                <p>${resolution}</p>
                            </div>
                        </div>
                    </div>`
                        )



                    }
                });
            });
        });
    };
    return {
        init:init()
    };
}();