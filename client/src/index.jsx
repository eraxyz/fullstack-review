import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
    }).done((data) => {
      this.setState({
        repos: data
      });
    });
  };

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'text/plain',
      data: {
        username: term
      },
    }).done((data) => {
      this.setState({
        repos: data
      });
    });
  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  };
};

ReactDOM.render(<App />, document.getElementById('app'));