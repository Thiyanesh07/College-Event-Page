const events = [
    {
        title: "Football Tournament",
        date: "2026-02-10",
        category: "Sports",
        description: "Inter-college football competition",
        location: "Main Ground"
    },
    {
        title: "AI Workshop",
        date: "2026-02-12",
        category: "Workshop",
        description: "Hands-on Artificial Intelligence session",
        location: "Lab 3"
    },
    {
        title: "Cybersecurity Guest Lecture",
        date: "2026-02-15",
        category: "Guest Lecture",
        description: "Talk by industry expert",
        location: "Auditorium"
    },
    {
        title: "Basketball Finals",
        date: "2026-02-18",
        category: "Sports",
        description: "Final match of the season",
        location: "Indoor Stadium"
    },
    {
        title: "Web Development Workshop",
        date: "2026-02-20",
        category: "Workshop",
        description: "Frontend & Backend basics",
        location: "Lab 1"
    },
    {
        title: "Data Science Career Talk",
        date: "2026-02-22",
        category: "Guest Lecture",
        description: "Career guidance for students",
        location: "Seminar Hall"
    }
];

let currentPage = 1;
const eventsPerPage = 5;

function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const start = startDate.value;
    const end = endDate.value;

    return events.filter(event => {
        const searchMatch =
            event.title.toLowerCase().includes(searchText) ||
            event.date.includes(searchText);

        const categoryMatch =
            category === "All" || event.category === category;

        const dateMatch =
            (!start || event.date >= start) &&
            (!end || event.date <= end);

        return searchMatch && categoryMatch && dateMatch;
    });
}

function displayEvents() {
    const filteredEvents = filterEvents();
    const startIndex = (currentPage - 1) * eventsPerPage;
    const visibleEvents = filteredEvents.slice(
        startIndex,
        startIndex + eventsPerPage
    );

    eventsContainer.innerHTML = "";

    visibleEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button>View Details</button>
        `;

        eventsContainer.appendChild(card);
    });

    pageNumber.innerText = `Page ${currentPage}`;
}

function nextPage() {
    const totalPages = Math.ceil(filterEvents().length / eventsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayEvents();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayEvents();
    }
}

document.querySelectorAll("input, select").forEach(element => {
    element.addEventListener("input", () => {
        currentPage = 1;
        displayEvents();
    });
});

displayEvents();
