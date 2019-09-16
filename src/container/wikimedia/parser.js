export const parseUrl = data => {
    if (!data.query) return [];

    let result = Object.keys(data.query.pages)
        .map((key, index) => ({
            url: [data.query.pages[key].thumbnail.source].filter(item => item !== undefined || null),
            resurs: 'wikimedia',
            site: 'commons.wikimedia.com',
            fullUrl: data.query.pages[key].fullurl || null,
            title: data.query.pages[key].title || 'No Title',
        }))
        .filter(item => (
            item.url !== undefined
        ));

    return result;
}