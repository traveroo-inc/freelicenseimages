import Config from '../../config';

export const getPhotos = async (text = '', page = 1) => {
    let response = await fetch(`https://api.unsplash.com/search/photos/?page=${page}&per_page=20&query=${text}&client_id=${Config.api_key.unsplash}`, {});
    let data = await response.json();
    
    return data;
}
