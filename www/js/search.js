let Search = function() {

    const wallhavenUrl = "https://wallhaven.cc/api/v1/search"
    //const wallhavenKey = "6NyKaLrzoDa8kgW7zw93aDZ40bpf1hhT"
    //const searchwithAPI = `${wallhavenUrl}?apikey=${wallhavenKey}`

    let init = function() {

        //standaard waarden voor categories
        let general = '1';
        let anime = '1';
        let people = '1';

        //nakijken of er knoppen zijn enabled/disabled en waarden aanpassen
        $('#general').click(function() {
            if ($(this).hasClass('off')) {
                /* code to do when disabled */
                general = '1';
                $('#general').removeClass('off');
            } else {
                /* code to do when enabling */
                general = '0';
                $('#general').addClass('off');
            }
        });
        $('#anime').click(function() {
            if ($(this).hasClass('off')) {
                anime = '1';
                $('#anime').removeClass('off');
            } else {
                anime = '0';
                $('#anime').addClass('off');
            }
        });
        $('#people').click(function() {
            if ($(this).hasClass('off')) {
                people = '1';
                $('#people').removeClass('off');
            } else {
                people = '0';
                $('#people').addClass('off');
            }
        });

        //Maak herbruikbare function voor wallpapers weer te geven
        function show() {
            //Maak het #wallpapers element leeg bij elke nieuwe zoekactie
            $('#wallpapers').empty()
            //Lege Array voor te downloade URL's
            const urlList = [];
            //waarde optellen voor categories
            const categories = general+anime+people;

            //Maak een JSON-object met alle parameters
            const pars = {
                q: $('#search-text').val(), //q = query parameter for tagnames, id, @username, type, etc.
                categories: categories, //general,anime,people => 1 is on, 0 is off
                //purity: '110' //sfw,sketchy,nsfw => 1 is on, 0 is off (nsfw enkel met API key)
            }

            //Toon URL met query parameters in console
            console.log('API call:', `${wallhavenUrl}?${$.param(pars)}`)

            // Search MET API Key + static filters:
            //$.getJSON(searchwithAPI, pars, function (data) {

            //Search ZONDER API Key + custom filters:
            $.getJSON(wallhavenUrl, pars, function (data) {
                //Looping door de Array
                $.each(data, function (index, value) {
                    for (i = 0; i < value.length; i = i + 1) {
                        //Variable met het path van de preview (URL)
                        const preview = value[i].thumbs.large
                        //Variabele met het path van de full size image/wallpaper (URL)
                        const image = value[i].path
                        //Variabele met de resolutie
                        const resolution = value[i].resolution
                        //Variabele met de categorie
                        const category = value[i].category

                        //Plaats de afbeeldingen in het #wallpapers element
                        $('#wallpapers').append(
                            `<div class="col s12 no-padding">
                                <div class="card">
                                    <div class="card-image">
                                        <img id="${[i]}" src="${preview}"  alt="preview" role="button">
                                        <span class="card-title">${category}</span>
                                        <a id="${[i]}" class="btn-set btn-floating halfway-fab waves-effect waves-light green" role="button"><i class="material-icons">star_border</i></a>
                                    </div>
                                    <div class="card-content">
                                        <p>${resolution}</p>
                                    </div>
                                </div>
                            </div>`
                        );
                        //Vul Array met de image source (URL)
                        urlList.push(image);
                    }
                });
            });

            $(document).ready(function () {
                // photoviewer opties (plug-in)
                let options = {
                    share: true, // default is false
                    closeButton: true, // default is true
                    copyToReference: true, // default is false
                    headers: '',  // If this is not provided, an exception will be triggered
                    piccasoOptions: { } // If this is not provided, an exception will be triggered
                };

                //Wanneer er op de img wordt geklikt open full image preview
                $(document).undelegate('img', 'click').delegate('img', 'click', function () {
                    const url = urlList[$(this).attr('id')];
                    const title = $(this).parent().siblings().children()[0].innerText;
                    PhotoViewer.show(url, title, options);
                });

                //Wanneer er op de cards knop wordt gedrukt zet als wallpaper
                $(document).undelegate('.btn-set', 'click').delegate('.btn-set', 'click', function () {
                    alert($(this).attr('id'));
                });
            });

            $('#test').unbind().click(function () {
                console.log('Op test gedrukt!');
            });
        }

        //wanneer we op de search knop drukken => nieuwe wallpapers weergeven
        $('#search').unbind().click(function () {
            show();
        });

        // Geef wallpapers weer na het openen van de app
        show();
    };

    return {
        init:init()
    };
}();