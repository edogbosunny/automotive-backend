import { DealershipService } from '../services/dealershipService';

export const dealershipResolver = {
  Query: {
    dealerships: async () => {
      return DealershipService.getDealerships();
    },
    dealership: async (_: any, { id }: any) => {
      return DealershipService.getDealershipById(id);
    },
  },
  Mutation: {
    addDealership: async (_: any, { name, apiKey, parentId }: any) => {
      return DealershipService.addDealership(name, apiKey, parentId);
    },
    updateDealership: async (_: any, { id, name, apiKey, parentId }: any) => {
      return DealershipService.updateDealership(id, name, apiKey, parentId);
    },
    deleteDealership: async (_: any, { id }: any) => {
      return DealershipService.deleteDealership(id);
    },
  },
};
