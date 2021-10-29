const buttons = document.querySelectorAll(".content__link");
const titles = document.querySelectorAll(".content__title");
const hours = document.querySelectorAll(".content__hour");
const dates = document.querySelectorAll(".content__date");

const [dailyButton, weeklyButton, monthlyButton] = buttons;

const getJson = async function () {
  try {
    const data = await fetch("../data.json");
    return await data.json();
  } catch (err) {
    console.error(`${err.message}`);
  }
};

const setTitle = async function () {
  const data = await getJson();
  data.map((el, i) => (titles[i].textContent = el.title));
};

const setDailyHours = async function () {
  const data = await getJson();
  data.map(
    ({ timeframes }, i) =>
      (hours[i].textContent = `${timeframes.daily.current}hrs`)
  );
  data.map(
    ({ timeframes }, i) =>
      (dates[i].textContent = `Yesterday - ${timeframes.daily.previous}hrs`)
  );
};

const setWeeklyHours = async function () {
  const data = await getJson();
  data.map(
    ({ timeframes }, i) =>
      (hours[i].textContent = `${timeframes.weekly.current}hrs`)
  );
  data.map(
    ({ timeframes }, i) =>
      (dates[i].textContent = `Last Week - ${timeframes.weekly.previous}hrs`)
  );
};

const setMonthlyHours = async function () {
  const data = await getJson();
  data.map(
    ({ timeframes }, i) =>
      (hours[i].textContent = `${timeframes.monthly.current}hrs`)
  );
  data.map(
    ({ timeframes }, i) =>
      (dates[i].textContent = `Last Month - ${timeframes.monthly.previous}hrs`)
  );
};

buttons.forEach((el) =>
  el.addEventListener("click", (e) => {
    buttons.forEach((el) => el.classList.remove("content__link-active"));
    e.target.classList.add("content__link-active");
  })
);

dailyButton.addEventListener("click", setDailyHours);
weeklyButton.addEventListener("click", setWeeklyHours);
monthlyButton.addEventListener("click", setMonthlyHours);

(() => {
  setTitle();
  setWeeklyHours();
})();
