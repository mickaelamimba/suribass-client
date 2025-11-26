import useSWR from "swr"
import { homeApi } from "../api/home.api"
import type { HomeDataDto } from "../api/home.types"

export const useHomeData = () => {
  const { data, error, isLoading, mutate } = useSWR<HomeDataDto>(
    "/home",
    () => homeApi.getHomeData(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache pendant 1 minute
    }
  )

  return {
    homeData: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
