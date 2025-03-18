export const users = {
    "standard": "standard_user",
    "locked": "locked_out_user",
    "problem": "problem_user",
    "performance":"performance_glitch_user",
    "error": "error_user",
    "visual": "visual_user",
    "invalid": "invalid_user"
}

export const password = {
    "correct": "secret_sauce",
    "incorrect": "incorrect_password"
}

export interface Product {
    name: string | null;
    image: string | null;
    price: string | null;
}

export const randomPeople = [
    {
      "firstName": "James",
      "lastName": "Smith",
      "postalCode": "10001"
    },
    {
      "firstName": "Emily",
      "lastName": "Johnson",
      "postalCode": "30303"
    },
    {
      "firstName": "Michael",
      "lastName": "Williams",
      "postalCode": "60606"
    },
    {
      "firstName": "Sophia",
      "lastName": "Brown",
      "postalCode": "75201"
    },
    {
      "firstName": "Daniel",
      "lastName": "Jones",
      "postalCode": "85004"
    },
    {
      "firstName": "Olivia",
      "lastName": "Miller",
      "postalCode": "19103"
    },
    {
      "firstName": "Matthew",
      "lastName": "Davis",
      "postalCode": "98101"
    },
    {
      "firstName": "Isabella",
      "lastName": "Garcia",
      "postalCode": "33130"
    },
    {
      "firstName": "Ethan",
      "lastName": "Martinez",
      "postalCode": "77002"
    },
    {
      "firstName": "Ava",
      "lastName": "Anderson",
      "postalCode": "20005"
    }
]

export interface Person {
    firstName: string;
    lastName: string;
    postalCode: string;
  }