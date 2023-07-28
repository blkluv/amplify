// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AuditLogs, Cart, Inventory, Product, Order, Customer, OrderItem, Address } = initSchema(schema);

export {
  AuditLogs,
  Cart,
  Inventory,
  Product,
  Order,
  Customer,
  OrderItem,
  Address
};