import React,{Component} from 'react'
import './index.scss'
class Showdetail extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	render(){
		return <div id="showdetail">
			<h2>演出详情</h2>
			{
				this.props.info?
				<div dangerouslySetInnerHTML={{__html: this.props.info.data.result.activity.content}}></div>
				:null
			}
		</div>
	}
}
export default Showdetail;