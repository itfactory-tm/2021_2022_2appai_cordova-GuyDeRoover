const Favorite = function () {

    let _favorites = ['Dummy task'];

    const _setLocalStorage = function (key, value) {
        console.log('save all tasks as "url" key in local storage');
        console.log('_favorites[]', _favorites);
        localStorage.setItem(key, JSON.stringify(_favorites)); //localStorage.setItem('key', 'value')
        _favList();
    }
    const _favList = function () {
        console.log('add all tasks to the ul tag');

        $('ul#favorites').empty(); //remove all li tags

        _favorites.forEach(function (value, key) {
            const item = `<li class="collection-item avatar">
                <i class="material-icons circle red deleteTask" data-task="${key}">delete_forever</i>
                <div class="title" data-task="${key}" contenteditable>${value}</div>
                </li>`;
            $('ul.collection').append(item);
        });
    };

    const init = function () {
        console.log('initialize the app');
        const string = localStorage.getItem('favorite')
        if (string !== null) {
            _favorites = []; //empty the array
            _favorites = JSON.parse(string);
        }
        _favList();
    };

    const addTask = function () {
        console.log('add a new task');
        _favorites.push(`Task ${_favorites.length + 1}`); //add the text "Task x" at the end (push) or in front (unshift) of the array
        _setLocalStorage();
    };

    const deleteTask = function (id) {
        console.log(`delete task with id = ${id}`);
    };

    const editTask = function (id, task) {
        console.log(`edit/update a task: _favorites[${id}] = ${task}`)
        _favorites[id] = task;
        _setLocalStorage();
    };

    return {
        init: init,
        addTask: addTask,
        deleteTask : deleteTask,
        editTask: editTask,
    };
}();