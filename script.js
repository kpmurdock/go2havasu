(function () {
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      setMenu(open);
      if (open) {
        var first = nav.querySelector("a, button");
        if (first) first.focus();
      }
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (menuBtn.getAttribute("aria-expanded") !== "true") return;
      if (nav.contains(event.target) || menuBtn.contains(event.target)) return;
      setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var SEARCH_ITEMS = [
    { title: "The London Bridge", text: "Landmark, shops, dining, and waterfront", href: "/things-to-do.html#london-bridge" },
    { title: "Lake Havasu", text: "Boating, fishing, swimming, and desert views", href: "/things-to-do.html#boating" },
    { title: "Buckskin Mountain", text: "Hiking and Colorado River views", href: "/things-to-do.html#buckskin" },
    { title: "State parks and areas", text: "Lake Havasu State Park and Cattail Cove", href: "/things-to-do.html#parks" },
    { title: "Lake Havasu State Park", text: "Beaches, camping, and shoreline", href: "/things-to-do.html#state-park" },
    { title: "Cattail Cove", text: "Quieter camping and paddling south of town", href: "/things-to-do.html#cattail" },
    { title: "Boating and water fun", text: "Bridgewater Channel, beaches, and lake time", href: "/boating.html" },
    { title: "Hiking and outdoors", text: "Desert trails and scenic drives", href: "/hiking.html" },
    { title: "Parker Dam", text: "Colorado River drive and dam area", href: "/things-to-do.html#parker-dam" },
    { title: "Events and festivals", text: "Calendar coming soon, plus the visitor bureau", href: "/events.html" },
    { title: "Dining and nightlife", text: "London Bridge waterfront dining district", href: "/dining.html" },
    { title: "Places to stay", text: "Camping and where visitors stay", href: "/stay.html" },
    { title: "Plan your trip", text: "A simple Lake Havasu day outline", href: "/plan.html" },
    { title: "Blog", text: "Stories and guides, publishing soon", href: "/blog.html" },
    { title: "Things to do", text: "Destination guide", href: "/things-to-do.html" },
    { title: "Business plan", text: "Goals, revenue, marketing, and growth", href: "/BUSINESS_PLAN.md" }
  ];

  var dialog = document.getElementById("searchDialog");
  var searchBtn = document.querySelector(".nav-search");
  var searchInput = document.getElementById("searchInput");
  var results = document.getElementById("searchResults");
  var activeIndex = -1;

  function matches(item, query) {
    if (!query) return true;
    var hay = (item.title + " " + item.text).toLowerCase();
    return query.toLowerCase().split(/\s+/).every(function (part) {
      return part && hay.indexOf(part) !== -1;
    });
  }

  function renderResults(query) {
    if (!results) return;
    var found = SEARCH_ITEMS.filter(function (item) { return matches(item, query); });
    activeIndex = -1;
    results.innerHTML = "";
    if (!found.length) {
      var empty = document.createElement("li");
      empty.className = "search-empty";
      empty.textContent = "No matching guides yet. Try London Bridge, boating, parks, or events.";
      results.appendChild(empty);
      return;
    }
    found.forEach(function (item) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = item.href;
      var title = document.createElement("strong");
      title.textContent = item.title;
      var detail = document.createElement("span");
      detail.textContent = item.text;
      link.appendChild(title);
      link.appendChild(detail);
      li.appendChild(link);
      results.appendChild(li);
    });
  }

  function moveActive(delta) {
    if (!results) return;
    var links = results.querySelectorAll("a");
    if (!links.length) return;
    activeIndex = (activeIndex + delta + links.length) % links.length;
    links.forEach(function (link, index) {
      if (index === activeIndex) link.setAttribute("aria-selected", "true");
      else link.removeAttribute("aria-selected");
    });
    links[activeIndex].focus();
  }

  if (dialog && searchBtn && searchInput && typeof dialog.showModal === "function") {
    searchBtn.addEventListener("click", function () {
      renderResults(searchInput.value.trim());
      dialog.showModal();
      searchInput.focus();
      searchInput.select();
    });
    searchInput.addEventListener("input", function () {
      renderResults(searchInput.value.trim());
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveActive(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        moveActive(-1);
      }
    });
    dialog.addEventListener("close", function () { searchBtn.focus(); });
    var params = new URLSearchParams(window.location.search);
    var initial = params.get("q");
    if (initial) {
      searchInput.value = initial;
      renderResults(initial);
      dialog.showModal();
    }
  }

})();
