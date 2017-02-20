import React from 'react';

class ListElement extends React.Component {
    hundelOnClick = () => {
        const prop = this.props.property;
        const content = prop.content;
        this.props.onClick(content);
    }
    render() {
        const prop = this.props.property;
        var classes = '';
        if (prop.hasOwnProperty('leaf')) {
            classes = prop['cssClass'];
        }
        return (
            <li id={prop.id}
                className={classes}
                onClick={this.hundelOnClick}
            >
                {prop['description']}
            </li>
        )
    }
}

export default ListElement;