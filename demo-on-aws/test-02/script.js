'use strict'

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

/*
function addEvents() {
    var items = document.getElementsByClassName('file');
    const len = items.length;

    for (var i = 0; i < len; i++) {
        if (document.addEventListener) {
            items[i].addEventListener("click", hundleOnClick);
            console.log(items[i]);
        }
        else {
            if (document.attachEvent) {
                items[i].attachEvent("onclick", hundleOnClick);
                console.log(items[i]);
            }
        }
    }
}
*/

const success = (json) => {

    const menuData = json['menu'];

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

        //walking up the DOM tree until find an element that does have an ID
        while (target && !target.id) {
            target = target.parentNode;
        }
        target.classList.toggle("test");
        console.log(target.id + " was clicked.");
        
        var objects = getObjects(menuData, 'id', target.id);
        //console.log(objects);

        const content = document.getElementById('content');
        content.innerText = objects[0].content;

    }

    const generateList = (obj) => {
        if (obj.hasOwnProperty('leaf')) {
            var classes = obj['cssClass'];

            const li = document.createElement("li");
            li.setAttribute("id", obj['id']);
            li.className = classes;

            if (obj['leaf']) {
                li.classList.add("file");
                li.addEventListener("click", hundleOnClick, false);
            }

            var span = document.createElement("span");
            span.innerText = obj['description'];

            li.appendChild(span);

            if (!obj['leaf']) {

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                li.appendChild(checkbox);

                const ul = document.createElement("ul");
                ul.className = "collapsible";

                obj['menu'].forEach((obj) => {
                    ul.appendChild(generateList(obj));
                });
                li.appendChild(ul);
            }
            return li;
        }

    }

    const list = document.createElement("ul");
    list.className = "collapsible";

    menuData.forEach((obj) => {
        list.appendChild(generateList(obj));
    });

    console.log(list);
    if (list) {
        document.getElementById('menu').appendChild(list);
    }
}

/*
var url = location.protocol + '//' + location.hostname +
    (location.port ? ':' + location.port : '') + '/menu.json';
*/

var url = 'menu.json';
loadAndMake(url, success);


/*
function addEventListenerToNodeList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
//HTMLCollection:
var items = document.getElementsByClassName('file');
addEventListenerToNodeList(items, 'click', hundleOnClick); 


console.log(items);
for (var i = 0; i < len; i++) {
    items[i].addEventListener("click", hundleOnClick, false);
}
*/

/*
<ul class="collapsible">
<li id="contact" class="static-content file"><span>Contact Us</span></li>
<li id="rules" class=""><span>Sports Betting Rules</span><input type="checkbox" /><ul class="collapsible">
<li id="types" class="static-content wager-types file"><span>Wager Types</span></li>
<li id="odds" class="static-content file"><span>Odds & Lines</span></li>
<li id="policies" class="static-content rules-policies file"><span>Rules & Policies</span></li>
<li id="bonuses" class="static-content file"><span>Sports Bonuses</span></li>
</ul></li>
<li id="conditions" class=""><span>Terms & Conditions</span><input type="checkbox" /><ul class="collapsible">
<li id="termsOfService" class="static-content file"><span>Terms of Service</span></li>
<li id="privacy" class="static-content file"><span>Privacy Policy</span></li>
</ul></li>
<li id="view" class="static-content file"><span>View in: Mobile | Full Site</span></li>
</ul>
*/
