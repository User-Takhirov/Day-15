const url = "https://fakestoreapi.com/products/categories";
const urlProduct = "https://fakestoreapi.com/products/category";
const singleProductUrl = "https://fakestoreapi.com/products";

export const TabItem = async () => {
  try {
    const res = await fetch(`${url}`);
    const data = res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const RenderProduct = async (item) => {
  try {
    const res = await fetch(`${urlProduct}/${item}`);
    const data = res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const singleProduct = async (id) => {
  try {
    const res = await fetch(`${singleProductUrl}/${id}`);
    const data = res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
