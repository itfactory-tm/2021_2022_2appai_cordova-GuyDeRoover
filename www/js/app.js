$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);

    $('.sidenav').sidenav();

    $('.sidenav a').click(function() {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
    });
});

function onDeviceReady() {
    Search.init();
    Favorite.init();
    Print.init();
    Info.init();
}