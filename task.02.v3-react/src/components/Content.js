import React from 'react';

class Content extends React.Component {
    render() {
        return (
            <div className="Content">
                {this.props.content}
            </div>
        )
    }
}

export default Content;