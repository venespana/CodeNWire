import { useQuery } from '@tanstack/react-query';

export const useCheckDependencies = (dependencies: string[]) => {
  return useQuery({
    queryKey: ['check-dependencies', ...dependencies],
    queryFn: async () => {
      const items = await Promise.all(
        dependencies.map(async item => ({
          id: item,
          result: await window.api.doctorCheckDependencies({ id: item }),
        }))
      );

      return items;
    },
  });
};
