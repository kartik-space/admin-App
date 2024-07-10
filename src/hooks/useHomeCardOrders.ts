import { useQuery } from '@tanstack/react-query';
import { HomeCardOrders } from '../service/admin'; // Assuming you have implemented this function

const useHomeCardOrders = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['home-card-orders'], // Unique key for this query
    queryFn: HomeCardOrders,
  });

  return { homeCardOrders: data, isLoading, error, refetch };
};

export default useHomeCardOrders;
