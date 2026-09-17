/* =========================================================
   WORK LIST RENDERER
   Homepage + Project Index
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

function getSortedWorks() {

  if (typeof WORKS === "undefined") {
    return [];
  }

  return Object.entries(WORKS).sort(
    (a, b) =>
      parseInt(a[1].number) -
      parseInt(b[1].number)
  );

}


function applyBackgroundImage(
  element,
  image,
  position
) {

  if (!image) {
    return;
  }

  element.style.backgroundImage =
    `url("${image}")`;

  element.style.backgroundPosition =
    position || "50% 50%";

  element.classList.add("has-image");

}


/* =========================================================
   HOMEPAGE — SELECTED WORK
   ========================================================= */

function renderHomeWorks() {

  const leftColumn =
    document.getElementById("home-work-left");

  const rightColumn =
    document.getElementById("home-work-right");

  const featureContainer =
    document.getElementById(
      "home-work-feature-container"
    );

  if (
    !leftColumn ||
    !rightColumn ||
    !featureContainer
  ) {
    return;
  }

  leftColumn.innerHTML = "";
  rightColumn.innerHTML = "";
  featureContainer.innerHTML = "";

  const works = getSortedWorks();

  works.forEach(([id, work]) => {

    if (
      !work.featured ||
      !work.home
    ) {
      return;
    }


    const card =
      document.createElement("a");

    card.className =
      "home-work-card";

    card.href =
      `work.html?id=${id}`;


    if (
      work.home.size === "narrow"
    ) {
      card.classList.add(
        "home-work-card-narrow"
      );
    }


    if (
      work.home.size === "feature"
    ) {
      card.classList.add(
        "home-work-feature"
      );
    }


    const image =
      document.createElement("div");

    image.className =
      `home-work-image ${
        work.home.ratio ||
        "landscape"
      }`;

    applyBackgroundImage(
      image,
      work.home.image,
      work.home.position
    );


    const info =
      document.createElement("div");

    info.className =
      "home-work-info";

    info.innerHTML = `

      <div class="home-work-copy">

        <div class="home-work-name">
          ${work.title}
        </div>

        <div class="home-work-meta">
          ${work.location}<br>
          ${work.typology} / Architecture
        </div>

      </div>

      <div class="home-work-number">
        ${work.number}
      </div>

    `;


    card.appendChild(image);
    card.appendChild(info);


    if (
      work.home.column === "left"
    ) {

      leftColumn.appendChild(card);

    }

    else if (
      work.home.column === "right"
    ) {

      rightColumn.appendChild(card);

    }

    else if (
      work.home.column === "feature"
    ) {

      featureContainer.appendChild(card);

    }

  });

}


/* =========================================================
   PROJECT INDEX
   ========================================================= */

function renderProjectIndex() {

  const professional =
    document.getElementById(
      "professional-work-list"
    );

  const academic =
    document.getElementById(
      "academic-work-list"
    );

  if (
    !professional ||
    !academic
  ) {
    return;
  }

  professional.innerHTML = "";
  academic.innerHTML = "";

  const works =
    getSortedWorks();


  works.forEach(([id, work]) => {

    if (
      !work.index ||
      work.index.show === false
    ) {
      return;
    }


    const card =
      document.createElement(
        work.page ? "a" : "div"
      );

    card.className =
      "project-strip-card";


    if (work.page) {

      card.href =
        `work.html?id=${id}`;

    }

    else {

      card.classList.add(
        "project-strip-card-inactive"
      );

    }


    const image =
      document.createElement("div");

    image.className =
      "project-strip-thumb";

    applyBackgroundImage(
      image,
      work.index.image,
      work.index.position
    );


    const info =
      document.createElement("div");

    info.className =
      "project-strip-meta";

    info.innerHTML = `

      <div class="project-strip-number">
        ${work.number}
      </div>

      <div class="project-strip-name">
        ${work.title}
      </div>

      <div class="project-strip-subtitle">
        ${work.location}
      </div>

      <div class="project-strip-detail">
        ${work.typology}
        <span>/</span>
        ${work.office}
      </div>

    `;


    card.appendChild(image);
    card.appendChild(info);


    if (
      work.category === "academic"
    ) {

      academic.appendChild(card);

    }

    else {

      professional.appendChild(card);

    }

  });


  initProjectIndexInteraction();

}


/* =========================================================
   PROJECT INDEX INTERACTION
   ========================================================= */

function initProjectIndexInteraction() {

  document
    .querySelectorAll(
      ".project-strip-grid"
    )
    .forEach(grid => {

      const cards =
        grid.querySelectorAll(
          ".project-strip-card"
        );


      cards.forEach(card => {

        card.addEventListener(
          "mouseenter",
          () => {

            cards.forEach(
              other =>
                other.classList.remove(
                  "is-active"
                )
            );

            card.classList.add(
              "is-active"
            );

          }
        );


        card.addEventListener(
          "focus",
          () => {

            cards.forEach(
              other =>
                other.classList.remove(
                  "is-active"
                )
            );

            card.classList.add(
              "is-active"
            );

          }
        );

      });


      grid.addEventListener(
        "mouseleave",
        () => {

          cards.forEach(
            card =>
              card.classList.remove(
                "is-active"
              )
          );

        }
      );

    });

}


/* =========================================================
   RUN
   ========================================================= */

renderHomeWorks();
renderProjectIndex();
