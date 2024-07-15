export const useFishFetch = async <T>(
  url: string,
  options: Record<string, any>
): Promise<T | undefined> => {
  const config = useRuntimeConfig();

  try {
    const { data } = await useFetch<T>(url, {
      ...options,
      baseURL: options.baseURL || "https://api.themoviedb.org/3/",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${config.public.accessToken}`,
      },
    });

    if (data.value) {
      return data as T;
    }

    throw new Error("Fetch failed");
  } catch (error) {
    console.log("sono qui", error);
  }
};
