import React from 'react';
import ListElement from './ListElement';
const uuidV4 = require('uuid/v4');

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
        this.toggleOnClick = this.toggleOnClick.bind(this);
    }

    toggleOnClick(e) {

        if (e.target !== e.currentTarget) {
            var clickedItem = e.target;
            console.log(clickedItem);

        }
        e.stopPropagation();

        this.setState({ open: !this.state.open }) //to force rerender
        console.log(this.state.open);

    }
    createMenu(title, items) {
        var self = this;
        var listElements;
        if (items !== undefined && items.length > 0) {
            listElements = items.map((el, i) => {
                if (el.leaf) {
                    return <ListElement key={uuidV4()} property={el} />
                } else {
                    return self.createMenu(el.description, el.menu);
                }
            })
        }
        const refKey = uuidV4(); //unique number
        const clCSS = this.state.open ? 'menu expandible' : 'menu';
        return (
            <div
                ref={refKey}
                key={refKey}
                className={clCSS}
                onClick={this.toggleOnClick}
                >
                <h2>{title}</h2>
                <ul className="list">{listElements}</ul>
            </div>
        )

    }
    render() {
        return this.createMenu(this.props.title, this.props.items);

    }
}

export default Menu;