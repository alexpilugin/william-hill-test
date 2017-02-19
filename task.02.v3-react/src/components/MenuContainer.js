import React from 'react';
import Menu from './Menu';

class MenuContainer extends React.Component {
    expand(id, open){

    }
    render() {
        return (
            <div className="MenuContainer">
                <Menu title={this.props.title} items={this.props.items} />
            </div>           
        )
    }
}
export default MenuContainer;