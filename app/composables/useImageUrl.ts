const useImageUrl = (path: string | undefined, {isLarge = false, w = "w500" } : { isLarge?: boolean, w?: string}): string => {
    const size = isLarge ? "original" : w
    const base_url = `https://image.tmdb.org/t/p/${size}`
    
    if (path) {
        return base_url + path;
    }
 return "https://critics.io/img/movies/poster-placeholder.png";
}

export default useImageUrl;