// const { get } = require("http");

const url = "https://dev-93076686-admin.okta.com/api/v1/users";
const token = "00CwZ9HwAqbM2r2stUe9pOStTJBuWM3q_jOxeYVroA";
let userid;

const logId = document.getElementById("login");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("countryCode");

if (document.cookie) {  // Check if cookies exist
    let cookie = document.cookie.split("=");
    if (cookie.length > 1) { // Ensure there's a value after '='
        let cleanedStr = cookie[1].replace(/%22/g, "");
        userid = cleanedStr;
        console.log("Raw Cookie Value:", cookie[1]);
        console.log("Cleaned Cookie Value:", cleanedStr);
    } else {
        console.log("Cookie is present but has no value.");
    }
} else {
    console.log("No cookies found.");
}

const getUser = async () => {
    console.log("Fetching user data...");
    const res = await fetch("http://localhost:5000/getUser", {
        method: "POST",
        headers: {
            // "Authorization": `SSWS ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid }),
    })
    const data = await res.json();
    console.log(data);
    logId.innerText = data.profile.login;
    email.innerText = data.profile.email;
    mobile.innerText = data.profile.mobilePhone;
    city.innerText = data.profile.city;
    state.innerText = data.profile.state;
    country.innerText = data.profile.countryCode;
    document.getElementById("fullName").innerText = data.profile.firstName + " " + data.profile.lastName;
    document.getElementById('subscription').innerText = data.profile.subscribe;
}

getUser()
const getFactors = async () => {
    const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
            // "Authorization": `SSWS ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid }),
    })
    const data = await res.json();
    document.getElementById("factors").innerText = "";
    for (let item of
        data) {
        document.getElementById("factors").innerText += " " + item.provider;
    }
    console.log(data);
}
getFactors();