import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  price: number;
  available: boolean;
  branchId: string;
}

export function useVehicles() {
  const queryClient = useQueryClient();

  const { data: vehicles, isLoading, error } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await api.get('/vehicles');
      return response.data;
    },
  });

  const createVehicle = useMutation({
    mutationFn: async (newVehicle: Omit<Vehicle, 'id'>) => {
      const response = await api.post('/vehicles', newVehicle);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });

  const updateVehicle = useMutation({
    mutationFn: async ({ id, ...vehicle }: Vehicle) => {
      const response = await api.put(`/vehicles/${id}`, vehicle);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });

  const deleteVehicle = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/vehicles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });

  return {
    vehicles,
    isLoading,
    error,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
} 