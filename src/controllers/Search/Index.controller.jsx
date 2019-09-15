import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

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
	}

	componentDidMount() {
		this.onFetch(this.state.value);
	}
	
	onFetch = async value => {
		if (value.length > 0) {
			let flickrResponse = await flickrApi.getPhotos(value);
			let unsplashResponse = await unsplashApi.getPhotos(value);
			let wikimediaResponse = await wikimediaApi.getPhotos(value);
			
			let imagesApiResult = [
				...flickrParse.parseUrl(flickrResponse),
				...unsplashParse.parseUrl(unsplashResponse),
				...wikimediaParse.parseUrl(wikimediaResponse)
			];

			this.setState({
				images: [...this.state.images, ...imagesApiResult],
			});
		}
	}

	render() {
		return (
			<div className="SearchController-root">
				<div className="SearchController-logo">
					<Link to="/" className="Icon-root Icon-link">
						<LogoIcon className="Icon-root" />
					</Link>
				</div>
				<div className="SearchController-search">
					<SearchBar value={this.state.value} onFetch={this.onFetch} {...this.props} />
				</div>
				<div className="SearchController-result">
					<Images images={this.state.images} />
				</div>
			</div>
		);
	}
}

export default IndexController;
