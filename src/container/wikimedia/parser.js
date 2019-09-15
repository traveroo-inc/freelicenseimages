export const parseUrl = data => {
    if (!data.query) return [];

    let result = Object.keys(data.query.pages)
        .map((key, index) => ({
            url: [data.query.pages[key].thumbnail.source].filter(item => item !== undefined || null),
            resurs: 'wikimedia',
            site: 'commons.wikimedia.com',
            title: data.query.pages[key].title || 'No Title',
        }))
        .filter(item => (
            item.url !== undefined
        ));

    return result;
}