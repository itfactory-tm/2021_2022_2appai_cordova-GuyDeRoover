let Wallpaper = function() {

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
            //waarde optellen voor categories
            categories = general+anime+people;

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

                $.each(data, function (index, value) {
                    //Looping door de Array
                    for (i = 0; i < value.length; i = i +1) {
                        //console.log(value[i])
                        //Variable met het path van de preview (URL)
                        const preview = value[i].thumbs.large
                        //Variabele met het path van de full size image/wallpaper (URL)
                        const image = value[i].path
                        //Variabele met de resolutie
                        const resolution = value[i].resolution
                        //Variabele met de categorie
                        const category = value[i].category


                        // photoviewer opties (plugin) kan ook gewoon onclick"window.open({image})" doen maar dat is dan zonder plugin?
                        let options = {
                            share: true, // default is false
                            closeButton: false, // default is true
                            copyToReference: true, // default is false
                            headers: '',  // If this is not provided, an exception will be triggered
                            piccasoOptions: { } // If this is not provided, an exception will be triggered
                        };
                        //    PhotoViewer.show('https://w.wallhaven.cc/full/y8/wallhaven-y8936k.png', 'Optional Title', viewerOptions);


                        //Plaats de afbeeldingen in het #wallpapers element
                        $('#wallpapers').append(
                            `<div class="col s12 no-padding">
                        <div class="card">
                            <div class="card-image">
                                <img  src="${preview}"  alt="preview${[i]}" onclick="PhotoViewer.show('${image}', '${resolution}')" role="button" tabindex="${i}">
                                <span class="card-title">${category}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light green" href="${image}"><i class="material-icons">star_border</i></a>
                            </div>
                            <div class="card-content">
                                <p>${resolution}</p>
                            </div>
                        </div>
                    </div>`)
                    }
                });
            });
        }

        // Geef wallpapers weer na het openen van de app
        show()

        //wanneer we op de search knop drukken
        $('#search').click(function () {

            //Geef nieuwe wallpapers weer aan de hand van zoektermen, na het klikken van 'search'.
            show()
        });

        /*window.onclick = e => {
            alert(e.target.tagname);
        }*/

        $('img[alt="preview0"]').click(function () {
           alert('werkt')
        });


        $('#test').click(function () {



        })
    };

    //jpg: https://w.wallhaven.cc/full/8o/wallhaven-8oj6y2.jpg
    //png: https://w.wallhaven.cc/full/y8/wallhaven-y8936k.png


    return {
        init:init()
    };
}();