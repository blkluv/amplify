/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart($filter: ModelSubscriptionCartFilterInput) {
    onCreateCart(filter: $filter) {
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart($filter: ModelSubscriptionCartFilterInput) {
    onUpdateCart(filter: $filter) {
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart($filter: ModelSubscriptionCartFilterInput) {
    onDeleteCart(filter: $filter) {
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
export const onCreateInventory = /* GraphQL */ `
  subscription OnCreateInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onCreateInventory(filter: $filter) {
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
export const onUpdateInventory = /* GraphQL */ `
  subscription OnUpdateInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onUpdateInventory(filter: $filter) {
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
export const onDeleteInventory = /* GraphQL */ `
  subscription OnDeleteInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onDeleteInventory(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
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
