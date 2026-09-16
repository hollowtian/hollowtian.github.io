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


      if (!work.featured || !work.home) {
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

        featureContainer.appendChild(
          card
        );

      }


    }
  );

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


  if (!professional || !academic) {
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



      const row =
        document.createElement(
          work.page ? "a" : "div"
        );


      row.className =
        "project-index-row";


      if (work.page) {

        row.href =
          `work.html?id=${id}`;

      }



      const thumb =
        document.createElement("div");


      thumb.className =
        "project-index-thumb";


      applyBackgroundImage(
        thumb,
        work.index.image,
        work.index.position
      );



      row.innerHTML = `

        <div class="project-index-number">
          ${work.number}
        </div>

      `;


      row.appendChild(thumb);



      row.insertAdjacentHTML(
        "beforeend",

        `

        <div class="project-index-name">
          ${work.title}
        </div>

        <div class="project-index-location">
          ${work.location}
        </div>

        <div class="project-index-type">
          ${work.typology}
        </div>

        <div class="project-index-office">
          ${work.office}
        </div>

        `
      );



      if (
        work.category === "academic"
      ) {

        academic.appendChild(row);

      }

      else {

        professional.appendChild(row);

      }


    }
  );

}



/* =========================================================
   RUN
   ========================================================= */


renderHomeWorks();

renderProjectIndex();
