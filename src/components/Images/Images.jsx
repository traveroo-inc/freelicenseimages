import React from 'react';

import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy.svg';
import './Images.scss';

class Images extends React.Component {
    state = {
        width: 'is1to4',
        images: this.props.images || [],
        clickIndex: null,
        sidebar: null,
    }

    joinArray = (arr, size) => {
        let result = [];
        let col = Math.ceil(arr.length / size);

        for(var i = 0; i < size; i++) {
            result.push(arr.slice(i * col, i * col + col));
        }

        return result;
    }

    handleImageClick = (event) => {
        let index = Number(event.target.getAttribute('data-index'));

        this.setState({
            width: this.state.clickIndex !== index ? 'is1to3' : 'is1to4',
            clickIndex: this.state.clickIndex !== index ? index : null,
            sidebar: this.state.clickIndex !== index ? this.props.images[index] : null,
        });
    }
    
	render() {
        const childElements = this.props.images.map((img, index) => {
            return (
                <li className={`Images-item Images-${this.state.width}`} key={index}>
                    <img src={img.url[img.url.length - 1]} alt="" data-index={index} onClick={this.handleImageClick} />
                    <span>{img.title || null}</span>
                    <span>{img.site || null}</span>
                </li>
            );
        });

		return (
			<div className="Images-root">
                <div className="Images-wrap">
                    <div className="Images-gallery">
                        {childElements}
                    </div>
                    {this.state.sidebar && <div className="Images-sidebar Sidebar-root">
                        <div className="Sidebar-cover">
                            <img src={this.state.sidebar.url[this.state.sidebar.url.length - 1]} alt="" />
                        </div>
                        <div className="Sidebar-info">
                            <div className="Sidebar-infoControl">
                                <div className="Control-root">
                                    <a href="/" className="Control-link" target="_blank" rel="noopener noreferrer">
                                        <div className="Link-root Link-button-1">
                                            <span className="Link-logo">
                                                <LinkIcon />
                                            </span>
                                            <span className="Link-text">{this.state.sidebar.resurs}</span>
                                        </div>
                                    </a>
                                    <a href={this.state.sidebar.url[0]} className="Link-root Link-download" target="_blank" rel="noopener noreferrer">
                                        <span className="Link-logo">
                                            <DownloadIcon />
                                        </span>
                                    </a>
                                    <a href="/" className="Link-root Link-copy" target="_blank" rel="noopener noreferrer">
                                        <span className="Link-logo">
                                            <CopyIcon />
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="Sidebar-infoTitle">{this.state.sidebar.title}</div>
                        </div>
                    </div>}
                </div>
            </div>
		);
	}
}

export default Images;
