import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import './Images.scss';
import { ReactComponent as LoaderIcon } from '../../assets/loader.svg';

class Images extends React.Component {
    state = {
        width: 'is1to4',
        images: this.props.images || [],
        clickIndex: null,
        sidebar: null,
        activePrevImage: null,
        activeNextImage: null,
        showAlert: false,
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
        event.target.parentNode.parentNode.classList.toggle('active');
        window.scrollBy(0, event.target.parentNode.parentNode.getBoundingClientRect().top - 24);
        

        this.setState({
            width: this.state.clickIndex !== index ? 'is1to3' : 'is1to4',
            clickIndex: this.state.clickIndex !== index ? index : null,
            sidebar: this.state.clickIndex !== index ? this.props.images[index] : null,
            activePrevImage: this.state.clickIndex !== index ? event.target.parentNode.parentNode : null,
        });
        
        this.state.activePrevImage && this.state.activePrevImage.classList.remove('active');
    }

    onSibebarExit = () => {
        this.state.activePrevImage && this.state.activePrevImage.classList.remove('active');

        this.setState({
            sidebar: null,
            clickIndex: null,
            activePrevImage: null,
        });
    }
    
    handleClipboard = () => {
        this.setState({
            showAlert: true,
        });

        setTimeout(() => {
            this.setState({
                showAlert: false,
            });    
        }, 1000)
    }

    handleDownload = () => {
        this.convertImgToBase64URL(this.state.sidebar.url[0], base64 => {
            var element = document.createElement('a');
            element.setAttribute('href', base64);
            element.setAttribute('download', 'image.jpg');
        
            element.style.display = 'none';
            document.body.appendChild(element);
        
            element.click();
        
            document.body.removeChild(element);
        });
    }

    convertImgToBase64URL = (url, callback, outputFormat) => {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null; 
        };
    
        img.src = url;
    }
    
	render() {
        const childElements = this.props.images.map((img, index) => {
            return (
                <li className={`Images-item`} key={index}>
                    <div className="Images-overlay">
                        <img src={img.url[img.url.length - 1]} alt="" data-index={index} onClick={this.handleImageClick} />
                    </div>
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
                        {(!this.props.loading) && <LoaderIcon className="Icon-loader" />}
                    </div>
                    {this.state.sidebar && <div className="Images-sidebar Sidebar-root">
                        <div className="Sidebar-cover">
                            <img src={this.state.sidebar.url[0]} alt="" />
                            {this.state.showAlert && (
                                <div className="Sidebar-copyOverlay">Ссылка скопирована</div>
                            )}
                        </div>
                        <div className="Sidebar-info">
                            <div className="Sidebar-infoControl">
                                <div className="Control-root">
                                    <a href={this.state.sidebar.fullUrl} className="Control-link" target="_blank" rel="noopener noreferrer">
                                        <div className="Link-root Link-button-1">
                                            <span className="Link-logo">
                                                <LinkIcon />
                                            </span>
                                            <span className="Link-text">{this.state.sidebar.resurs}</span>
                                        </div>
                                    </a>
                                    <span data-href={this.state.sidebar.url[0]} download="Test" className="Link-root Link-download" rel="noopener noreferrer" onClick={this.handleDownload}>
                                        <span className="Link-logo">
                                            <DownloadIcon />
                                        </span>
                                    </span>
                                    <CopyToClipboard text={this.state.sidebar.url[0]} onCopy={this.handleClipboard}>
                                        <span className="Link-root Link-copy" target="_blank" rel="noopener noreferrer">
                                            <span className="Link-logo">
                                                <CopyIcon />
                                            </span>
                                        </span>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="Sidebar-infoTitle">{this.state.sidebar.title}</div>
                        </div>
                        <div className="Sidebar-close">
                            <div className="Sidebar-closeBtn" onClick={this.onSibebarExit}>
                                <CloseIcon />
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
		);
	}
}

export default Images;
