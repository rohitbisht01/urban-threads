export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElement = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter some description about the product",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "athletic", label: "Athletic" },
      { id: "casual", label: "Casual" },
      { id: "formal", label: "Formal" },
      { id: "outerwear", label: "Outerwear" },
      { id: "swimwear", label: "Swimwear" },
      { id: "sleepwear", label: "Sleepwear" },
      { id: "suits", label: "Suits" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "under_armour", label: "Under Armour" },
      { id: "reebok", label: "Reebok" },
      { id: "levi_stras", label: "Levi's" },
      { id: "calvin_klein", label: "Calvin Klein" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "saleprice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalstock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const filterOptions = {
  category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi" },
    { id: "zara", label: "Zara" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categoryOptionMapping = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
};

export const brandOptionMapping = {
  nike: "Nike",
  adidas: "Adidas",
  levi: "Levi",
  puma: "Puma",
  zara: "Zara",
};
