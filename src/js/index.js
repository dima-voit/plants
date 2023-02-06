import { tariffData } from "./tariffData.js";
// Mobile menu variables
const burger = document.querySelector(".burger");
const navList = document.querySelector(".nav__list");
const navLinks = document.querySelectorAll(".nav__link");
// Price variables
const tariffList = document.querySelector(".tariff__list");
// Service variables
const serviceButtons = document.querySelector(".service__btns");
const serviceButtonsList = document.querySelectorAll(".service__btn");
const serviceCards = document.querySelectorAll(".service__card");
// Contact variables
const selectHeader = document.querySelector(".select__header");
const selectTitle = document.querySelector(".select__title");
const optionList = document.querySelector("#options");
const options = document.querySelectorAll(".option");
const addressItem = document.querySelectorAll(".address__item");
const addressBlock = document.querySelector(".addresses");
const contactImg = document.querySelector(".contact__inner picture");

// Mobile menu
document.addEventListener("click", () => {
  if(burger.classList.contains("activated")) {
    burger.classList.remove("activated");
    navList.classList.remove("open");
  };
});

if(burger) {
  burger.addEventListener("click", e => {
    e.stopPropagation();
    burger.classList.toggle("activated");
    navList.classList.toggle("open");
  });
};

if(navList) {
  navList.addEventListener("click", e => {
    e.stopPropagation();
  });
};

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    burger.classList.remove("activated");
    navList.classList.remove("open");
    navLinks.forEach(el => {
      el.classList.remove("active");
    });
    navLink.classList.add("active");
  });
});

// Price accordion
function tariffItems() {
  tariffData.forEach(tariff => {
    const tariffItem = document.createElement("li");
    tariffItem.classList.add("tariff__item");
    
    const tariffName = document.createElement("h4");
    tariffName.classList.add("tariff__name");
    tariffName.textContent = tariff.title;
    
    const tariffInfo = document.createElement("div");
    tariffInfo.classList.add("tariff__info");
    
    const tariffDescription = document.createElement("div");
    tariffDescription.classList.add("tariff__description");
    tariffDescription.innerHTML = `<p>${tariff.description}</p>`;
    
    const tariffValue = document.createElement("div");
    tariffValue.classList.add("tariff__value");
    tariffValue.innerHTML = `<span>${tariff.price}</span> / per hour`;
    
    const orderLink = document.createElement("a");
    orderLink.classList.add("order__btn");
    orderLink.setAttribute("href", tariff.link);
    orderLink.textContent = "Order";
    
    tariffItem.append(tariffName);
    tariffItem.append(tariffInfo);
    tariffInfo.append(tariffDescription);
    tariffInfo.append(tariffValue);
    tariffInfo.append(orderLink);
    tariffList.append(tariffItem);
  });
};

tariffItems();

const tariffNames = document.querySelectorAll(".tariff__name");
tariffNames.forEach(tName => {
  tName.addEventListener("click", () => {
    if (tName.classList.contains("clicked")) {
      tName.classList.remove("clicked");
      tName.parentNode.classList.remove("active");
    } else {
      tariffNames.forEach(el => {
        el.classList.remove("clicked");
        el.parentNode.classList.remove("active");
      });
      tName.classList.toggle("clicked");
      tName.parentNode.classList.toggle("active");
    };
  });
});

// Service filter
function filterService() {
  serviceButtons.addEventListener("click", event => {
    const targetFilter = event.target.dataset.filter;
    const target = event.target;
    serviceButtonsList.forEach(serviceButtonsItem => serviceButtonsItem.classList.remove("active"));
    target.classList.toggle("active");
    switch(targetFilter) {
      case "gardens":
        serviceCards.forEach(serviceCard => {
          if(serviceCard.classList.contains("garden__card")) {
            serviceCard.classList.remove("blur");
          } else {
            serviceCard.classList.add("blur");
          };
      });
      break;
      case "lawn":
        serviceCards.forEach(serviceCard => {
          if(serviceCard.classList.contains("lawn__card")) {
            serviceCard.classList.remove("blur");
          } else {
            serviceCard.classList.add("blur");
          };
      });
      break;
      case "planting":
        serviceCards.forEach(serviceCard => {
          if(serviceCard.classList.contains("planting__card")) {
            serviceCard.classList.remove("blur");
          } else {
            serviceCard.classList.add("blur");
          };
      });
      break;
    };
  });
};

filterService()

// Contact
selectHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  selectHeader.classList.toggle("active");
  optionList.classList.toggle("hide");
});

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    selectTitle.innerText = option.innerText;
    optionList.classList.toggle("hide");
    if(selectHeader.classList.contains("active")) {
      selectHeader.classList.remove("active");
      selectHeader.style.background = "#C1E698";
    }
    if (window.matchMedia('screen and (max-width: 992px)').matches) {
      addressBlock.style.marginBottom = "15px";
    }
    if (window.matchMedia('screen and (max-width: 380px)').matches) {
      contactImg.style.display = "none";
    }
    addressItem.forEach((item) => {
      item.classList.remove("show");
      if(item.id === option.dataset.value) {
        item.classList.add("show");
      }
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target !== selectHeader) {
    optionList.classList.add("hide");
  }
});
