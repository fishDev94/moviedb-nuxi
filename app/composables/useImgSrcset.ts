const useImgSrcset = (path: string | undefined, w: string = "w500"): string => {
    const base_url = `https://image.tmdb.org/t/p/${w}/`
    
    if (path) {
        return base_url + path;
    }
 return "https://critics.io/img/movies/poster-placeholder.png";
}

export default useImgSrcset;