//A container is a normal react component that gets bonded to the application state.
//Whenever application state changes, container will re-render as well.
import React, { Component } from 'react';
//Glue between React and Redux.
import { connect } from 'react-redux';

import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';


class BookList extends Component {
  debugger;
  renderList(){
    return this.props.books.map((book) => {
      //console.log(book);
      return (
         <li
           key={book.title}
           onClick={() => this.props.selectBook(book)}
           className="list-group-item"
         >{book.title}</li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  //Takes the application state and makes it avail to the container
  return {
    books: state.books
  };
}

//Anything returned from this function, will end up as props on the BookList container
function mapDispatchToProps(dispatch){
  //Whenever selectBook is called, the result should be passed
  // to all of our reducers.
  return bindActionCreators({selectBook: selectBook}, dispatch);

}

//Container = connecting all of the state to props + the actual component.

//Promote BookList from a component to a container -- it needs to know about this
//new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
