/* This function is used to get formatted current date. */
export function getCurrentDate() {
    const currentDate = new Date();

    try {
        return `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;
    } catch (err) {
        console.error("Error in getting date", err);
    }
};

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
};

/* This function is used to get Index-page background color by time of day. */
export function setThemeByTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();

    try {
        if (hours >= 18 || hours <= 5) {
            return (['#384556', '#202731']);
        } else if (hours >= 6 && hours <= 9) {
            return(['#E58124', '#E78C36', '#EEAB6D']);
        } else {
            return (['#5B7FAE', '#829DC1', '#92AAC9']);
            }
    } catch (err) {
        console.error("Error in getting theme", err);
    }
};

// const [time, setTime] = useState('');

// const minutes = currentDate.getMinutes();
// if (minutes < 10) {
//   setTime(`${currentDate.getHours()}:0${currentDate.getMinutes()}`);
// } else {
//   setTime(`${currentDate.getHours()}:${currentDate.getMinutes()}`);
// }