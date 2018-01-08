import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import Header from '../header/header.jsx';
import ReactQuill from 'react-quill';
import Seo from '../seo/seo.jsx';
import {Link} from 'react-router-dom';
import { editPost } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import Popup from 'react-popup';
import './quill.snow.less';
import './postEditor.less';
import uuid from 'node-uuid';

export default class PostEditor extends React.Component {
constructor(props) {
	super(props);
	this.djsConfig = {
		thumbnailWidth: "1000",
		thumbnailHeight: "500",
		thumbnailMethod: 'contain',
		autoProcessQueue: true,
		maxFiles: 1,
		 multiple: false,
		previewTemplate: ReactDOMServer.renderToStaticMarkup(
		<div className="dz-preview dz-file-preview">
		  <div className="dz-details">
			<div className="dz-image"><img data-dz-thumbnail="true" /></div>
		  </div>
		  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
		 <a className="dz-remove" href="javascript:undefined;" data-dz-remove=""><img src="/static/img/deletefile.svg"/></a>
		  <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
		</div>
	  ),
	  dictDefaultMessage: ReactDOMServer.renderToStaticMarkup(
		<div className="emptyArea">
			<img src="static/img/download.svg"/>
			<div className="emptyArea__title">Featured image</div>
			<div className="emptyArea__subtitle">select an image file to upload or drag it here</div>
			<div className="emptyArea__txt">Please see the requirements for our Featured image. If you are unsure what image you should select,<br />
	do not upload anything. Our editor will upload an appropriate image when reviewing your post.</div>
		</div>
		)
	};

	this.editorModules = {
		toolbar: [
		[{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
		[{size: []}],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{'list': 'ordered'}, {'list': 'bullet'}, 
		 {'indent': '-1'}, {'indent': '+1'}],
		['link', 'image', 'video'],
		['clean']
		],
		clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
		}
	}

	this.componentConfig = {
		 iconFiletypes: ['.jpg', '.png', '.gif'],
		showFiletypeIcon: true,
		postUrl: '/upload'
	};

	this.dropzone = null;
	
	this.state = { 
		postTitle: this.props.post.title ? this.props.post.title: 'The title of the new post',
		postText: this.props.post.text ? this.props.post.text: '',
		postTeaser: this.props.post.teaser ? this.props.post.teaser: '',
		postMetaTitle:this.props.post.metaTitle ? this.props.post.metaTitle: '',
		postMetaDescription: this.props.post.metaDescription ? this.props.post.propsMetaDescription: '',
		postMetaKeyword:this.props.post.metaKeyword ? this.props.post.metaKeyword: '',
		redirect: ''
		
	} 
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleRemove = this.handleRemove.bind(this);
}
		
	handleFileAdded(file) {
		//console.log(file);
	}
	
	// only 1 file for upload
	handleMaxfilesexceeded(file) {
		this.dropzone.removeAllFiles();
		this.dropzone.addFile(file);
	}
	
	createThumbnailFromUrl(filename) {
		if(filename) {
			const mockfile = { name: "Filename", size: 12345,accepted: true,type: 'image' }
			this.dropzone.emit("addedfile", mockfile);
			this.dropzone.files.push( mockfile);
			this.dropzone.emit("thumbnail", mockfile, "static/img/"+filename);
		}
		
		
	}
	handleChangeText(value) {
		this.setState({postText : value })
	}

  
  	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	//save change for post/create post
	handleSubmit(event)  {
		event.preventDefault();
		const nid = uuid.v4()
		let post = {
			id: this.props.post.id ? this.props.post.id  : nid,
			title: this.state.postTitle,
			metaTitle: this.state.postMetaTitle,
			text: this.state.postText,
			teaser: this.state.postTeaser,
			metaDescription: this.state.postMetaDescription,
			metaKeyWord: this.state.postMetaKeyword
		}
		
		if(this.props.post.id) {
			this.props.actions.editPost(post);
			Popup.alert('Saved successfully!');
		} else {
			this.props.actions.addPost(post);
			Popup.create({
				content: 'Saved successfully!',
				buttons: {
				
					right: [{
						text: <Link to={'post/'+nid} >Ok</Link>,
						className: 'success',
						action: function () {
							Popup.close();
						}
					}]
				}
			});
		}
	};
	
