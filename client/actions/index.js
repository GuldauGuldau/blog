var uuid = require('node-uuid');
const now = new Date();
const options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};
export function addPost(post) {
	return {
		type: 'ADD_POST',
		payload: {
			id: post.id,
			title: post.title,
			metaTitle: post.metaTitle,
			text: post.text,
			teaser: post.teaser,
			metaDescription: post.metaDescription,
			metaKeyWord: post.metaKeyWord,
			author: 'Hellen Wilson',
			status: 'waiting for review',
			img: 'default.jpg',
			updated: now.toLocaleString("en-US", options)
		}
	};
}
export function removePost(id) {
	return {
		type: 'REMOVE_POST',
		id,
	};
}

export function editPost(post) {
	return {
		type: 'EDIT_POST',
		payload: {
			id: post.id,
			title: post.title,
			metaTitle: post.metaTitle,
			text: post.text,
			teaser: post.teaser,
			metaDescription: post.metaDescription,
			metaKeyWord: post.metaKeyWord
		}
	};
}
