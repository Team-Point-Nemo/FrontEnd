/* This function is used to get formatted current date. */
export function getCurrentDate() {
  const currentDate = new Date();

  try {
    return `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;
  } catch (err) {
    console.error("Error in getting date", err);
  }
}

/* This function is used to get Index-page image by time of day. */
export function setImageByTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();

  try {
    if (hours >= 18 || hours <= 5) {
      return require("../../assets/galaxy.jpg");
    } else if (hours >= 6 && hours <= 9) {
      return require("../../assets/sunrise.jpg");
    } else {
      return require("../../assets/cloudy.jpg");
    }
  } catch (err) {
    console.error("Error in getting image", err);
  }
}

/* This function is used to get Index-page background color by time of day. */
export function setThemeByTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();

  try {
    if (hours >= 18 || hours <= 5) {
      return ["#0E1013", "#1A1D23", "#2B303B"];
    } else if (hours >= 6 && hours <= 9) {
      return ["#E67A0F", "#F3993F"];
    } else {
      return ["#172F4F", "#3872BC", "#5187CD", "#6192D1"];
    }
  } catch (err) {
    console.error("Error in getting theme", err);
  }
}
