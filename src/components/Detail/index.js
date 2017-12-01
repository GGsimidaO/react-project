import React,{Component} from 'react'
import './index.scss'
import {NavLink} from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Ticket from '../Ticket'
import Showdetail from '../Showdetail'
import axios from "axios"//引入axios库
import {connect} from 'react-redux'
import {Tabs,WhiteSpace} from "antd-mobile"
class Detail extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	componentWillMount(){

		var actCode=this.props.match.params.id.split('&')[0];
		var tid=this.props.match.params.id.split('&')[1];
		this.props.getdetaildata(actCode,tid)
	}
	render(){
		const tabs = [
		  { title: '票品' },
		  { title: '详情' },
		];
		return <div id='detail'>
			<Header goback={this.props}></Header>
			<section>
				{
					this.props.detailbanner?
					<div className="banner">
						<div className="thumbnail">
							<img src={this.props.detailbanner.data.result.activity.thumbnail}/>
						</div>
						<div className="info">
							<h2 className="name">{this.props.detailbanner.data.result.activity.actName}</h2>
							<p className="time">{this.props.detailbanner.data.result.activity.actDate}</p>
							<p className="address">{this.props.detailbanner.data.result.activity.veName}</p>
							<div className="hot">
								<p className="level">{this.props.detailbanner.data.result.activity.hotLevel}℃</p>
								<p>西十区指数</p>
							</div>
							<p className="price"><span>￥{this.props.detailbanner.data.result.activity.minPrice}</span>起</p>
						</div>
					</div>
					:null
				}
				<nav>
					<WhiteSpace />
					    <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
					      <div>
					      	<Ticket info={this.props.detailbanner}></Ticket>
					      </div>
					      <div>
					      	<Showdetail info={this.props.detailbanner}></Showdetail>
					      </div>
					    </Tabs>
					<WhiteSpace />
				</nav>
			</section>			
			<Footer></Footer>
			<NavLink to='/cart' className="tocart"></NavLink>
		</div>
	}
}
export default connect(
	(state)=>{
		return {
			detailbanner:state.detaillist[1],//包含详情信息及banner显示信息

		}
	},
	{
		getdetaildata:(actCode,id)=>{
			return (dispatch)=>{
				Promise.all([axios.get(`/ajax/activity/getEventList?actCode=${actCode}&eventId=${id}`),axios.get(`/ajax/activity/detail?actCode=${actCode}`)]).then(res=>{
					//console.log(res);
					dispatch({
						type:'detaildata',
						payload:res
					})
				})
			}
		}
	}
)(Detail);