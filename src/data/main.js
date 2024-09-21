import { TabItem, RenderProduct, singleProduct } from "./service.js";

//
const itemList = document.querySelector(".item_list");
const ProductsList = document.querySelector(".Products_list");
const btns = document.getElementsByClassName("btns");
const modal = document.querySelector(".modal_section");
const modalDiv = document.querySelector(".modal_block");
const modalBg = document.querySelector(".modal_bg");
const ModalClose = document.querySelector(".modal_close");
const cart = document.querySelector(".cart_section");
const shop = document.querySelector(".shop");
const counter = document.querySelector(".counter");
const CartClose = document.querySelector(".Cart_close");
const cartBlock = document.querySelector(".cart_block");

const count = document.querySelector(".count");
const slick = document.getElementsByClassName("slick-prev ");
slick.id = "angle";

$(".hero").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
});

const TabItems = async () => {
  const data = await TabItem();
  itemList.innerHTML = data
    .map(
      (item) => `
      <li>
      <button data-id="${item}" class=" btns font-[500] text-[22px] text-[#262626] mb-[23px]">${item}</button>
      </li>
  `
    )
    .join("");
  btns[0].style.color = "#33a0ff";
  btns[0].style.borderBottom = "3px solid #33a0ff";
  RenderItems(data[0]);
};
TabItems();

const RenderItems = async (item) => {
  const data = await RenderProduct(item);
  ProductsList.innerHTML = data
    .map(
      (item) =>
        `
  <li class="w-[304px] text-center  shadow-xl flex flex-col justify-between">
  <div class=" pt-[30px] px-[40px] bg-[#ECECEC] rounded-t-[15px]">
  <img class="bg-transparent rounded-[25px] w-[250px] mb-[14px] pb-[14px] h-[200px]" src="${
    item.image
  }" alt="#" />
  </div>
  <div class="bg-white pb-[30px] px-[40px] flex flex-col">
   <h3 class="font-[700] text-[18px] leading-[150%] text-[#223263] mb-[8px]">${
     item.title
   }</h3>
  <p class="font-[500] text-[18px] leading-[150%] text-[#223263] mb-[15px] ">Rating : ${
    item.rating.rate
  }/5</p>
  <div class="flex items-center gap-[13px] justify-center mb-[10px]">
  
  <p class="font-[700] text-[18px] leading-[180%] text-[#40bfff]">
  $${Math.round(item.price * 0.76)}
</p>
  <p class="line-through text-[#9098b1] text-[14px] leading-[#150%] font-[400] "> $${
    item.price
  } </p>
  <p class="font-[700] text-[14px] leading-[150%] text-[#fb7181] ">24% Off</p>
  </div>
  <button class="bg-green-400 py-[10px] px-[20px] text-white text-[17px]" data-i="${
    item.id
  }"">Show</button>
  </div>
  </li>
  `
    )
    .join("");
};
RenderItems();

itemList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    RenderItems(id);
    for (let i of btns) {
      i.style.color = "";
      i.style.borderBottom = "";
    }
    e.target.style.color = "#33a0ff";
    e.target.style.borderBottom = "3px solid #33a0ff";
  }
});

//

//

const saveLocal = (item) => {
  const oldClothes = JSON.parse(localStorage.getItem("Clothes")) || [];
  const singleitem = oldClothes.some((data) => data.id === item.id);

  if (!singleitem) {
    item.user_count = 1;
    localStorage.setItem("Clothes", JSON.stringify([item, ...oldClothes]));
    
  }
  // AddedLocal();
};

//
const AddedLocal = () => {
  const data = JSON.parse(localStorage.getItem("Clothes") || []);
  cartBlock.innerHTML = data
    ?.map(
      (
        item
      ) => `<div class="flex rounded-[15px] items-center border border-red-500 bg-white  gap-[30px] py-[20px] px-[20px] w-[750px] justify-center mx-auto my-[20px]">
    
      <img class="w-[200px] h-[200px]" src="${item.image}" alt="#" />
      <div class="w-[500px]">
      
      <h3 class="font-[700] text-[18px] leading-[150%] text-[#223263] mb-[8px]">${
        item.title
      }</h3>
      <div class="flex items-center gap-[13px]  mb-[10px]">
   <p class="font-[700] text-[18px] leading-[180%] text-[#40bfff]">
  $${Math.round(item.price * 0.76)}
</p>
  <p class="line-through text-[#9098b1] text-[14px] leading-[#150%] font-[400] "> $${
    item.price
  } </p>
  <p class="font-[700] text-[14px] leading-[150%] text-[#fb7181] ">24% Off</p>
  </div>
  <p class="font-[500] text-[18px] leading-[150%] text-[#223263] mb-[15px] ">Rating : ${
    item.rating.rate
  }/5</p>
      <button class="delBtn py-[10px] rounded-[10px] px-[20px] bg-red-500 text-white" data-del="${
        item.id
      }">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
  counter.textContent = `${data.length}`;
  count.textContent = `Items in cart: ${data.length}`;
};
AddedLocal();

//
const OpenModal = (item) => {
  modalDiv.style.display = "block";
  ModalClose.style.display = "block";
  modalBg.style.display = "block";
  modalDiv.innerHTML = `
  <div class="flex items-center gap-[30px] py-[20px] px-[20px]">
  <img class="w-[250px] h-[200px]" src="${item.image}" alt="#" />
  <div>
  <h1 class="text-blue-500 text-[25px] font-[700] mb-[5px]">${item.title}</h1>
  <p class="text-white text-[25px]">${item.description}</p>
  <p class="text-[20px] text-red-500 font-[700]">Rating :  ${item.rating.rate}/5</p>
   <div class="flex items-center gap-[13px] justify-center mb-[10px] font-700] text-[20px]">
  <p class="font-[700] text-[18px] leading-[180%] text-[#40bfff]">
  $${Math.round(item.price * 0.76)}
</p>
  <p class="line-through text-[#9098b1] text-[14px] leading-[#150%] font-[400] "> $${
    item.price
  } </p>
  <p class="font-[700] text-[14px] leading-[150%] text-[#fb7181] ">24% Off</p>
  </div>
  <div class="text-right ">
  
  <button class="Local_btn py-[10px] px-[20px] bg-green-500 text-white rounded-[10px]" data-add="${item.id}">Add</button>
  </div>
  </div>
  </div>
  `;
  const StorageBtn = document.querySelector(".Local_btn");
  StorageBtn.addEventListener("click", () => {
    saveLocal(item);
    AddedLocal();
  });
};
modal.addEventListener("click", async (e) => {
  const ItemId = e.target.dataset.i;
  if (ItemId) {
    const data = await singleProduct(ItemId);
    OpenModal(data);
  }
});

ModalClose.addEventListener("click", async () => {
  modalDiv.style.display = "none ";
  ModalClose.style.display = "none";
  modalBg.style.display = "none";
});

cartBlock.addEventListener("click", (e) => {
  let data = JSON.parse(localStorage.getItem("Clothes") || []);
  const id = e.target.dataset.del;
  data = data.filter((item) => item.id != id);
  localStorage.setItem("Clothes", JSON.stringify(data));
  AddedLocal(data);
});
shop.addEventListener("click", () => {
  cartBlock.classList.add("open");
  cart.style.display = "block";
  CartClose.style.display = "block";
  cartBlock.style.display = "block";
  slick.className = "close";
});

CartClose.addEventListener("click", async () => {
  cart.style.display = "none";
  CartClose.style.display = "none";
  cartBlock.style.display = "none";
});
