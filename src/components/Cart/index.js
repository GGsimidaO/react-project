import React,{Component} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"
var _=require('lodash')
class Cart extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	render(){
		var cartlist=[];
		if(this.props.cartlist.length==0){
			return <div id="bg">
				<div className="empty">
					<p>购物车空空如也~</p>
					<NavLink to="/home" className='btn'>去逛逛</NavLink>
				</div>
			</div>
		}
		var carts=this.props.cartlist;
		var uniqcart=_.uniqBy(carts,'id')
		//console.log(carts,uniqcart)
		function getnumber(carts,id){
			var num=0;
			for(let i=0;i<carts.length;i++){
				if(carts[i].id==id){
					num++
				}
			}
			return num
		}
		for(let i=0;i<uniqcart.length;i++){
			cartlist.push(
				<li key={uniqcart[i].id} className='list'>
					<div className="left">
						<img src={uniqcart[i].img}/>
					</div>
					<div className='right'>
						<h2>{uniqcart[i].title}</h2>
						<p>{uniqcart[i].address}</p>
						<p>{uniqcart[i].date}</p>
						<p>区域:{uniqcart[i].area}</p>
						<div className="bottom">
							<span>单价:{uniqcart[i].price}</span>
							<span className="number">数量:<i>{getnumber(carts,uniqcart[i].id)}</i></span>
						</div>
					</div>
				</li>
			)
		}
		return <div id="cart">
			<div className='head'>购物车</div>
			<ul>
				{cartlist}
			</ul>
			<footer>
				<NavLink to='/home'>继续购物</NavLink>
			</footer>
		</div>
	}
}
export default connect(
	(state)=>{
		return {
			cartlist:state.cartticket
		}
	}
)(Cart);