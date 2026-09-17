/* =========================================================
   WORK LIST RENDERER
   Homepage + Project Index
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */


function getSortedWorks() {

  return Object.entries(WORKS).sort(
    (a, b) => {

      return (
        parseInt(a[1].number) -
        parseInt(b[1].number)
      );

    }
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


  element.classList.add(
    "has-image"
  );

}



/* =========================================================
   HOMEPAGE — SELECTED WORK
   ========================================================= */


function renderHomeWorks() {


  const leftColumn =
    document.getElementById(
      "home-work-left"
    );


  const rightColumn =
    document.getElementById(
      "home-work-right"
    );


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


  const works =
    getSortedWorks();


  works.forEach(
    ([id, work]) => {


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
        `home-work-image ${work.home.ratio || "landscape"}`;


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

        <div>

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


      card.appendChild(
        image
      );


      card.appendChild(
        info
      );


      if (
        work.home.column === "left"
      ) {

        leftColumn.appendChild(
          card
        );

      }


      else if (
        work.home.column === "right"
      ) {

        rightColumn.appendChild(
          card
        );

      }


      else if (
        work.home.column === "feature"
      ) {

        featureContainer.appendChild(
          card
        );

      }


    }
  );

}



/* =========================================================
   PROJECT INDEX — THUMBNAIL GRID
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


  const works =
    getSortedWorks();


  works.forEach(
    ([id, work]) => {


      if (
        !work.index ||
        work.index.show === false
      ) {

        return;

      }


      /* -----------------------------------------------
         CARD
         ----------------------------------------------- */

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



      /* -----------------------------------------------
         IMAGE
         ----------------------------------------------- */

      const image =
        document.createElement(
          "div"
        );


      image.className =
        "project-strip-thumb";


      applyBackgroundImage(
        image,
        work.index.image,
        work.index.position
      );



      /* -----------------------------------------------
         INFORMATION
         ----------------------------------------------- */

      const info =
        document.createElement(
          "div"
        );


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



      card.appendChild(
        image
      );


      card.appendChild(
        info
      );



      /* -----------------------------------------------
         CATEGORY
         ----------------------------------------------- */

      if (
        work.category === "academic"
      ) {

        academic.appendChild(
          card
        );

      }

      else {

        professional.appendChild(
          card
        );

      }


    }
  );


  initProjectIndexInteraction();

}



/* =========================================================
   PROJECT INDEX INTERACTION
   ========================================================= */


function initProjectIndexInteraction() {


  const grids =
    document.querySelectorAll(
      ".project-strip-grid"
    );


  grids.forEach(
    grid => {


      const cards =
        grid.querySelectorAll(
          ".project-strip-card"
        );


      cards.forEach(
        card => {


          card.addEventListener(
            "mouseenter",
            () => {


              cards.forEach(
                otherCard => {

                  otherCard.classList.remove(
                    "is-active"
                  );

                }
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
                otherCard => {

                  otherCard.classList.remove(
                    "is-active"
                  );

                }
              );


              card.classList.add(
                "is-active"
              );


            }
          );


        }
      );


      grid.addEventListener(
        "mouseleave",
        () => {


          cards.forEach(
            card => {

              card.classList.remove(
                "is-active"
              );

            }
          );


        }
      );


    }
  );

}



/* =========================================================
   RUN
   ========================================================= */


renderHomeWorks();

renderProjectIndex();

/* =========================================================
   PROJECT INDEX — THUMBNAIL GRID
   ========================================================= */


/* ---------------------------------------------------------
   SECTION
   --------------------------------------------------------- */

.project-strip-section {
  margin-bottom: 120px;
}


.project-strip-section-head {
  display: grid;
  grid-template-columns: 220px 1fr;

  gap: 24px;

  align-items: end;

  position: relative;

  padding-top: 20px;
  margin-bottom: 28px;
}


/* short graphic rule */

.project-strip-section-head::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;

  width: 72px;
  height: 1px;

  background: var(--color-text);
}


.project-strip-section-title {
  margin: 0;

  font-family: var(--font-display);

  font-size: clamp(
    28px,
    2.5vw,
    42px
  );

  line-height: 1;

  letter-spacing: -0.045em;

  font-weight: 600;
}



/* ---------------------------------------------------------
   GRID
   --------------------------------------------------------- */

.project-strip-grid {
  display: grid;

  grid-template-columns:
    repeat(
      5,
      minmax(0, 1fr)
    );

  gap:
    38px
    18px;

  align-items: start;
}



/* ---------------------------------------------------------
   CARD
   --------------------------------------------------------- */

.project-strip-card {
  display: block;

  min-width: 0;

  color: inherit;

  text-decoration: none;

  position: relative;

  cursor: pointer;

  transition:
    transform 0.32s
    cubic-bezier(.2,.7,.2,1);
}


.project-strip-card-inactive {
  cursor: default;
}



