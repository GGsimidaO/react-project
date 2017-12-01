
const homedata=(state=[],info)=>{
	//console.log(info);
	let{type,payload}=info;
	switch(type){
		case "Homedata":
			return payload;
		default:
			return state;
	}
}
const detaildata=(state=[],info)=>{
	let{type,payload}=info;
	switch(type){
		case "detaildata":
			return payload;
		default:
			return state;
	}
}
const ticketdata=(state=[],info)=>{
	let{type,payload}=info;
	//console.log(payload);
	switch(type){
		case "ticketinfo":
			return [...state,...payload];
		case 'changedate':
			return payload;
		default:
			return state;
	}
}
const hasmore=(state=false,info)=>{
	let{type,payload}=info;
	switch(type){
		case "hasmore":
			return payload;
		default:
			return state;
	}
}
const datalist=(state=[],info)=>{
	let{type,payload}=info;
	switch(type){
		case "datalist":
			return payload;
		case 'adddatalist':
			return [...state,...payload];
		default:
			return state;
	}
}
const getmore=(state=true,info)=>{
	let{type,payload}=info;
	switch(type){
		case "getmore":
			return payload;
		default:
			return state;
	}
}
const resultlist=(state=[],info)=>{
	let{type,payload}=info;
	switch(type){
		case "result":
			return payload;
		default:
			return state;
	}
}
const cartticket=(state=[],info)=>{
	let{type,payload}=info;
	switch(type){
		case 'cartticket':
			return [...state,payload];
		default:
			return state;
	}
}
export {homedata,detaildata,ticketdata,hasmore,datalist,getmore,resultlist,cartticket};