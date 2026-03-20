export const ROLE_PERMISSIONS = {
  owner: ["*"],

  admin: [
    "products",
    "sales",
    "inventory",
  ],

  seller: [
    "sales"
  ],

  "stock-man": [
    "inventory"
  ]
}