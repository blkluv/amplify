/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCart = /* GraphQL */ `
  query GetCart($id: ID!) {
    getCart(id: $id) {
      id
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
        __typename
      }
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCarts = /* GraphQL */ `
  query SyncCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCarts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getInventory = /* GraphQL */ `
  query GetInventory($id: ID!) {
    getInventory(id: $id) {
      id
      quantity
      location {
        id
        recipientName
        street
        city
        state
        postalCode
        country
        __typename
      }
      lastUpdated
      productID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listInventories = /* GraphQL */ `
  query ListInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quantity
        lastUpdated
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncInventories = /* GraphQL */ `
  query SyncInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInventories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        quantity
        lastUpdated
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const inventoriesByProductID = /* GraphQL */ `
  query InventoriesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inventoriesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        lastUpdated
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      category
      tags
      Inventories {
        nextToken
        startedAt
        __typename
      }
      cartID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        category
        tags
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        price
        category
        tags
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const productsByCartID = /* GraphQL */ `
  query ProductsByCartID(
    $cartID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCartID(
      cartID: $cartID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        price
        category
        tags
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      shippingAddress {
        id
        recipientName
        street
        city
        state
        postalCode
        country
        __typename
      }
      billingAddress {
        id
        recipientName
        street
        city
        state
        postalCode
        country
        __typename
      }
      totalAmount
      status
      createdAt
      updatedAt
      items {
        id
        quantity
        price
        productID
        __typename
      }
      customerID
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalAmount
        status
        createdAt
        updatedAt
        customerID
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        totalAmount
        status
        createdAt
        updatedAt
        customerID
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const ordersByCustomerID = /* GraphQL */ `
  query OrdersByCustomerID(
    $customerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCustomerID(
      customerID: $customerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        totalAmount
        status
        createdAt
        updatedAt
        customerID
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      dateOfBirth
      email
      billingAddress {
        id
        recipientName
        street
        city
        state
        postalCode
        country
        __typename
      }
      shippingAddress {
        id
        recipientName
        street
        city
        state
        postalCode
        country
        __typename
      }
      profileImage
      gender
      Orders {
        nextToken
        startedAt
        __typename
      }
      Cart {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      customerCartId
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        dateOfBirth
        email
        profileImage
        gender
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        customerCartId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCustomers = /* GraphQL */ `
  query SyncCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCustomers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        dateOfBirth
        email
        profileImage
        gender
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        customerCartId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
