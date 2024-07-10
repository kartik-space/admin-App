import { useMutation, useQueryClient } from '@tanstack/react-query';
import { allotDriver } from '../service/admin';

export const useAllotDriver = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ driverId, cabOrderId }: { driverId: string; cabOrderId: string }) => 
      allotDriver(driverId, cabOrderId),
    onSuccess: () => {
      queryClient.invalidateQueries('available-drivers');
      queryClient.invalidateQueries('cab-orders');
    },
  });

  return mutation;
};
