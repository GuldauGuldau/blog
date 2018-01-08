import React from 'react';
import Header from '../header/header.jsx';
import Post from '../post/post.jsx';
import {Link} from 'react-router-dom';
import './postList.less';

export default class PostList extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			postTitle: ''
		} 
		
		this.handleChange = this.handleChange.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}
	
	handleChange(e) {
		this.setState({ postTitle: e.target.value });
	}
	handleClearSearch() {
		this.setState({ postTitle: '' });
	}
	
	render() {
		const posts = this.props.posts.filter(post => {
			let reg = new RegExp(this.state.postTitle, "i");
			return post.title.match(reg);
		});

		return (
			<div>
				<Header />
				<section className="topBar">
						<div className="container">
							<div className="flexWrap">
								<h2>My posts</h2>
								<Link to="/add-post" className="actionBtn">New post</Link>
							</div>
							<div className="searchBlock">
								<div className="searchBlock__icon"><i className="fa fa-search" aria-hidden="true"></i></div>
								<input  type="text"  name="search" className="inputField" value={this.state.postTitle} onChange={(e) => this.handleChange(e)}/>
								{(this.state.postTitle) && <div className="searchBlock__clear" onClick={this.handleClearSearch}><img src="static/img/delete.svg" /></div>}
								
							</div>
						</div>
					</section>
					<section className="main"> 
						<div className="container">
							<div className="grid">
								{posts.map(post => (
										<Post  data={post} key={post.id} />
									)
								)}
							</div>
						</div>
					</section>
			</div>

		);
	}
}