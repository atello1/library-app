import React from 'react'
import { render } from 'react-dom'

let bookList = [
  {"author": "Roxane Gay", "pages": 320},
  {"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
  {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
  {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]

const Hiring = function(){
  return 	<div>
  <h2>The library is hiring.</h2>
  </div>
}

const NotHiring = () =>
<div>
<h2>The library is NOT hiring.</h2>
</div>;

//like function expresion
// por qué no hay que poner this?
/*
const Book = (props)=>{
console.log(props);
return (
<section>
<h2>{props.title}</h2>
<p>by: {props.author}</p>
<p>Pages: {props.pages} pages</p>
</section>
)
}*/


// destructuring ?
// default values. if no value supply// ver elem 1 of booklist
const Book = ({title="No Title Provided", author= "No Author", pages=0, freeBookmark})=>{
  return (
    <section>
    <h2>{title}</h2>
    <p>by: {author}</p>
    <p>Pages: {pages} pages</p>
    <p>Free Bookmark :  {freeBookmark ? 'yes!': 'no!'}</p>
    </section>
  )
}
//title=this.props.title
//title=this.props
/*
{title, author, pages}={
title:"rrr",
author:"ddd",
pages:44
}
//title= this.props.title
// {title} = this.props


So now I can click Change, and this will toggle it open and closed. Always resetting the state variable for this component. SetState is asynchronous. So if you are relying on the previous state to set a new value, you can use a callback function inside of setState. So I want to refactor this, just because if you're working with other people's code, you're going to see a lot of callback functions instead of objects here in the setState function.
So let me show you what this would look like. We're just going to say prevState returns the state object. So the object should be wrapped in another set of enclosing parentheses. So just make sure that that's there so that'll work. We're going to then replace this.state with prevState.open, cool. So then we can go ahead and change this. And this'll make sure that this.setState, no matter how long it takes, will work as expected.


it's a good rule of thumb to keep state in the root of the tree. In other words, your root component, in this case, the library component, should hold all of the state variables and pass down that information to the children.
So, the reason for this is if I have local state in all of my components, it's really easy to lose track of that state, and for some of these variables to be incorrect.
https://reactjs.org/docs/lifting-state-up.html

repetir video 4.5
*/
class Library extends React.Component {
  // if not values provided instead of app broken. para verlo borrar books={bookList}  de <Library books={bookList} />
  static defaultProps = {
    books: [
      {"title": "Tahoe Tales", "author": "Chet Whitley", "pages": 1000}
    ]
  }
  /*the constructor is called before the component is mounted, and it's a great place to initialize local state.
  The constructor allows us to initialize state. Render is called every time there is any sort of change. ComponentDidMount is going to be called right after our component is added to the dom. ComponentDidUpdate, when anything changes.
  componentWillMount : before adding to the dom (add dynamic ramdon style in notes app) and fetch in board.js*/
  constructor(props){
    super(props);
    this.state={
      open:true,
      freeBookmark: false,
      hiring:true,
      loading:true,
      data:[]
    }
    this.toogleOpenClose=this.toogleOpenClose.bind(this);
  }

  componentDidMount() {
    //dentro de la clase
    //update product with loading
    //fetch-get data-and assing data to data state
    // endpoint:https://hplussport.com/api/products/order/price/sort/asc/qty/1

    fetch("https://hplussport.com/api/products/order/price/sort/asc/qty/1")
    .then(function(response){return response.json()})
    .then(response => {
      this.setState({data: response});
      this.setState({ loading: false})
      // use info product and output in render. map through products
    })

  }


  componentDidUpdate() {
    console.log("updated!")
  }
  //component­Did­Mount   component­Did­Update
  //setState({term:term})  shorthand setState({term})
  toogleOpenClose(){
    /* 1
    this.setState({
    open: !this.state.open
  })
  */
  //2 this.setState(prevState => ({open: !prevState.open}))
  this.setState(prevState => {
    return ({open: !prevState.open})
  })
  /* 3
  this.setState(function (prevState) {
  return {open: !prevState.open}
}
*/


}

render(){
  //console.log(this.props);
  //console.log(this.state);
  const { books } = this.props
  //	const books  = this.props.books
  //console.log(this.state)
  return (
    <section>
    //product
    <h1>Help our organization buying this t-shirt!:</h1>
    {this.state.loading ? "loading..." : " "}
    {this.state.data.map(product => {

      return (
        <div key={product.id} className="productContainer">
        <img src={product.image} alt="" width="200"/>
        </div>
      )

    })}

    // show component based in condition state
    {this.state.hiring? <Hiring /> : <NotHiring />}

    // show any text based in comdition state
    <h1>Library is currently {this.state.open? "open": "closed"}</h1>
    //books instead of this.props.books
    {books.map((book,index) =>
      <Book
      key={index}
      title={book.title}
      author={book.author}
      pages={book.pages}
      freeBookmark={this.state.freeBookmark}/>
    )}

    <button onClick={this.toogleOpenClose}>Toogle open-close</button>

    </section>
  )
}
}



render (<Library books={bookList} />,document.getElementById('root') )
