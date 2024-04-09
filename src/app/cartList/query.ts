import { gql } from "@urql/next";

export const ADD_CART = gql`
  query GetCartDetails($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalItems
    }
  }
`;

export const FETCH_CART_ITEMS = gql`
  query GetCartDetails($cartId: ID!) {
    cart(id: $cartId) {
      items {
        id
        name
        quantity
        lineTotal {
          formatted
        }
      }
      totalItems

      grandTotal {
        formatted
      }
    }
  }
`;

export const ADD_ITEMS = gql`
  mutation AddItem(
    $cartId: ID!
    $id: ID!
    $name: String
    $description: String
    $price: Int!
    $quantity: Int
  ) {
    addItem(
      input: {
        cartId: $cartId
        id: $id
        name: $name
        description: $description
        price: $price
        quantity: $quantity
      }
    ) {
      id
      totalItems
      items {
        id
        name
        description
        lineTotal {
          formatted
        }
        quantity
      }
    }
  }
`;
