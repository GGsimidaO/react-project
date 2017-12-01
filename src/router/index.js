import React from 'react'
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import App from '../components/App'
import Home from '../components/Home'
import Detail from '../components/Detail'
import Search from '../components/Search'
import Category from '../components/Category'
import Cart from '../components/Cart'
import {Provider} from 'react-redux'
import Store from '../redux/Store'
const router=(
	<Provider store={Store}>
		<Router>
			<App>
				<Switch>
					<Route path="/home" component={Home}></Route>				
					<Route path="/detail/:id" component={Detail}></Route>
					<Route path="/category" component={Category}></Route>
					<Route path="/category/:keyword" component={Category}></Route>
					<Route path="/search" component={Search}></Route>
					<Route path="/cart" component={Cart}></Route>			
					<Redirect from="*" to="/home" />				
				</Switch>
			</App>
		</Router>
	</Provider>
)
export default router;