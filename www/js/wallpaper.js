let Wallpaper = function() {
    const wallhavenUrl = "https://wallhaven.cc/api/v1/search"
    //const wallhavenKey = "6NyKaLrzoDa8kgW7zw93aDZ40bpf1hhT"
    //const searchwithAPI = `${wallhavenUrl}?apikey=${wallhavenKey}`

    let init = function() {
        //standaard waarden voor categories
        let general = 100;
        let anime = 10;
        let people = 1;
        //nakijken of er knoppen zijn enabled/disabled en waarden aanpassen
        $('#general').click(function() {
            if ($(this).hasClass('off')) {
                /* code to do when disabled */
                general = 100;
                $('#general').removeClass('off');
            } else {
                /* code to do when enabling */
                general = 0;
                $('#general').addClass('off');
            }
        });
        $('#anime').click(function() {
            if ($(this).hasClass('off')) {
                anime = 10;
                $('#anime').removeClass('off');
            } else {
                anime = 0;
                $('#anime').addClass('off');
            }
        });
        $('#people').click(function() {
            if ($(this).hasClass('off')) {
                people = 1;
                $('#people').removeClass('off');
            } else {
                people = 0;
                $('#people').addClass('off');
            }
        });
        //wanneer we op de search knop drukken
        $('#search').click(function () {
            //Maak het #wallpapers element leeg bij elke nieuwe zoekactie
            $('#wallpapers').empty()
            //waarden optellen voor categories
            categories = general+anime+people;
            //Foutcorrectie als value van categories onder 100 valt
            if (categories === 0) {
                categories = '000';
            }
            else if (categories === 1) {
                categories = '001';
            }
            else if (categories === 10) {
                categories = '010';
            }
            else if (categories === 11) {
                categories = '011';
            }

            //Maak een JSON-object met alle parameters
            const pars = {
                q: $('#search-text').val(), //q = query parameter for tagnames, id, @username, type, etc.
                categories: categories, //general,anime,people => 1 is on, 0 is off
                //purity: '110' //sfw,sketchy,nsfw => 1 is on, 0 is off (nsfw enkel met API key)
            }

            //Toon URL met query parameters in console
            //console.log('API call:', `${wallhavenUrl}?${$.param(pars)}`)

            // Search MET API Key + static filters:
            //$.getJSON(searchwithAPI, pars, function (data) {
                //Search ZONDER API Key + custom filters:
            $.getJSON(wallhavenUrl, pars, function (data) {

                $.each(data, function (index, value) {

                    //Looping door de Array
                    for (i = 0; i < value.length; i = i +1) {
                        //console.log(value[i])

                        //Variabele met de large wallpaper link
                        const image = value[i].thumbs.large
                        //Variabele met de resolutie
                        const resolution = value[i].resolution
                        //Variabele met de categorie
                        const category = value[i].category

                        //Plaats de afbeeldingen in het #wallpapers element
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
                    </div>`)
                    }
                });
            });
        });
    };
    return {
        init:init()
    };
}();