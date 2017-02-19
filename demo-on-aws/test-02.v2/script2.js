'use strict'

//Load with Fetch and promisses
const loadAndMake = (url, success) => {
    return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.ok) return response.json();
    }).then(success)
        .catch((err) => {
            console.log('There has been an error: ' + err.message);
        })
}

const success = (json) => {
    const menuData = json['menu'];

    // console.log(menuData);


    //return an array of objects according to key, value, or key and value matching
    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else
                //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                if (i == key && obj[i] == val || i == key && val == '') { //
                    objects.push(obj);
                } else if (obj[i] == val && key == '') {
                    //only add if the object is not already in the array
                    if (objects.lastIndexOf(obj) == -1) {
                        objects.push(obj);
                    }
                }
        }
        return objects;
    }


    const hundleOnClick = (e) => {
        const event = e || window.event;
        var target = e.target || e.srcElement;

        const content = document.getElementById('content');

        if (target.classList.contains('expandible')) {
            target.classList.toggle('open');
            content.innerText = '';
        }

        //walking up the DOM tree until find an element that does have id (ignore span element)
        while (target && !target.id) {
            target = target.parentNode;
        }

        console.log(target.id + " was clicked.");

        e.stopPropagation();

        //change content section
        var objects = getObjects(menuData, 'id', target.id);
        content.innerText = objects[0].content;
    }

    const hundleCollapse = (e) => {
        const event = e || window.event;
        var target = e.target || e.srcElement;

        if (target.classList.contains('expandible')) {
            target.classList.toggle('open');
        }
        //e.stopPropagation();
        //console.log('hundleCollapse');
        //console.log(target);

        const content = document.getElementById('content');
        content.innerText = '';
    }

    const list = document.createElement("ul");
    list.className = "list";


    const generateListContent = (item) => {
        if (item.hasOwnProperty('leaf')) {

            const li = document.createElement("li");
            li.setAttribute("id", item['id']);
            const classes = item['cssClass'];
            li.className = classes;

            const span = document.createElement("span");
            span.innerText = item['description'];
            span.addEventListener("click", hundleOnClick, false);

            li.appendChild(span);

            if (!item['leaf']) {
                span.className = "expandible";
                const ul = document.createElement("ul");
                ul.className = "list";
                ul.addEventListener("click", hundleCollapse, false);

                item['menu'].forEach((item) => {
                    ul.appendChild(generateListContent(item));
                });
                li.appendChild(ul);
            } else {
                li.classList.add("file");
                li.addEventListener("click", hundleOnClick, false);
            }
            return li;
        }
    }
    menuData.forEach((item) => {
        list.appendChild(generateListContent(item));
    });

    const menu = document.getElementById('menu');

    var span = document.createElement("span");
    span.innerText = 'Menu';
    span.className = "expandible";
    span.addEventListener("click", hundleCollapse, false);
    
    menu.appendChild(span);

    if (list) menu.appendChild(list);

}



/*
var url = location.protocol + '//' + location.hostname +
    (location.port ? ':' + location.port : '') + '/menu.json';
*/

var url = 'menu.json';
loadAndMake(url, success);