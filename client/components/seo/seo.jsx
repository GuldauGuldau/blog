import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import './seo.less';

export default class Seo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: 'auto',
			addTitle: false,
			addLogo: false
		}
		
		this.djsConfig = {
			thumbnailWidth: "1000",
			thumbnailHeight: "500",
			thumbnailMethod: 'contain',
			autoProcessQueue: false,
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
					<div className="emptyArea__subtitle">select an image file to upload or drag it here</div>
				</div>
				)
		};
		
		this.componentConfig = {
			 iconFiletypes: ['.jpg', '.png', '.gif'],
			showFiletypeIcon: true,
			postUrl: '/upload'
		};
		this.dropzone = null;
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTitle = this.handleAddTitle.bind(this);
		this.handleAddLogo = this.handleAddLogo.bind(this);
	}
	
	handleChange(e) {
		this.setState({ image: e.target.getAttribute("name")});
	}
	
	handleAddTitle(e){
		this.setState({ addTitle: !this.state.addTitle});
	}
	handleAddLogo(e){
		this.setState({ addLogo: !this.state.addLogo});
	}
	// only 1 file for upload
	handleMaxfilesexceeded(file) {
		this.dropzone.removeAllFiles();
		this.dropzone.addFile(file);
	}

	getPreviewCaption(post) {
		if(this.state.addTitle || this.state.addLogo) {
			return (
				<div className="caption">
					{this.state.addTitle && <div className="caption__title">{post.title}</div>}
					{this.state.addLogo && <div className="caption__logo"><img src={'static/img/logo.svg'} /></div>}
				</div>
			)
		}
		return;
	}
	
	getPreviewCover(post) {
		const djsConfig = this.djsConfig;
		const config = this.componentConfig;
		const eventHandlers = {
			init: dz => {this.dropzone = dz; },
			maxfilesexceeded: this.handleMaxfilesexceeded.bind(this)
		}
		const img = (post.img) ? post.img : 'default.jpg'
		if(this.state.image == 'auto') {
			return (
				<div> <img src={'static/img/'+img} /></div>
			)
		} else {
			return (
				 <DropzoneComponent 
					djsConfig={djsConfig}
					config={config}
					eventHandlers={eventHandlers}						
				 />
			)
		}
	}
	
	render() {
		const post = this.props.post;
		
		return (
			<div className="seo">
				<div className="seo__title">Image to be displayed on social media</div>
				<div className="seo__checkBlock">
					<div className={this.state.image=='auto' ?  'seo__btn active' : 'seo__btn'} name="auto"  onClick={(e) => this.handleChange(e)}>Create automatically</div>
					<div className={this.state.image=='custom' ?  'seo__btn active' : 'seo__btn'} name="custom" onClick={(e) => this.handleChange(e)}>Upload manually</div>
				</div>
				
				<div className="seo__setting">
				
					<div className="checkbox">
						<label>
							<input type="checkbox" onChange={this.handleAddTitle}/>
							<div className="checkbox__input">
								<span></span>
								<i className="fa fa-check-square" aria-hidden="true"></i>
								Add title
							</div>
							
						</label>
						<label>
							<input type="checkbox" onChange={this.handleAddLogo}/>
							<div className="checkbox__input">
								<span></span>
								<i className="fa fa-check-square" aria-hidden="true"></i>
								Add Logo
							</div>
							
						</label>
					</div>
				</div>
				
				<div className="seo__preview">
					{this.getPreviewCover(post)}
					 {this.getPreviewCaption(post)}
				</div>
			</div>

		);
	}
}