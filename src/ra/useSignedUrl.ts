import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useDataProvider } from "react-admin";

export const useSignedUrl = (
  {
    bucket,
    filePath,
  }: {
    bucket: string;
    filePath?: string;
  },
  options: Omit<UseQueryOptions<string>, "queryKey" | "queryFn"> = {},
) => {
  const dataProvider = useDataProvider();
  return useQuery<string>({
    queryKey: [bucket, filePath],
    queryFn: async () => {
      const { data } = await dataProvider.getDocumentUrl({
        data: { bucket, filePath },
      });
      return data as string;
    },
    enabled: !!filePath,
    ...options,
  });
};
