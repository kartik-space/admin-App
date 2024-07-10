import { useQuery } from '@tanstack/react-query';
import { getCabOrders } from '../service/admin';

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

const useCabOrders = () => {
  const { data, isLoading, error, refetch } = useQuery<Order[], Error>({
    queryKey: ['cab-orders'],
    queryFn: getCabOrders,
  });

  return { cabOrders: data, isLoading, error, refetch };
};

export default useCabOrders;
