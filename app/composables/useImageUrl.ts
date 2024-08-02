const useImageUrl = (path: string | undefined): string => {
    const base_url = "https://image.tmdb.org/t/p/w500"
    
    if (path) {
        return base_url + path;
    }
 return "https://critics.io/img/movies/poster-placeholder.png";
}

export default useImageUrl;