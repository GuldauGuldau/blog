import data from './data.js';

//localStorage.clear();
//add posts fixture to localstorage
data.forEach(dataItem => {
	if(localStorage.getItem('post_'+dataItem.id)) return
	else localStorage.setItem('post_'+dataItem.id, JSON.stringify(dataItem));
})

//get posts from localstorage
let persistedState= [];
for (var i = 0; i<localStorage.length; i++) {
	 let key = localStorage.key(i).split('_');
	 if(key[0] == 'post') {
		 persistedState.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
	 }
 }
 
 export {persistedState};
 
 //save post to localstorage
  export const saveState = (state) => {
	  state.map(post=> {
		  localStorage.setItem('post_'+post.id, JSON.stringify(post));
	  })
 }