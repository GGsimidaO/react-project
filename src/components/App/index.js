import React,{Component} from 'react'
import './index.scss'
class App extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	render(){
		return <div>
			<section>
			{
				this.props.children
			}
			</section>
		</div>
	}
}
export default App;