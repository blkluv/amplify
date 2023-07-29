import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";



type EagerOrderItem = {
  readonly id?: string | null;
  readonly quantity?: number | null;
  readonly price?: number | null;
  readonly productID?: string | null;
}

type LazyOrderItem = {
  readonly id?: string | null;
  readonly quantity?: number | null;
  readonly price?: number | null;
  readonly productID?: string | null;
}

export declare type OrderItem = LazyLoading extends LazyLoadingDisabled ? EagerOrderItem : LazyOrderItem

export declare const OrderItem: (new (init: ModelInit<OrderItem>) => OrderItem)

type EagerAddress = {
  readonly id?: string | null;
  readonly recipientName?: string | null;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly postalCode?: string | null;
  readonly country?: string | null;
}

type LazyAddress = {
  readonly id?: string | null;
  readonly recipientName?: string | null;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly postalCode?: string | null;
  readonly country?: string | null;
}

export declare type Address = LazyLoading extends LazyLoadingDisabled ? EagerAddress : LazyAddress

export declare const Address: (new (init: ModelInit<Address>) => Address)

type EagerAuditLogs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AuditLogs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly model?: string | null;
  readonly opType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAuditLogs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AuditLogs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly model?: string | null;
  readonly opType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AuditLogs = LazyLoading extends LazyLoadingDisabled ? EagerAuditLogs : LazyAuditLogs

export declare const AuditLogs: (new (init: ModelInit<AuditLogs>) => AuditLogs) & {
  copyOf(source: AuditLogs, mutator: (draft: MutableModel<AuditLogs>) => MutableModel<AuditLogs> | void): AuditLogs;
}

type EagerCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
  };
  readonly id: string;
  readonly createdAt?: number | null;
  readonly updatedAt?: number | null;
  readonly Products?: (Product | null)[] | null;
}

type LazyCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
  };
  readonly id: string;
  readonly createdAt?: number | null;
  readonly updatedAt?: number | null;
  readonly Products: AsyncCollection<Product>;
}

export declare type Cart = LazyLoading extends LazyLoadingDisabled ? EagerCart : LazyCart

export declare const Cart: (new (init: ModelInit<Cart>) => Cart) & {
  copyOf(source: Cart, mutator: (draft: MutableModel<Cart>) => MutableModel<Cart> | void): Cart;
}

type EagerInventory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly location?: Address | null;
  readonly lastUpdated?: number | null;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInventory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly location?: Address | null;
  readonly lastUpdated?: number | null;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Inventory = LazyLoading extends LazyLoadingDisabled ? EagerInventory : LazyInventory

export declare const Inventory: (new (init: ModelInit<Inventory>) => Inventory) & {
  copyOf(source: Inventory, mutator: (draft: MutableModel<Inventory>) => MutableModel<Inventory> | void): Inventory;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly price?: string | null;
  readonly category?: string | null;
  readonly productTags?: (string | null)[] | null;
  readonly Inventories?: (Inventory | null)[] | null;
  readonly cartID?: string | null;
  readonly productImages?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly price?: string | null;
  readonly category?: string | null;
  readonly productTags?: (string | null)[] | null;
  readonly Inventories: AsyncCollection<Inventory>;
  readonly cartID?: string | null;
  readonly productImages?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shippingAddress?: Address | null;
  readonly billingAddress?: Address | null;
  readonly totalAmount?: number | null;
  readonly status?: string | null;
  readonly items?: (OrderItem | null)[] | null;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shippingAddress?: Address | null;
  readonly billingAddress?: Address | null;
  readonly totalAmount?: number | null;
  readonly status?: string | null;
  readonly items?: (OrderItem | null)[] | null;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly dateOfBirth?: string | null;
  readonly email?: string | null;
  readonly billingAddress?: Address | null;
  readonly shippingAddress?: (Address | null)[] | null;
  readonly profileImage?: string | null;
  readonly gender?: string | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Cart?: Cart | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly customerCartId?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly dateOfBirth?: string | null;
  readonly email?: string | null;
  readonly billingAddress?: Address | null;
  readonly shippingAddress?: (Address | null)[] | null;
  readonly profileImage?: string | null;
  readonly gender?: string | null;
  readonly Orders: AsyncCollection<Order>;
  readonly Cart: AsyncItem<Cart | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly customerCartId?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}