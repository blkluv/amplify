/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCart = /* GraphQL */ `
  mutation CreateCart(
    $input: CreateCartInput!
    $condition: ModelCartConditionInput
  ) {
    createCart(input: $input, condition: $condition) {
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
export const updateCart = /* GraphQL */ `
  mutation UpdateCart(
    $input: UpdateCartInput!
    $condition: ModelCartConditionInput
  ) {
    updateCart(input: $input, condition: $condition) {
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
export const deleteCart = /* GraphQL */ `
  mutation DeleteCart(
    $input: DeleteCartInput!
    $condition: ModelCartConditionInput
  ) {
    deleteCart(input: $input, condition: $condition) {
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
export const createInventory = /* GraphQL */ `
  mutation CreateInventory(
    $input: CreateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    createInventory(input: $input, condition: $condition) {
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
export const updateInventory = /* GraphQL */ `
  mutation UpdateInventory(
    $input: UpdateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    updateInventory(input: $input, condition: $condition) {
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
export const deleteInventory = /* GraphQL */ `
  mutation DeleteInventory(
    $input: DeleteInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    deleteInventory(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