/* ---------------------------------------------------------
   IMAGE
   --------------------------------------------------------- */

.project-strip-thumb {
  width: 100%;

  aspect-ratio: 4 / 3;

  position: relative;

  overflow: hidden;

  background-color:
    var(--color-placeholder);

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;


  /* default state */

  filter:
    grayscale(100%);

  opacity: 0.58;


  transform:
    scale(0.96);


  transform-origin:
    center center;


  transition:
    filter 0.42s ease,
    opacity 0.42s ease,
    transform 0.42s
      cubic-bezier(.2,.7,.2,1);
}



/* placeholder */

.project-strip-thumb::after {
  content: "IMAGE";

  position: absolute;

  left: 8px;
  bottom: 8px;

  font-family:
    var(--font-technical);

  font-size: 8px;

  letter-spacing: 0.06em;
}


.project-strip-thumb.has-image::after {
  content: none;
}



/* ---------------------------------------------------------
   ACTIVE IMAGE
   --------------------------------------------------------- */

.project-strip-card:hover
.project-strip-thumb,

.project-strip-card:focus-visible
.project-strip-thumb,

.project-strip-card.is-active
.project-strip-thumb {

  filter:
    grayscale(0%);

  opacity: 1;

  transform:
    scale(1);
}



/* other projects fade slightly when one is active */

.project-strip-grid:has(
  .project-strip-card:hover
)
.project-strip-card:not(:hover)
.project-strip-thumb {

  opacity: 0.42;
}



/* ---------------------------------------------------------
   INFORMATION
   --------------------------------------------------------- */

.project-strip-meta {
  position: relative;

  padding-top: 10px;
}


.project-strip-number {
  margin-bottom: 6px;

  font-family:
    var(--font-technical);

  font-size: 9px;

  line-height: 1;

  color:
    var(--color-muted);
}


.project-strip-name {
  padding-right: 22px;

  font-family:
    var(--font-display);

  font-size: 15px;

  line-height: 1.15;

  letter-spacing: -0.025em;

  font-weight: 600;
}


.project-strip-subtitle {
  margin-top: 5px;

  font-family:
    var(--font-technical);

  font-size: 10px;

  line-height: 1.4;

  color:
    var(--color-muted);
}


.project-strip-detail {
  margin-top: 2px;

  font-family:
    var(--font-technical);

  font-size: 9px;

  line-height: 1.4;

  color:
    #777;
}


.project-strip-detail span {
  padding: 0 3px;
}



/* ---------------------------------------------------------
   ARROW
   --------------------------------------------------------- */

.project-strip-meta::after {
  content: "↗";

  position: absolute;

  top: 8px;
  right: 0;

  font-family:
    var(--font-technical);

  font-size: 11px;

  opacity: 0;

  transform:
    translateX(-6px);

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}


.project-strip-card:hover
.project-strip-meta::after,

.project-strip-card:focus-visible
.project-strip-meta::after,

.project-strip-card.is-active
.project-strip-meta::after {

  opacity: 1;

  transform:
    translateX(0);
}



/* no arrow for inactive projects */

.project-strip-card-inactive
.project-strip-meta::after {

  display: none;
}



/* ---------------------------------------------------------
   TEXT ACTIVE STATE
   --------------------------------------------------------- */

.project-strip-card:hover
.project-strip-number,

.project-strip-card:hover
.project-strip-subtitle,

.project-strip-card:hover
.project-strip-detail,

.project-strip-card.is-active
.project-strip-number,

.project-strip-card.is-active
.project-strip-subtitle,

.project-strip-card.is-active
.project-strip-detail {

  color:
    var(--color-text);
}



/* ---------------------------------------------------------
   SUBTLE LIFT
   --------------------------------------------------------- */

.project-strip-card:hover,
.project-strip-card.is-active {

  transform:
    translateY(-3px);
}


.project-strip-card-inactive:hover {

  transform:
    none;
}



/* =========================================================
   PROJECT INDEX — RESPONSIVE
   ========================================================= */


@media (max-width: 1300px) {

  .project-strip-grid {

    grid-template-columns:
      repeat(
        4,
        minmax(0, 1fr)
      );

  }

}


@media (max-width: 1000px) {

  .project-strip-grid {

    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );

  }

}


@media (max-width: 900px) {

  .project-strip-section {
    margin-bottom: 90px;
  }


  .project-strip-section-head {

    grid-template-columns:
      1fr;

    gap: 10px;

    margin-bottom: 22px;
  }


  .project-strip-grid {

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      32px
      12px;
  }


  .project-strip-thumb {

    transform:
      none;

    opacity:
      0.7;
  }


  .project-strip-card:hover {

    transform:
      none;
  }

}


@media (max-width: 520px) {

  .project-strip-grid {

    grid-template-columns:
      1fr;

  }


  .project-strip-thumb {

    aspect-ratio:
      4 / 3;
  }

}
