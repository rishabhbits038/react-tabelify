import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.js';

class App extends React.Component {
  render() {
    return <div>
    	<Page/>
    </div>
  }
}
 
ReactDOM.render(<App/>, document.body);