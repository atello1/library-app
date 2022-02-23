import React, { Component } from 'react'
import { render } from 'react-dom'

let skiData = {
	total: 50,
	powder: 20,
	backcountry: 10,
	goal: 100
}


class SkiDayCounter extends Component {
  getPercent = decimal => {
    return decimal * 100 + '%'
  }
/*
IGUAL
getPercent(decimal){
  return decimal * 100 + '%'
}
*/


  calcGoalProgress = (total, goal) => {
    return this.getPercent(total/goal)
  }
	render() {
    const style={
      color:"blue",
      "text-transform":"uppercase"
    }
    console.log(this.props);
		const {total, powder, backcountry, goal} = this.props
//https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477
/*
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;
let {title, width, height} = {title: "Menu",width: 100,height: 200};
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
Properties options.title, options.width and options.height are assigned to the corresponding variables.


*/
		return (
			<section style={{background:this.props.background}}>
				<div>
					<p style={style}>Total Days: {total}</p>
				</div>
				<div>
					<p>Powder Days: {powder}</p>
				</div>
				<div>
					<p>Backcountry Days: {backcountry}</p>
				</div>
				<div>
				<p>Goal Progress: {this.calcGoalProgress(total, goal)}</p>
				</div>
			</section>
		)
	}
}

render(
	<SkiDayCounter
    background= "green"
		total={skiData.total}
		powder={skiData.powder}
		backcountry={skiData.backcountry}
		goal={skiData.goal}/>,
	document.getElementById('root')
)
