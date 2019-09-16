export const parseUrl = data => {
    if (!data.photos) return [];
    
    let result = data.photos.photo
        .map(item => ({
            url: [item.url_c, item.url_l, item.url_m, item.url_n, item.url_q, item.url_s, item.url_sq, item.url_t, item.url_z].filter(item => item !== undefined || null),
            resurs: 'flickr',
            site: 'flickr.com',
            fullUrl: `https://www.flickr.com/photos/${item.owner}/${item.id}`,
            title: item.title || 'No Title',
        }))
        .filter(item => (
            item.url !== undefined
        ));

    return result;
}