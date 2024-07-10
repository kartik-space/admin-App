import { useQuery } from '@tanstack/react-query';
import { getAvailableDrivers } from '../service/admin';

interface Driver {
    _id: string;
    name: string;
    phone: string;
    carNumber: string;
  }
  

const useAvailableDrivers = () => {
  const { data, isLoading, error, refetch } = useQuery<Driver[], Error>({
    queryKey: ['available-drivers'],
    queryFn: getAvailableDrivers,
  });

  return { availableDrivers: data, isLoading, error, refetch };
};

export default useAvailableDrivers;
