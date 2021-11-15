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
        alert('Lost internet connection!')
    }

    $('#addTask').click(function () {
        console.log('add a new task');
       Favorite.addTask();
    });

    $('ul#favorites').on('blur', '.title', function () {
        console.log('update a task');
        const id = $(this).data('task'); //id = the value of x from data-task="x"
        const task = $(this).html(); //task = the HTML code in the text field
        Favorite.editTask(id, task);
    });

    $('ul#favorites').on('click', '.deleteTask', function () {
        const id = $(this).data('task'); //id = value x from data-task="x"
        Favorite.deleteTask(id);
    })
});

function onDeviceReady() {
    console.log('Device is ready');
    Main.init();
    Favorite.init();
    Print.init();
    Info.init();

}