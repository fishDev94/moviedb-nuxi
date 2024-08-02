import { useAsyncData } from "#app";
import type { Genre } from "~/app/types/movieDB.type";

export default defineNuxtPlugin(nuxtApp => {
    useAsyncData('genres', () => {
        return useFishFetch<{ genres: Genre[] }>(`genre/tv/list`, {
            params: {
              language: "en",
            },
          })
    })
})