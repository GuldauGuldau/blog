import React from 'react';
import Social from '../social/social.jsx';
import './post.less';
import {Link} from 'react-router-dom';
import PostEditor from '../postEditor/postEditor.jsx';

export default class Post extends React.Component {
	
	getStatus(post) {
		const colorStatus = {
			'published': 'white',
			'approved': 'green',
			'draft' : 'black',
			'rejected':'red',
			'needs editing':'purple',
			'waiting for review': 'orange',
			'under review':'blue'
		}
		if(post.status == 'rejected' && post.reason) {
			return (
				<div className={'post__status '+colorStatus[post.status]}>
					{post.status}
					<i className="fa fa-exclamation-circle" aria-hidden="true"></i>
					<div className="tooltip">
						Reason: {post.reason}
					</div>
				</div>
				
			)
		} else {
			return (
				<div className={'post__status '+colorStatus[post.status]}>
					{post.status}
				</div>
			)
		}
	}
	render() {
		const data = this.props.data;
		
		return (
			<div  className="post">
				{this.getStatus(data)}
				<div className="post__cover">
					<img src={'static/img/'+data.img}/>
				</div>
				<div className="post__body">
					<div className="post__info">
						<div className="post__date">
							{(data.status == 'published') ?
							   (data.published) : 
							   (data.updated)
							} 
						</div>
						{(data.category) &&
							<div className="post__category">{data.category}</div>	
						}
					</div>
					
						<Link to={`/post/${data.id}`} className="post__title">{data.title}</Link>
						
					{(data.status == 'published') && 
						<Social />
					}
					
				</div>
			</div>

		);
	}
}