const form = document.querySelector("#data-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".right-section.step-one").classList.add("hidden");
  document.querySelector(".right-section.step-two").classList.remove("hidden");
  document
    .querySelector(".step-number.step-one-number")
    .classList.remove("active");
  document
    .querySelector(".step-number.step-two-number")
    .classList.add("active");
});

const nextStepBtn = document.querySelectorAll(".next-step-btn");
nextStepBtn.forEach((element) => {
  element.addEventListener("click", (el) => {
    const parentElement = el.target.parentNode;
    const rightSection = document.querySelectorAll(".right-section");

    if (el.target.classList.contains("confirm-btn")) {
      const rightSection = document.querySelectorAll(".right-section");
      rightSection.forEach((element) => {
        element.classList.add("hidden");
      });
      document.querySelector(".thank-you-section").classList.remove("hidden");
    } else {
      parentElement.classList.add("hidden");
      rightSection[Number(parentElement.dataset.step) + 1].classList.remove(
        "hidden"
      );
      const leftSectionActiveNumber = document.querySelectorAll(".step-number");
      leftSectionActiveNumber.forEach((element) => {
        element.classList.remove("active");
      });
      leftSectionActiveNumber[
        Number(parentElement.dataset.step) + 1
      ].classList.add("active");
    }
  });
});

const goBackBtn = document.querySelectorAll(".go-back-btn");
goBackBtn.forEach((element) => {
  element.addEventListener("click", (el) => {
    const parentElement = el.target.parentNode;
    const rightSection = document.querySelectorAll(".right-section");

    parentElement.classList.add("hidden");
    rightSection[Number(parentElement.dataset.step) - 1].classList.remove(
      "hidden"
    );
    const leftSectionActiveNumber = document.querySelectorAll(".step-number");
    leftSectionActiveNumber.forEach((element) => {
      element.classList.remove("active");
    });
    leftSectionActiveNumber[
      Number(parentElement.dataset.step) - 1
    ].classList.add("active");
  });
});

const monthlyBtn = document.querySelector(".switch-monthly");
const monthlySection = document.querySelector(".form-plan-options.monthly");
const yearlyBtn = document.querySelector(".switch-yearly");
const yearlySection = document.querySelector(".form-plan-options.yearly");
const toggleBtn = document.querySelector(".toggle-btn");
const monthlyAddsSection = document.querySelector(".adds-options.monthly");
const yearlyAddsSection = document.querySelector(".adds-options.yearly");

const deleteCheckedAds = (section) => {
  const addsSection = document.querySelector(`.adds-options.${section}`);
  const addCheckbox = addsSection.querySelectorAll(".add-checkbox");
  // const checkbox = addOption.querySelectorAll(".add-checkbox");
  addCheckbox.forEach((element) => {
    element.checked = false;
    element.parentNode.parentNode.classList.remove("active");
  });
};

const setPaymentOption = (section) => {
  const element = document.querySelector(`.form-plan-options.${section}`);
  const elementFirstChild = element.querySelector(".form-payment-option");
  element.querySelectorAll(".form-payment-option").forEach((element) => {
    element.classList.remove("active");
  });
  if (!elementFirstChild.classList.contains("active")) {
    elementFirstChild.classList.add("active");
  }
};

toggleBtn.addEventListener("click", () => {
  if (!toggleBtn.classList.contains("active")) {
    toggleBtn.classList.add("active");
    monthlyBtn.classList.remove("active");
    yearlyBtn.classList.add("active");
    monthlySection.classList.add("hidden");
    yearlySection.classList.remove("hidden");
    monthlyAddsSection.classList.add("hidden");
    yearlyAddsSection.classList.remove("hidden");
    deleteCheckedAds("monthly");
    setPaymentOption("yearly");
  } else {
    toggleBtn.classList.remove("active");
    monthlyBtn.classList.add("active");
    yearlyBtn.classList.remove("active");
    monthlySection.classList.remove("hidden");
    yearlySection.classList.add("hidden");
    monthlyAddsSection.classList.remove("hidden");
    yearlyAddsSection.classList.add("hidden");
    deleteCheckedAds("yearly");
    setPaymentOption("monthly");
  }
});
monthlyBtn.addEventListener("click", () => {
  if (!monthlyBtn.classList.contains("active")) {
    monthlyBtn.classList.add("active");
    yearlyBtn.classList.remove("active");
    toggleBtn.classList.remove("active");
    monthlySection.classList.remove("hidden");
    yearlySection.classList.add("hidden");
    monthlyAddsSection.classList.remove("hidden");
    yearlyAddsSection.classList.add("hidden");
    deleteCheckedAds("yearly");
    setPaymentOption("monthly");
  }
});
yearlyBtn.addEventListener("click", () => {
  if (!yearlyBtn.classList.contains("active")) {
    yearlyBtn.classList.add("active");
    monthlyBtn.classList.remove("active");
    toggleBtn.classList.add("active");
    monthlySection.classList.add("hidden");
    yearlySection.classList.remove("hidden");
    monthlyAddsSection.classList.add("hidden");
    yearlyAddsSection.classList.remove("hidden");
    deleteCheckedAds("monthly");
    setPaymentOption("yearly");
  }
});

