import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';


class IndexController extends React.Component {
	render() {
		return (
			<div className="MainController-root">
				<div className="MainController-sponsored">Sponsored by:</div>
				<div className="MainController-logo">
					<LogoIcon className="Icon-root" />
				</div>
				<div className="MainController-search">
					<SearchBar {...this.props} />
				</div>
			</div>
		);
	}
}

export default IndexController;
