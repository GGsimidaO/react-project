import React,{Component} from 'react'
import './index.scss'
import "@/assets/iconfont/iconfont.css";
class Header extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	render(){
		return <div id="header">
			<a href="javascript:void(0)" className="left" onClick={()=>{
				this.props.goback.history.goBack();
			}}></a>
			<span></span>


			<a href="javascript:void(0)" className="right"></a>
		</div>
	}
}
export default Header;