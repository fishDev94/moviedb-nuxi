export const useFishFetch = async <T>(
  url: string,
  options: Record<string, any>
): Promise<T | undefined> => {
  const config = useRuntimeConfig();

  try {
    const accessToken = config.public.accessToken;
    if (!accessToken) {
      throw new Error(
        "Access token is undefined. Please specify a valid access token"
      );
    }
    const { data } = await useFetch<T>(url, {
      ...options,
      baseURL: options.baseURL || "https://api.themoviedb.org/3/",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data.value) {
      return data as T;
    }

    throw new Error("Fetch failed");
  } catch (error) {
    console.error(error);
  }
};
