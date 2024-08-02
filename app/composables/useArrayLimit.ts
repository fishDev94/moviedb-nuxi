const useArrayLimit = <T>(
    n: number,
    data: T
  ): T => {
    return (data as T as unknown[]).filter((_, i: number) => i < n) as T;
  };

  export default useArrayLimit;