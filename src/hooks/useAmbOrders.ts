import { useQuery } from '@tanstack/react-query';
import { getAmbulanceOrders } from '../service/admin';

interface Order {
  _id: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  startAddress: string;
  endAddress: string;
  date: string;
  time: string;
  driver: string;
  status: string;
  user: {
    name: string;
    phoneNo: string;
  };
}

const useAmbOrders = () => {
  const { data, isLoading, error, refetch } = useQuery<Order[], Error>({
    queryKey: ['amb-orders'],
    queryFn: getAmbulanceOrders,
  });

  return { cabOrders: data, isLoading, error, refetch };
};

export default useAmbOrders;
