import React from 'react';

class ListElement extends React.Component {
    render() {
        const prop = this.props.property;
        var classes = '';
        if (prop.hasOwnProperty('leaf')) {
            classes = prop['cssClass'];
        }
        //console.log(prop);

        return (
            <li id={prop.id} className={classes}>
                {prop['description']}
            </li>
        )

    }
}

export default ListElement;