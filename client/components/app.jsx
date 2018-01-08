import React from 'react';
import PostList from './postList/postList.jsx';
import PostEditor from './postEditor/postEditor.jsx';
import '../../static/css/fontawesome-all.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { editPost, removePost, addPost}  from '../actions/index.js';
//var uuid = require('node-uuid');

class App extends React.Component {

	render() {
		const posts = this.props.posts;
		const actions = this.props.actions;
		//const a = require('uuid/v5');
		//console.log(uuid.v4());
		//console.log(this.props);
		return (
			<Router>
				<div>
				<Switch>
					<Route path='/post/:id' render={({match}) => (
						<PostEditor post = {posts.find(post => post.id  == match.params.id)} actions={actions}/>
					)}/>
					<Route exact={true} path='/'render={({match}) => (
						<PostList posts = {posts.filter(post => !post['deleted'])}search={actions.findByName} />
					)} />
					<Route path='/add-post' render={({match}) => (
						<PostEditor post = {{}} actions={actions}/>
					)}/>
					<Route path='/upload' render={({match}) => (
						<div>upload file</div>
					)}/>
				</Switch>
				</div>				
			</Router>
		);
	}
}

function mapStateToProps (state) {
	return {
		posts: state
	}
}

function mapDispatchToProps (dispatch) {
  return { 
	actions: {
		editPost: bindActionCreators(editPost, dispatch),
		removePost:  bindActionCreators(removePost, dispatch),
		addPost:  bindActionCreators(addPost, dispatch)
	}
	
  }
 }
export default connect(mapStateToProps, mapDispatchToProps)(App)