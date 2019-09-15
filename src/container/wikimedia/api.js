export const getPhotos = async (text = '', page = 1) => {
    let response = await fetch(`https://commons.wikimedia.org/w/api.php?prop=pageimages|imageinfo|info|redirects&gsrnamespace=6&pilimit=max&pithumbsize=1000&iiprop=extmetadata&iiextmetadatafilter=ImageDescription&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:${text}&gsrlimit=20&gsroffset=${page * 20}&origin=*`, {});
    let data = await response.json();
    
    return data;
}
