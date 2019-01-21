import React, { Component } from "react";

// Data
import authors from "./data";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAuthor: {},
      filteredAuthors: authors,
      authors: authors
    };

    this.selectAuthor = this.selectAuthor.bind(this);
    this.emptyAuthor = this.emptyAuthor.bind(this);
    this.filterAuthors = this.filterAuthors.bind(this);
  }

  selectAuthor(author) {
    this.setState({ currentAuthor: author });
  }

  emptyAuthor() {
    this.setState({ currentAuthor: {} });
  }

  viewChoice() {
    if (this.state.currentAuthor.first_name) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          filterAuthors={this.filterAuthors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  }

  filterAuthors(query) {
    let filtered = authors.filter(author =>
      (author.first_name + " " + author.last_name)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    this.setState({ filteredAuthors: filtered });
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar emptyAuthor={this.emptyAuthor} />
          </div>
          <div className="content col-10">{this.viewChoice()}</div>
        </div>
      </div>
    );
  }
}

export default App;
