const now = new Date();
const options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};
export default function reducer(state, action) {
  switch (action.type) {
      case 'ADD_POST':
	  const newPost = action.payload;
	 return  Object.assign([],state, {[(state.length)]: newPost})
      case 'EDIT_POST':
	return   state.map(post=> {
		if(post.id == action.payload.id){
			return Object.assign({}, post, action.payload)
		}
		return post
	  });
      case 'REMOVE_POST':
		return   state.map(post=> {
			if(post.id == action.id){
				return Object.assign({}, post, {deleted: now.toLocaleString("en-US", options)})
			}
			return post
		});
    }

  return state;
}
