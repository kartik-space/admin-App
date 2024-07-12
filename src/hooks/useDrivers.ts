import { useQuery } from '@tanstack/react-query';
import { getAllDrivers } from '../service/admin';


export const useDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: getAllDrivers,
  });
};
