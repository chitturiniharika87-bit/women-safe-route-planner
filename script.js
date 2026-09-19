/* =========================================
   SAFEROUTE - MAIN JAVASCRIPT
========================================= */


/* -----------------------------------------
   SCREEN NAVIGATION
----------------------------------------- */

const navItems = document.querySelectorAll(".nav-item");
const screens = document.querySelectorAll(".screen");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const screenName = item.dataset.screen;

        goTo(screenName);

    });

});


function goTo(screenName) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    navItems.forEach(item => {
        item.classList.remove("active");
    });


    const targetScreen =
        document.getElementById(screenName);

    targetScreen.classList.add("active");


    const activeNav =
        document.querySelector(
            `.nav-item[data-screen="${screenName}"]`
        );

    if (activeNav) {
        activeNav.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* -----------------------------------------
   PLAN JOURNEY
----------------------------------------- */

let selectedTransport = "Walking";


function selectTransport(button, transport) {

    selectedTransport = transport;

    document
        .querySelectorAll(".transport-option")
        .forEach(option =>
            option.classList.remove("active")
        );

    button.classList.add("active");
}


function planJourney() {

    const from =
        document.getElementById("fromInput").value;

    const to =
        document.getElementById("toInput").value;

    const time =
        document.getElementById("timeInput").value;


    if (from === "" || to === "") {

        showModal(
            "Missing information",
            "Please enter both your starting point and destination."
        );

        return;
    }


    let formattedTime = formatTime(time);


    document.getElementById("routeJourneyName").innerText =
        `${from} → ${to} · ${formattedTime} · ${selectedTransport}`;


    goTo("routes");
}


/* -----------------------------------------
   TIME FORMAT
----------------------------------------- */

function formatTime(time) {

    if (!time) {
        return "9:30 PM";
    }

    let [hour, minute] =
        time.split(":").map(Number);

    let period =
        hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
}


/* -----------------------------------------
   ROUTE SELECTION
----------------------------------------- */

let selectedRoute = 0;


function selectRoute(number) {

    selectedRoute = number;

    const routes =
        document.querySelectorAll(".route-option");


    routes.forEach(route => {
        route.classList.remove("selected");
    });


    routes[number].classList.add("selected");


    const names = [
        "Route A",
        "Route B",
        "Route C"
    ];


    showToast(
        `${names[number]} selected`
    );
}


/* -----------------------------------------
   FASTEST ↔ SAFETY PRIORITY
----------------------------------------- */

function changePriority() {

    const value =
        document.getElementById("prioritySlider").value;

    const display =
        document.getElementById("priorityValue");


    if (value < 30) {

        display.innerText = "Fastest";

    } else if (value < 70) {

        display.innerText = "Balanced";

    } else {

        display.innerText =
            "Safety Priority";
    }
}


/* -----------------------------------------
   TIME TRAVEL
----------------------------------------- */

function changeTime() {

    const value =
        parseFloat(
            document.getElementById("timeSlider").value
        );


    const hour =
        Math.floor(value);


    const minute =
        value % 1 === 0.5
            ? "30"
            : "00";


    const period =
        hour >= 12 ? "PM" : "AM";


    let displayHour =
        hour % 12 || 12;


    const formatted =
        `${displayHour}:${minute} ${period}`;


    /* -----------------------------------------
       CURRENT TIME
    ----------------------------------------- */

    document.getElementById("timeDisplay").innerText =
        formatted;


    /* -----------------------------------------
       DEFAULT VALUES
    ----------------------------------------- */

    let route = "18 min";
    let context = "Lower concern";
    let activity = "High";
    let reports = 2;


    /* -----------------------------------------
       TIME-BASED CHANGES
    ----------------------------------------- */

    if (value <= 19) {

        route = "18 min";
        context = "Lower concern";
        activity = "High";
        reports = 2;

    }

    else if (value <= 20.5) {

        route = "18 min";
        context = "Moderate";
        activity = "Medium-High";
        reports = 3;

    }

    else if (value <= 21.5) {

        route = "19 min";
        context = "Moderate";
        activity = "Medium";
        reports = 5;

    }

    else if (value <= 22.5) {

        route = "21 min";
        context = "More reported concerns";
        activity = "Lower";
        reports = 6;

    }

    else {

        route = "22 min";
        context = "More reported concerns";
        activity = "Lower";
        reports = 7;
    }


    /* -----------------------------------------
       JOURNEY SNAPSHOT
    ----------------------------------------- */

    const timeRoute =
        document.getElementById("timeRoute");

    if (timeRoute) {
        timeRoute.innerText = route;
    }


    const timeContext =
        document.getElementById("timeContext");

    if (timeContext) {
        timeContext.innerText = context;
    }


    const timeActivity =
        document.getElementById("timeActivity");

    if (timeActivity) {
        timeActivity.innerText = activity;
    }


    const timeReports =
        document.getElementById("timeReports");

    if (timeReports) {
        timeReports.innerText = reports;
    }


    /* -----------------------------------------
       CONTEXT BADGE
    ----------------------------------------- */

    const contextBadge =
        document.getElementById("contextBadge");

    if (contextBadge) {
        contextBadge.innerText = context;
    }


    /* -----------------------------------------
       WHY DID IT CHANGE?
    ----------------------------------------- */

    const factorActivity =
        document.getElementById("factorActivity");

    if (factorActivity) {
        factorActivity.innerText = activity;
    }


    const factorReports =
        document.getElementById("factorReports");

    if (factorReports) {
        factorReports.innerText =
            `${reports} reported points`;
    }


    const factorRoute =
        document.getElementById("factorRoute");

    if (factorRoute) {
        factorRoute.innerText =
            `${route} journey`;
    }


    const whyActivity =
        document.getElementById("whyActivity");

    if (whyActivity) {
        whyActivity.innerText =
            `${activity} activity context at ${formatted}.`;
    }


    const whyReports =
        document.getElementById("whyReports");

    if (whyReports) {
        whyReports.innerText =
            `${reports} reported points are represented for this prototype time.`;
    }


    const whyRoute =
        document.getElementById("whyRoute");

    if (whyRoute) {
        whyRoute.innerText =
            `Current route estimate: ${route}. Compare alternatives before choosing.`;
    }
}


/* -----------------------------------------
   TIME COMPARISON BUTTONS
----------------------------------------- */

function compareTime(value, button) {

    document.getElementById("timeSlider").value =
        value;


    document
        .querySelectorAll(".compare-time")
        .forEach(b =>
            b.classList.remove("active")
        );


    button.classList.add("active");


    changeTime();
}


/* -----------------------------------------
   WHAT IF JOURNEY
----------------------------------------- */

function showWhatIf() {

    showModal(

        "What if I leave 30 minutes later?",

        `
        <div class="modal-data">
            <strong>Current</strong>
            <span>
                9:30 PM · Route A · 19 minutes
            </span>
        </div>

        <div class="modal-data">
            <strong>30 minutes later</strong>
            <span>
                10:00 PM · Route B becomes an alternative
            </span>
        </div>

        <div class="modal-data">
            <strong>Context change</strong>
            <span>
                Some segments show increased
                reported concerns.
            </span>
        </div>
        `
    );
}


/* -----------------------------------------
   RISK STORY
----------------------------------------- */

function showRisk(category, reports, recent) {

    showModal(

        "Reported Risk",

        `
        <p>
            This is a reported safety indicator,
            not a guarantee that the location
            is unsafe.
        </p>

        <div class="modal-data">
            <strong>Category</strong>
            <span>${category}</span>
        </div>

        <div class="modal-data">
            <strong>Reports</strong>
            <span>${reports}</span>
        </div>

        <div class="modal-data">
            <strong>Recency</strong>
            <span>${recent}</span>
        </div>

        <div class="modal-data">
            <strong>Journey impact</strong>
            <span>
                This information contributes to the
                route segment's safety context.
            </span>
        </div>
        `
    );
}


/* -----------------------------------------
   SUPPORT NETWORK
----------------------------------------- */

function showSupport() {

    showModal(

        "Safety Network",

        `
        <div class="modal-data">
            <strong>Hospital</strong>
            <span>0.8 km from route</span>
        </div>

        <div class="modal-data">
            <strong>Police station</strong>
            <span>1.2 km from route</span>
        </div>

        <div class="modal-data">
            <strong>Public transit</strong>
            <span>0.5 km from route</span>
        </div>

        <div class="modal-data">
            <strong>Public establishment</strong>
            <span>0.3 km from route</span>
        </div>
        `
    );
}


/* -----------------------------------------
   SMART DETOUR
----------------------------------------- */

function showDetour() {

    showModal(

        "Smart Detour",

        `
        <p>
            An alternative route is available.
        </p>

        <div class="modal-data">
            <strong>Current Route</strong>
            <span>
                19 min · 6.2 km
            </span>
        </div>

        <div class="modal-data">
            <strong>Alternative Route</strong>
            <span>
                23 min · 7.1 km
            </span>
        </div>

        <div class="modal-data">
            <strong>Difference</strong>
            <span>
                +4 minutes with fewer reported
                concerns along the route.
            </span>
        </div>
        `
    );
}


/* -----------------------------------------
   REPORT SUBMISSION
----------------------------------------- */

function submitReport() {

    const location =
        document.getElementById(
            "reportLocation"
        ).value;


    const category =
        document.getElementById(
            "reportCategory"
        ).value;


    if (location === "") {

        showModal(

            "Location required",

            "Please enter the location of the concern."

        );

        return;
    }


    showModal(

        "Report submitted",

        `
        <p>
            Thank you for contributing to the
            community safety dataset.
        </p>

        <div class="modal-data">
            <strong>Location</strong>
            <span>${location}</span>
        </div>

        <div class="modal-data">
            <strong>Category</strong>
            <span>${category}</span>
        </div>

        <p>
            In a production system, reports would be
            processed through verification and
            confidence scoring.
        </p>
        `
    );


    document.getElementById(
        "reportLocation"
    ).value = "";


    document.getElementById(
        "reportDescription"
    ).value = "";
}


/* -----------------------------------------
   MODAL
----------------------------------------- */

function showModal(title, content) {

    const modal =
        document.getElementById("modal");


    const modalContent =
        document.getElementById("modalContent");


    modalContent.innerHTML = `

        <span class="eyebrow">
            SAFEROUTE
        </span>

        <h2>
            ${title}
        </h2>

        ${content}

    `;


    modal.classList.add("show");
}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");
}


document
    .getElementById("modal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {
                closeModal();
            }

        }
    );


/* -----------------------------------------
   TOAST
----------------------------------------- */

function showToast(message) {

    const toast =
        document.createElement("div");


    toast.innerText = message;


    toast.style.position = "fixed";

    toast.style.bottom = "25px";

    toast.style.right = "25px";

    toast.style.background = "#202438";

    toast.style.color = "white";

    toast.style.padding =
        "13px 18px";

    toast.style.borderRadius =
        "9px";

    toast.style.fontSize =
        "12px";

    toast.style.zIndex =
        "200";


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 1800);
}


/* -----------------------------------------
   DEFAULT DATE
----------------------------------------- */

const dateInput =
    document.getElementById(
        "dateInput"
    );


if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    dateInput.value = today;
}