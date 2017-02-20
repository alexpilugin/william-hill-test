import React from 'react';
import List from './List';
import ListElement from './ListElement';
const uuidV4 = require('uuid/v4');

class Menu extends React.Component {

    createListContent(title, items) {
        var self = this; //since this is recursion
        var listElements = [];
        if (items !== undefined && items.length > 0) {
            listElements = items.map((el) => {
                if (el.leaf) {
                    return <ListElement key={uuidV4()} property={el} />
                } else {
                    return self.createListContent(el.description, el.menu);
                }
            })
        }

        return (
            <List key={uuidV4()} title={title} items={listElements} />
        )

    }
    render() {
        return (
            <div className="Menu">
                {this.createListContent(this.props.title, this.props.items)}
            </div>
        )
    }
}

export default Menu;