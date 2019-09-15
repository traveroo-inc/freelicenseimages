import Config from '../../config';

export const getPhotos = async (text = '', page = 1) => {
    let response = await fetch(`https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=url_k%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z%2Crealname&page=${page}&per_page=20&method=flickr.photos.search&format=json&nojsoncallback=1&text=${text}&api_key=${Config.api_key.flickr}`, {});
    let data = await response.json();
    
    return data;
}
