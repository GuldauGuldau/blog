import React from 'react';
import './social.less';
import rating from './rating.svg';
import share from './share.svg';
import view from './view.svg';

export default function  social () {
	return (
		<div className="post__social">
			<a href="" className="post__socialitem">
				<img src={ view} />
				21
			</a>
			<a href="" className="post__socialitem">
				<img src={rating} />
				5.0
			</a>
			<a href="" className="post__socialitem">
				<img src={share} />
				15
			</a>
		</div>

	);
}