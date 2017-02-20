import React from 'react';
import 'whatwg-fetch';
import Menu from './Menu';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuData: [],
    }
  }

  //loading data from a server asynchronously using promises
  load(url) {
    return fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).then((res) => {
      if (res.ok) return res.json();
    }).then((json) => {
      this.setState({ menuData: json.menu });
      //console.log(this.state.menuData);
    }).catch((err) => {
      console.log('There has been an error: ' + err.message);
    })
  }

  //setting connection and loading data
  componentWillMount() {
    var url = location.protocol + '//' + location.hostname +
      (location.port ? ':' + location.port : '') + '/menu.json';
    this.load(url); //load data from a server asynchronously
  }

  render() {
    return (
      <div className="App">
        <Menu title='Menu' items={this.state.menuData} />
      </div>
    )
  }

}

export default App;
