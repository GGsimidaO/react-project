import React,{Component} from 'react'
import './index.scss'
import "@/assets/iconfont/iconfont.css"
import axios from 'axios'
import {connect} from 'react-redux'

class Category extends Component{
	constructor(){
		super();
		this.state={
			currentpage:2,
			keyword:'',
			show:false
		}
	}
	componentWillMount(){
		var keyword=location.href.split('#')[2]?location.href.split('#')[2]:'yanchanghui';
		var page=1;
		this.setState({
			keyword:keyword,			
			title:'演唱会'
		})
		this.props.datalist(keyword,page);
		this.props.getmore(keyword,page);	
	}
	render(){
		var page=this.state.currentpage;
		var keyword=this.state.keyword;
		return <div id="category">
			<div className="search">
				<a href="#" className="iconfont icon-back left" onClick={()=>{
					this.props.history.goBack();
				}}></a>
				<a href="/#/search"><input type='text' className="sea" placeholder="请输入演出/明星/活动"/></a>
				<a href="#" className="iconfont icon-account right"></a>
			</div>
			<nav>
				<ul>
					<li onClick={()=>{
						this.setState({
							show:!this.state.show,
						})
					}}>
						<i className="iconfont icon-category type"></i>
						<span>{this.state.title}</span>
					</li>
					<li>
						<span>日历</span>
						<i className="iconfont icon-moreunfold jiantou"></i>
					</li>
					<li>
						<span>排序</span>
						<i className="iconfont icon-moreunfold jiantou"></i>
					</li>
				</ul>
			</nav>
			{
				this.state.show?
				<div className="typelist">
					<ul>
						<li onClick={this.filter.bind(this,'','全部',1)}>全部</li>
						<li onClick={this.filter.bind(this,'yanchanghui','演唱会',1)}>演唱会</li>
						<li onClick={this.filter.bind(this,'huajugeju','话剧歌剧',1)}>话剧歌剧</li>
						<li onClick={this.filter.bind(this,'yinyuehui','音乐会',1)}>音乐会</li>
						<li onClick={this.filter.bind(this,'ertongqinzi','儿童亲子',1)}>儿童亲子</li>
						<li onClick={this.filter.bind(this,'wudaobalei','舞蹈芭蕾',1)}>舞蹈芭蕾</li>
						<li onClick={this.filter.bind(this,'quyizaji','曲艺杂技',1)}>曲艺杂技</li>
						<li onClick={this.filter.bind(this,'tiyusaishi','体育赛事',1)}>体育赛事</li>
						<li onClick={this.filter.bind(this,'xiuxianyulei','休闲娱乐',1)}>休闲娱乐</li>
						<li>电影</li>
					</ul>
					<div className="close"><i className='iconfont icon-less'></i></div>
				</div>
				:null
			}
			<section>
				<ul className="list">
					{
						this.props.data.map(item=>
							<li key={item.eventId} onClick={this.todetail.bind(this,item.actImgUrl,item.url)}>
								<div className="thumbnail">
									<img src={item.actImgUrl}/>
								</div>
								<div className="info">
									<h3 className="name">{item.actName}</h3>
									<p className="date">{item.actTo}</p>
									<p className="address">{item.address} {item.name}</p>
									<div className="i">
										<span className="status">{item.actStatusName}</span>
										<span className="price">￥{item.lowPrice
										}</span>
										起
									</div>
								</div>
							</li>
						)
					}
				</ul>
				{
					this.props.getmoredata?
					<div className='loadmore' onClick={this.loadmore.bind(this,keyword,page)}>
						加载更多
					</div>
					:
					<div className='allresult'>以上为全部结果</div>
				}
			</section>
		</div>
	}
	loadmore(keyword,page){
		this.setState({
			currentpage:this.state.currentpage+1
		})
		this.props.adddatalist(keyword,page);
		this.props.getmore(keyword,page);
	}
	todetail(val,ids){
		var actCode=val.split('/')[7];
  		var id=ids.split('=')[1];
  		this.props.history.push(`/detail/${actCode+'&'+id}`)
	}
	filter(keyword,title,page){
		this.setState({
			keyword:keyword,
			title:title,
			show:false,
			currentpage:2
		})
		this.props.history.push(`category#${keyword}`);
		this.props.datalist(keyword,page);
		this.props.getmore(keyword,page);
	}
}
export default connect(	
	(state)=>{
		console.log(state.getmore)
		return {
			data:state.datalist,
			getmoredata:state.getmore
		}
	},
	{
		datalist:(keyword,page)=>{
			return (dispatch)=>{
				axios.get(`/ajax/activity/list?frontCate=${keyword}&date=&order=&page=${page}`).then(res=>{
					dispatch({
						type:'datalist',
						payload:res.data.result.list
					})
				})
			}
		},
		adddatalist:(keyword,page)=>{
			return (dispatch)=>{
				axios.get(`/ajax/activity/list?frontCate=${keyword}&date=&order=&page=${page}`).then(res=>{
					dispatch({
						type:'adddatalist',
						payload:res.data.result.list
					})
				})
			}
		},
		getmore:(keyword,page)=>{
			return (dispatch)=>{
				axios.get(`/ajax/activity/list?frontCate=${keyword}&date=&order=&page=${page}`).then(res=>{
					dispatch({
						type:'getmore',
						payload:res.data.result.hasMore
					})
				})
			}
		}
	}
)(Category);