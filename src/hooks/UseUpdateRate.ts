import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { updateRate, UpdateRateParams } from '../service/admin';

// Define the return type of the mutation function
type UpdateRateResponse = any; // Replace with the actual type returned by `updateRate` if known

export interface UseUpdateRate {
  mutate: (params: UpdateRateParams) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export const useUpdateRate = (): UseUpdateRate => {
  // Specify the type arguments to useMutation
  const mutation: UseMutationResult<UpdateRateResponse, Error, UpdateRateParams, unknown> = useMutation<
    UpdateRateResponse,
    Error,
    UpdateRateParams
  >(updateRate, {
    onSuccess: (data: UpdateRateResponse) => {
      console.log('Rate updated successfully:', data);
      // Handle success notification or state update here
    },
    onError: (error: Error) => {
      console.error('Error updating rate:', error.message);
      // Handle error notification here
    },
  });

  // Return the mutation object with the correct properties
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