	//remove post
	handleRemove() {
		this.props.actions.removePost(this.props.post.id);
		this.setState({redirect : '/'});
	}
	render() {
		const post = this.props.post;
		
		const config = this.componentConfig;
		const djsConfig = this.djsConfig;
		const editorModulses = this.editorModules;
		
		const eventHandlers = {
			init: dz => {
						this.dropzone = dz;
						if(post.img !== 'default.jpg')
							this.createThumbnailFromUrl(post.img) 
					},
			addedfile: this.handleFileAdded.bind(this),
			maxfilesexceeded: this.handleMaxfilesexceeded.bind(this)
		}
		
		 const colorStatus = {
				'published': 'white',
				'approved': 'green',
				'draft' : 'black',
				'rejected':'red',
				'needs editing':'purple',
				'waiting for review': 'orange',
				'under review':'blue'
			}

		return (
			
			<div className="editor">
				{this.state.redirect == '/' && <Redirect to={{pathname: '/'}}/>}
				<Popup />
				<Header />
				<form onSubmit={this.handleSubmit }>
					<div className="editor__head">
						<div className="container">
							<div className="editor__headwrap">
								<Link to="/" className="editor__link"><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
								<div className="editor__title">
									<input 
									//ref={input => { this.input = input; }} 
									type="text"  
									value={this.state.postTitle} 
									name="postTitle" 
									onChange={(e) => this.handleChange(e)}
									autoFocus
									/>
									</div>
							</div>
						</div>
					</div>
					
					<div className="editor__row">
						<div className="container">
							<div className="flexWrap">
								<div className="author">
									<img src="static/img/avatar.png" />
									{post.author ? post.author : 'Hellen Wilson'}
								</div>
								<div className={'editor__status '+colorStatus[post.status]}>{post.status}</div>
							</div>
						</div>
					</div>
					
					<div className="editor__cover">
						<div className="container">
							<DropzoneComponent config={config}
							eventHandlers={eventHandlers}
							djsConfig={djsConfig}						
							/>
						</div>
					</div>
					
					<div className="editor__quill">
						<div className="container">
							<ReactQuill 
								value={this.state.postText}
								onChange={(e) => this.handleChangeText(e)}
								modules={editorModulses}
								/>
						</div>
					</div>
					
					<div className="editor__field">
						<div className="container">
							<div className="editor__label">Teaser</div>
							<textarea 
								type="text"  
								value={this.state.postTeaser} 
								name="postTeaser"
								onChange={(e) => this.handleChange(e)}
								className="editor__input"
								rows="6"
								>
							</textarea>
						</div>
					</div>
					
					<div className="editor__seo">
						<div className="container">
							<div className="editor__subtitle">SEO information</div>
							<div className="editor__desc">
								Here you can specify information that will help search engines 
								discover your post and display it in search results. It is also used when sharing<br />
								a post on social media.  If you're unsure, leave the fields empty.
							</div>
							<div className="grid">
								<Seo post={post}/>
								<Seo post={post}/>
								<Seo post={post}/>
							</div>
						</div>
					</div>
					
					<div className="editor__field">
						<div className="container">
							<div className="editor__label">Meta Title</div>
							<input 
								type="text"  
								value={this.state.postMataTitle} 
								name="postMetaTitle" 
								onChange={(e) => this.handleChange(e)}
								className="editor__input"
								/>
						</div>
					</div>
					
					<div className="editor__field">
						<div className="container">
							<div className="editor__label">Meta description</div>
							<textarea 
								type="text"  
								value={this.state.postMetaDescription} 
								name="postMetaDescription" 
								onChange={(e) => this.handleChange(e)}
								className="editor__input"
								placeholder="With SEMrush Organic Research data, you will  find the best SEO keywords and get a higher ranking."
								rows="4"
								>
							</textarea>
						</div>
					</div>
					
					<div className="editor__field">
						<div className="container">
							<div className="editor__label">Meta keywords</div>
							<textarea
								type="text"  
								value={this.state.postMetaKeyword} 
								name="postMetaKeyword" 
								onChange={(e) => this.handleChange(e)}
								className="editor__input"
								placeholder="SEO, SEMrush, organic research"
								rows="4"
								>
							</textarea>
						</div>
					</div>
					
					<div className="editor__footer">
						<div className="container">
							<div className="editor__actionBlock">
								{post.id ?
								<div className="trnsBtn" onClick={this.handleRemove}><img src="static/img/deletered.svg"/>Delete post</div>
								: <Link to="/" className="trnsBtn">Cansel</Link>}
								<button type="submit" className="actionBtn actionBtn__green">Save</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			
			
		);
	}
}
