import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import Config from '../../config';
import SearchBar from '../../components/SearchBar/SearchBar';
import Images from '../../components/Images/Images';
import { ReactComponent as LogoIcon } from '../../assets/logo2.svg';

import * as flickrApi from '../../container/flickr/api';
import * as unsplashApi from '../../container/unsplash/api';
import * as wikimediaApi from '../../container/wikimedia/api';
import * as flickrParse from '../../container/flickr/parser';
import * as unsplashParse from '../../container/unsplash/parser';
import * as wikimediaParse from '../../container/wikimedia/parser';

class IndexController extends React.Component {
	state = {
		params: queryString.parse(this.props.location.search) || '',
		value: queryString.parse(this.props.location.search).text || '',
		images: [],
		page: 1,
		hasScroll: true,
	}

	componentDidMount() {
		this.onFetch(this.state.value, this.state.page);
		window.addEventListener('scroll', this.handleScroll)
	}

	UNSAFE_componentWillReceiveProps(p) {
		this.setState({
			value: queryString.parse(p.location.search).text || '',
		});
	}

	zeroImages = () => {
		this.setState({
			images: [],
			page: 1,
		}, () => {
			this.onFetch(this.state.value, this.state.page);
		});
	}
	
	onFetch = async (value, page) => {
		this.setState({
			hasScroll: false,
		});

		let flickrResponse = await flickrApi.getPhotos(value, page);
		let unsplashResponse = await unsplashApi.getPhotos(value, page);
		let wikimediaResponse = await wikimediaApi.getPhotos(value, page);
		
		let imagesApiResult = [
			...flickrParse.parseUrl(flickrResponse),
			...unsplashParse.parseUrl(unsplashResponse),
			...wikimediaParse.parseUrl(wikimediaResponse)
		];

		this.setState({
			hasScroll: true,
			images: [...this.state.images, ...imagesApiResult],
			page: this.state.page + 1,
		});
	}
	
	handleScroll = () => {
		if ((window.pageYOffset > document.getElementById('root').offsetHeight - window.innerHeight  - 300) && this.state.hasScroll) {
			this.onFetch(this.state.value, this.state.page);
		}
	}

	render() {
		return (
			<div className="SearchController-root">
				<div className="SearchController-logo">
					<Link to={`${Config.hostUrl}`} className="Icon-root Icon-link">
						<LogoIcon className="Icon-root" />
					</Link>
				</div>
				<div className="SearchController-search">
					<SearchBar value={this.state.value} onFetch={this.onFetch} {...this.props} onZeroImages={this.zeroImages} />
				</div>
				<div className="SearchController-result">
					<Images images={this.state.images} loading={this.state.hasScroll} /> 
				</div>
			</div>
		);
	}
}

export default IndexController;
