import React,{Component} from 'react'
import './index.scss'
import axios from "axios"//引入axios库
import {connect} from 'react-redux'
import "@/assets/iconfont/iconfont.css"
import {NavLink} from "react-router-dom";
import { Carousel} from 'antd-mobile';//从antd移动端组件库引入轮播组件
class Home extends Component{
	constructor(){
		super();
		this.state={
			
		}
	}
	componentWillMount(){
		if(!this.props.bannerlist){
			this.props.gethomedata();
		}		
	}
	render(){
		return <div id="home">
			{
				this.props.bannerlist?//三元表达式判断，当this.props.bannerlist存在渲染列表，否则为null
				<div>
					<Carousel
			          className="carousel"
			          autoplay={true}//自动播放
			          infinite
			          selectedIndex={1}
			          style={{touchAction:'none' }}
			        >{
			        	//antd轮播图组件
			        }
						{
							this.props.bannerlist.data.result.map((item,index)=>
								<a href={item.url}  key={index}><img src={item.imgUrl}/></a>
		                	)
						}
					</Carousel>
					<a className="address" href="#">上海<i className="iconfont icon-moreunfold"></i></a>
					<NavLink className="search" to="/search"><i className="iconfont icon-search"></i></NavLink>
					<div className="wrapper">
						<ul className="nav">
							<li><NavLink className="item left" to='/category'>
								<div className="text">
									<span>分类</span>
									<span className="small">Classification</span>
								</div>
								<div className="icon"><span></span></div>
							</NavLink></li>
							<li><NavLink className="item right" to=''>
								<div className="text">
									<span>个人中心</span>
									<span className="small">Personal Center</span>
								</div>
								<div className="icon"><span></span></div>
							</NavLink></li>
						</ul>
						<section>
							<h3 className="title">
								Hot today
								<span>热门演出</span>
							</h3>
							<ul className="showlist">
								{
									this.props.ticketlist.data.result.hot.map(item=>
										<li className='item' key={item.url} onClick={this.click.bind(this,item.thumbnail,item.url)}>
											<img src={item.thumbnail} className="ticketimg" />
											<h2 className="txt">{item.actName}</h2>
											<span className="data">{item.date}</span>
										</li>
									)
								}
							</ul>
						</section>
						<section>
							<h3 className="title">
								Stub Ticket
								<span>尾票</span>
							</h3>
							<ul className="showlist">
								{
									this.props.ticketlist.data.result.last.map(item=>
										<li className='item' key={item.url} onClick={this.click.bind(this,item.thumbnail,item.url)}>
											<img src={item.thumbnail} className="ticketimg" />
											<h2 className="txt">{item.actName}</h2>
											<span className="data">{item.date}</span>
										</li>
									)
								}
							</ul>
						</section>
						<section>
							<ul className="activities">
								{
									this.props.ticketlist.data.result.ads.map(item=>
										<li className='item' key={item.url}>
											<img src={item.imgUrl} className="ticketimg" />
										</li>
									)
								}
							</ul>
						</section>
						<section>
							<h3 className="title">
								On Sale
								<span>折扣票</span>
							</h3>
							<ul className="showlist">
								{
									this.props.ticketlist.data.result.discount.map(item=>
										<li className='item' key={item.url} onClick={this.click.bind(this,item.thumbnail,item.url)}>
											<img src={item.thumbnail} className="ticketimg" />
											<h2 className="txt">{item.actName}</h2>
											<span className="data">{item.date}</span>
										</li>
									)
								}
							</ul>
						</section>
						<section>
							<h3 className="title">
								Rare
								<span>稀缺票</span>
							</h3>
							<ul className="showlist">
								{
									this.props.ticketlist.data.result.rare.map(item=>
										<li className='item' key={item.url} onClick={this.click.bind(this,item.thumbnail,item.url)}>
											<img src={item.thumbnail} className="ticketimg" />
											<h2 className="txt">{item.actName}</h2>
											<span className="data">{item.date}</span>
										</li>
									)
								}
							</ul>
						</section>
						<div className="link">
							<a href="http://www.shjbzx.cn">
								<img src={require("@/assets/hotline.png")}/>
							</a>
							<span>举报电话:021-52398129&nbsp;&nbsp;分机号:403</span>
						</div>
						<footer>
							<span>版权所有 西十区Copyright2011 - 2016 All Rights Reserved 沪ICP备12004558 上海爱有网络科技有限公司</span>
						</footer>
					</div>	
				</div>
                :
                <div className="bg"><img src={require('@/assets/timg.gif')} className="loading"/></div>     	               	             
			}
			{
				//banner轮播图
			}					
		</div>
	}
	click(val,ids){
		var actCode=val.split('/')[7];
  		var id=ids.split('=')[1];
  		this.props.history.push(`/detail/${actCode+'&'+id}`);
	}
}
export default connect(
	(state)=>{
		//console.log(state.list[1]);
		return {
			bannerlist:state.list[0],
			ticketlist:state.list[1],
		}
	},
	{
		gethomedata:()=>{
			return (dispatch)=>{
				//请求数据
				Promise.all([axios.get('/ajax/home/banner'),axios.get('/ajax/home/tickets')]).then(res=>{
					//console.log(res);
					dispatch({
						type:"Homedata",
						payload:res
					})
				})

			}
		}
	}
)(Home);