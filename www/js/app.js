$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("offline", onOffline, false);

    $('.sidenav').sidenav();

    $('.sidenav a').click(function() {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
    });

    function onOffline() {
        alert('Lost internet connection!');
    }

    $('#favorites').on('click', '.btn-delete', function () {
        const id = $(this).data('favorite'); //id = value x from data-favorite="x"
        Favorite.deleteFavorite(id);
    })
});

function onDeviceReady() {
    //console.log('Device is ready');
    Main.init();
    Favorite.init();
    Setting.init();






}