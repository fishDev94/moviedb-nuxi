const useImageUrl = (path: string | undefined, isLarge: boolean = false): string => {
    const size = isLarge ? "w1280" : "w300"
    const base_url = `https://image.tmdb.org/t/p/${size}`
    
    if (path) {
        return base_url + path;
    }
 return "https://critics.io/img/movies/poster-placeholder.png";
}

export default useImageUrl;