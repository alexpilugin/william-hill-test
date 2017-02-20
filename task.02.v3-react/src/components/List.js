import React from 'react';

class List extends React.Component {
    constructor() {
        super();
        this.state = { open: false }
    }
    toggleOnClick = (e) => {
        this.setState({ open: !this.state.open })
        e.stopPropagation();
        //console.log(this)
    }
    render() {
        return (
            <div>
                <span onClick={this.toggleOnClick}
                    className={this.state.open ? 'expandible open' : 'expandible'}>
                    {this.props.title}
                </span>
                <ul>
                    {this.props.items}
                </ul>
            </div>
        )
    }
}

export default List;