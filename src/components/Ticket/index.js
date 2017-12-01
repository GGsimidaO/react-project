import React,{Component} from 'react'
import './index.scss'
import axios from "axios"
import "@/assets/iconfont/iconfont.css"
import {connect} from "react-redux"
import _ from 'lodash'
class Ticket extends Component{
	constructor(){
		super();
		this.state={
			page:2,
			tid:'',
			index:0
		}
	}
	componentWillMount(){
		var tid=location.href.split('&')[1];//通过url获取id
		var page=1;
		this.setState({
			tid:tid,
		})
		this.props.changedate(tid,page);//执行action中函数请求数据
		this.props.gethasmore(tid,page);//请求hasMore,判断是否还有更多数据

	}
	render(){
		var page=this.state.page;//获取页数
		var tid=this.state.tid;//获取请求id
		return <div id="ticket">
			
			{
				this.props.info?
				<div>
					<div className="shortTap">
						<ul className="date">
							{
								this.props.info.data.result.events.data.map((item,index)=>
									<li key={item.eventId} onClick={this.changedata.bind(this,item.eventId,1,index)} className={this.state.index==index?'active':''}>
										<span>{item.date.day}</span>
										<br/>
										<span>{item.date.week}</span>
										<span>{item.date.time}</span>
										<br/>
										<span>￥{item.price}起</span>
									</li>
								)
							}
						</ul>
					</div>
					<div className='select'>
						<div className="left" >选票面价<i className="iconfont icon-moreunfold"></i></div>
						<div className="right" >销售价比价<i className="iconfont icon-moreunfold"></i></div>
					</div>
					<div className="tickets-list">
						<ul>
							{
								this.props.ticketlist.map(item=>
									<li key={item.ticketId}>
										<div className="left">
											<h3>{item.title}</h3>
											<p>{item.deliveryTime}</p>
											<p>卖家保证金:{item.depositText}</p>
											{
												item.tags.map((item,index)=>
													<span key={index}>{item}</span>
												)
											}									
										</div>
										<div className="right">
											<p className="price">￥{item.price}</p>
											<p className="face-price">票面价: ￥{item.facePrice}</p>
											<p className="left-qty">剩余张数: {item.leftQuantity}</p>
											<a className="btn" onClick={this.addToCart.bind(this,item,this.props.info.data.result.activity)}>购买</a>
										</div>
									</li>
								)
							}
						</ul>
					</div>
					{
						this.props.hasmore?
						<div className='loadmore' key={tid} onClick={this.loadmore.bind(this,tid,page)}>
							加载更多
						</div>
						:null
					}
				</div>
				:null
			}			
		</div>
	}
	loadmore(id,page){
		this.setState({
			page:this.state.page+1,
		})
		this.props.getticket(id,page);
		this.props.gethasmore(id,page);
	}
	changedata(id,page,index){//点击不同时间请求不同eventId数据，默认page开始是1
		this.setState({
			page:2,//重置page
			tid:id,
			index:index
		})
		this.props.changedate(id,page);
		this.props.gethasmore(id,page);
	}
	addToCart(val,val1){
		console.log(val,val1)
		var showinfo={
			img:val1.thumbnail,
			title:val1.actName,
			date:val1.actDate,
			address:val1.veName,
			price:val.price,
			area:val.title,
			id:val.ticketId
		}
		this.props.addticket(showinfo);
	}
}
export default connect(
	(state)=>{
		//console.log(state.hasmore)
		return {
			ticketlist:state.ticketlist,
			hasmore:state.hasmore
		}
	},
	{
		getticket:(id,page)=>{//加载更多时调用，reducer中包含数组的数组拼接
			return (dispatch)=>{
				axios.get(`/ajax/activity/tickets?eventId=${id}&dId=&order=0&seat=&page=${page}`).then(res=>{
					console.log(res.data);
					dispatch({
						type:'ticketinfo',
						payload:res.data.result.list
					})
				})
			}
		},
		changedate:(id,page)=>{//切换时间是调用，重新获取新数据
			return (dispatch)=>{
				axios.get(`/ajax/activity/tickets?eventId=${id}&dId=&order=0&seat=&page=${page}`).then(res=>{
					//console.log(res.data);
					dispatch({
						type:'changedate',
						payload:res.data.result.list
					})
				})
			}
		},
		gethasmore:(id,page)=>{
			return (dispatch)=>{
				axios.get(`/ajax/activity/tickets?eventId=${id}&dId=&order=0&seat=&page=${page}`).then(res=>{
					//console.log(res.data);
					dispatch({
						type:'hasmore',
						payload:res.data.result.hasMore,
					})
				})
			}
		},
		addticket:(info)=>{

			return (dispatch)=>{
				dispatch({
					type:'cartticket',
					payload:info
				})
			}
		}
	}
)(Ticket);