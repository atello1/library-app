import React from 'react'
import { render } from 'react-dom'

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value:"#000"
    }
    this.newColor= this.newColor.bind(this)
  }

  newColor(e){
    let newcolor = e.target.value;
    this.setState({value:newcolor})
  }
  /* igual
  newColor = e =>
  this.setState({ value: e.target.value })
  */

  submit = e => {
    console.log(`New Color: ${this.state.value}`)
    e.preventDefault()
  }

  render(){
    return(
      <div>
      <form onSubmit={this.submit}>
      <h1>Form</h1>
      Choose color <input onChange={this.newColor} type="color"/>
      <button>Submit</button>
      </form>

      <p>Set initial state <br/>
      Capture value and update state <br/>
      When state update there is a refresh of the component</p>
      <p>Once capture the new color we can do whatever we want:<br/>

      -Output/print value <br/>
      -sending value to a database
      </p>
      <h2>This is ne new color : {this.state.value}</h2>
      </div>

    )
  }
}

render (<Form />,document.getElementById('root') )
