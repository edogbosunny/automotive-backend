import { mergeResolvers } from '@graphql-tools/merge';
import { vehicleResolver } from './vehicleResolver';
import { customerResolver } from './customerResolver';
import { saleResolver } from './saleResolver';
import { dealershipResolver } from './dealershipResolver';

const resolvers = mergeResolvers([vehicleResolver, customerResolver, saleResolver, dealershipResolver]);

export default resolvers;
