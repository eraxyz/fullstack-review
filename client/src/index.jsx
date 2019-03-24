import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users: [],
      friends: [],
      displayFriends: false
    }
    this.search = this.search.bind(this);
    this.showFriends = this.showFriends.bind(this);
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
    }).done((data) => {
      console.log(data);
      this.setState({
        repos: data.repoList,
        users: data.userList
      });
    });
  };

  search(term) {
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
        repos: data.repoList,
        users: data.userList
      });
    });
  };

  showFriends() {
    if (this.state.displayFriends) 
      this.setState({displayFriends: false})
    else  
      $.ajax({
        type: 'GET',
        url: '/friends',
      }).done((data) => {
        console.log(data);
        this.setState({
          friends: data,
          displayFriends: true
        });
      });
  };

  render() {
    return (<div className='main-container'><div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>
    <div> <UserList users={this.state.users}
                    friends={this.state.friends}
                    display={this.state.displayFriends}
                    friendsClick={this.showFriends}/> 
    </div>
    </div>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('app'));