const paymentOption = document.querySelectorAll(".form-payment-option");
paymentOption.forEach((element) => {
  element.addEventListener("click", () => {
    paymentOption.forEach((element) => {
      element.classList.remove("active");
    });
    element.classList.add("active");
  });
});

const addOptions = document.querySelectorAll(".add-option");
addOptions.forEach((element) => {
  element.addEventListener("click", () => {
    const checkbox = element.querySelector(".add-checkbox");
    if (checkbox.checked) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
});

const changeBtn = document.querySelector(".plan-change");
changeBtn.addEventListener("click", () => {
  const selectPlanSection = document.querySelector(".right-section.step-two");
  selectPlanSection.classList.remove("hidden");
  const selectPlanNumber = document.querySelector(
    ".step-number.step-two-number"
  );
  selectPlanNumber.classList.add("active");

  const summarySection = document.querySelector(".right-section.step-four");
  summarySection.classList.add("hidden");
  const summaryStepNumber = document.querySelector(
    ".step-number.step-four-number.active"
  );
  summaryStepNumber.classList.remove("active");
});

const goSummaryBtn = document.querySelector(".go-to-summary");
goSummaryBtn.addEventListener("click", () => {
  let totalCost = 0;
  const selectedPlan = document
    .querySelector(".form-payment-option.active")
    .querySelector(".plan-details");
  const selectedPlanOption = () => {
    if (
      document.querySelector(".switch-monthly").classList.contains("active")
    ) {
      return "Monthly";
    } else {
      return "Yearly";
    }
  };
  const shortSelectedPlanOption =
    selectedPlanOption() === "Monthly" ? "mo" : "yr";
  document.querySelector(".plan-title").innerHTML = `${
    selectedPlan.querySelector("span").innerText
  } (${selectedPlanOption()})`;
  const planCost = `$${
    selectedPlan.querySelector(".cost").dataset.cost
  }/${shortSelectedPlanOption}`;
  totalCost += Number(selectedPlan.querySelector(".cost").dataset.cost);
  document.querySelector(".plan-cost").innerHTML = planCost;

  const summaryAdsSection = document.querySelector(".summary-ads-list");
  const adsOption = [...document.querySelectorAll(".add-option.active")];
  if (adsOption.length == 0) {
    summaryAdsSection.classList.add("hidden");
  } else {
    summaryAdsSection.classList.remove("hidden");
  }

  summaryAdsSection.innerHTML = "";
  adsOption.forEach((element) => {
    const adElement = element.querySelector(".option-body");
    const adTitle = adElement.querySelector(".add-title");
    const adCost = adElement.querySelector(".add-cost");
    const container = document.createElement("div");
    const containerTitle = document.createElement("div");
    containerTitle.classList.add("summary-ads-title");
    containerTitle.innerHTML = adTitle.innerText;
    container.appendChild(containerTitle);
    const containerCost = document.createElement("div");
    containerCost.classList.add("summary-ads-cost");
    containerCost.innerHTML = adCost.innerText;
    container.appendChild(containerCost);
    summaryAdsSection.appendChild(container);
    totalCost += Number(adCost.dataset.cost);
  });

  document.querySelector(
    ".total-cost"
  ).innerHTML = `+$${totalCost}/${shortSelectedPlanOption}`;
});
