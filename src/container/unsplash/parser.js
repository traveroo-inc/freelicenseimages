export const parseUrl = data => {
    if (!data.results) return [];
    
    let result = data.results
        .map(item => ({
            url: [item.urls.full, item.urls.raw, item.urls.regular, item.urls.small, item.urls.thumb].filter(item => item !== undefined || null),
            resurs: 'unsplash',
            site: 'unsplash.com',
            fullUrl: item.links.html || null,
            title: item.description || 'No Title',
        }))
        .filter(item => (
            item.url !== undefined
        ));

    return result;
}