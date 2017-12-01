import React,{Component} from 'react'
import './index.scss'
import "@/assets/iconfont/iconfont.css"
import {connect} from 'react-redux'
import axios from "axios"
class Search extends Component{
	constructor(){
		super();
		this.state={
		}
	}
	render(){
		return <div id='search'>
			<div className="search">
				<a href="#" className="iconfont icon-back left" onClick={()=>{
					this.props.history.goBack();
				}}></a>
				<input type='text' className="sea" placeholder="请输入演出/明星/活动" onChange={this.getkey.bind(this)}/>
			</div>
			<div className="list">
				<ul>
					{
						this.props.resultlist.map(item=>
							<li key={item.actCode} onClick={this.todetail.bind(this,item.actCode,item.url)}>
								<div className="title">{item.result}</div>
								<div className="area">{item.area}</div>
							</li>
						)
					}
				</ul>
			</div>
		</div>
	}
	getkey(event){
		var keyword=encodeURI(event.target.value);//中文输入编码
		if(keyword){
			this.props.getresult(keyword);
		}		
	}
	todetail(actCode,ids){
		var id=ids.split('=')[1];
		this.props.history.push(`/detail/${actCode+'&'+id}`);//编程式导航
	}
}
export default connect(
	(state)=>{
		return {
			resultlist:state.resultlist,
		}
	},
	{
		getresult:(key)=>{
			return (dispatch)=>{
				axios.get(`/ajax/keywords?q=${key}`).then(res=>{
					dispatch({
						type:'result',
						payload:res.data.result
					})
				})
			}
		}
	}
)(Search);