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
                //To do when enabling
                general = '1';
                $(this).removeClass('off');
            } else {
                //To do when disabling
                general = '0';
                $(this).addClass('off');
            }
        });
        $('#anime').click(function() {
            if ($(this).hasClass('off')) {
                anime = '1';
                $(this).removeClass('off');
            } else {
                anime = '0';
                $(this).addClass('off');
            }
        });
        $('#people').click(function() {
            if ($(this).hasClass('off')) {
                people = '1';
                $(this).removeClass('off');
            } else {
                people = '0';
                $(this).addClass('off');
            }
        });

        //Herbruikbare function om een wallpaper te downloaden
        function DownloadToDevice(fileurl) {
            let blob = null;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", fileurl);
            xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
            xhr.onload = function () {
                blob = xhr.response; //xhr.response is now a blob object
                //console.log(blob);
                let storageLocation = "";
                switch (device.platform) {
                    case "Android":
                        storageLocation = 'file:///storage/emulated/0/';
                        break;
                    case "iOS":
                        storageLocation = cordova.file.documentsDirectory;
                        break;
                }
                const folderpath = storageLocation + "Download";
                //Creëer 4 random integers
                function rndInt() {
                    return Math.floor(1000 + Math.random() * 9000)
                }
                const filename = "Wallmania"+rndInt()+"-"+rndInt()+"-"+rndInt()+".png";
                const DataBlob = blob;
                window.resolveLocalFileSystemURL(folderpath, function (dir) {
                    dir.getFile(filename, {
                        create: true
                    }, function (file) {
                        file.createWriter(function (fileWriter) {
                            fileWriter.write(DataBlob);
                            //Download was succesfull
                            alert('Wallpaper has been downloaded!');
                        }, function (err) {
                            // Failed
                            alert('Error, file could not be downloaded!')
                        });
                    });
                });
            };
            xhr.send();
        }

        //Herbruikbare function om van image URL een base64 te maken
        function toDataURL(url, callback) {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                const reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }

        //Herbruikbare function voor wallpapers weer te geven
        function show() {
            //Maak het #wallpapers element leeg bij elke nieuwe zoekactie
            $('#wallpapers').empty()
            //Lege Array voor te downloaden URL's
            const urlList = [];
            //waarde optellen voor categories
            const categories = general+anime+people;

            //Maak een JSON-object met alle parameters
            const pars = {
                q: $('#search-text').val(), //q = query parameter for tagnames, id, @username, type, etc.
                categories: categories, //general,anime,people => 1 is on, 0 is off
                //purity: '110' //sfw,sketchy,nsfw => 1 is on, 0 is off (nsfw enkel met API key)
            };

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
                                        <a class="btn-fav btn-floating halfway-fab waves-effect waves-light green" role="button"><i class="material-icons">star_border</i></a>
                                        <a class="btn-save btn-floating halfway-fab waves-effect waves-light green" role="button"><i class="material-icons">file_download</i></a>
                                        <a class="btn-set btn-floating halfway-fab waves-effect waves-light green" role="button"><i class="material-icons">wallpaper</i></a>
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

                //Wanneer er op de img wordt geklikt => open full image preview (plug-in)
                $(document).undelegate('img', 'click').delegate('img', 'click', function () {
                    const url = urlList[$(this).attr('id')];
                    const title = $(this).parent('div.card-image').siblings('div.card-content').children('p')[0].innerText;
                    PhotoViewer.show(url, title, options);
                });

                //Wanneer er op favorite wordt geklikt
                $(document).undelegate('.btn-fav', 'click').delegate('.btn-fav', 'click', function () {
                    const url = urlList[$(this).siblings('img').attr('id')];
                    /*switch (confirm('Favorite image in favorites?')) {
                        case true:
                            alert('saved');
                            break;
                        case false:
                            alert('no save');
                            break;
                    }*/
                    //alert($(this).siblings('img').attr('id'));
                });

                //Wanneer er op save wallpaper wordt geklikt
                $(document).undelegate('.btn-save', 'click').delegate('.btn-save', 'click', function () {
                    const url = urlList[$(this).siblings('img').attr('id')];
                    switch (confirm('Download image to gallery?')) {
                        case true:
                            DownloadToDevice(url);                          
                            break;
                        case false:
                            alert('Download canceled :(');
                            break;
                    }
                });

                //Wanneer er op set wallpaper wordt geklikt
                $(document).undelegate('.btn-set', 'click').delegate('.btn-set', 'click', function () {
                    const url = urlList[$(this).siblings('img').attr('id')];
                    switch (confirm('Set image as wallpaper?')) {
                        case true:
                            toDataURL(url, function (dataUrl) {
                                const base64 = dataUrl.split(',')[1];
                                window.plugins.wallpaper.setImageBase64(base64);
                                alert('Done, wallpaper has been set ;)');
                            });
                            break;
                        case false:
                            alert('Canceled, setting wallpaper :(');
                            break;
                    }
                });

            });

            $('#test').unbind().click(function () {

            });
        }

        // Geef wallpapers weer na het openen van de app
        show();

        //wanneer we op de search knop drukken => nieuwe wallpapers weergeven
        $('#search').unbind().click(function () {
            show();
        });
    };

    return {
        init:init()
    };
}();
