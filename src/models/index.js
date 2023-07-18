// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Cart, Inventory, Product, Order, Customer, OrderItem, Address } = initSchema(schema);

export {
  Cart,
  Inventory,
  Product,
  Order,
  Customer,
  OrderItem,
  Address
};