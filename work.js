/* =========================================================
   WORK TEMPLATE RENDERER
   ========================================================= */


const params =
  new URLSearchParams(window.location.search);


const workId =
  params.get("id");


const work =
  WORKS[workId];



/* =========================================================
   INVALID WORK
   ========================================================= */

if (!work) {

  document.querySelector(".project-page").innerHTML = `

    <section class="page-title">

      <h1>
        Work<br>
        Not Found
      </h1>

    </section>

    <a href="projects.html">
      ← PROJECT INDEX
    </a>

  `;

}



/* =========================================================
   RENDER WORK
   ========================================================= */

else {


  /* PAGE TITLE */

  document.title =
    `${work.title} — Haotian Zhang`;



  /* META DESCRIPTION */

  const descriptionMeta =
    document.getElementById("page-description");

  descriptionMeta.setAttribute(
    "content",
    `${work.title} — selected architectural work by Haotian Zhang.`
  );



  /* TITLE */

  document.getElementById(
    "work-kicker"
  ).textContent =
    `${work.number} / SELECTED WORK`;


  document.getElementById(
    "work-title"
  ).textContent =
    work.title;



  /* INFORMATION */

  document.getElementById(
    "work-location"
  ).textContent =
    work.location;


  document.getElementById(
    "work-typology"
  ).textContent =
    work.typology;


  document.getElementById(
    "work-office"
  ).textContent =
    work.office;


  document.getElementById(
    "work-role"
  ).textContent =
    work.role;


  document.getElementById(
    "work-year"
  ).textContent =
    work.year || "—";


  document.getElementById(
    "work-status"
  ).textContent =
    work.status || "—";



  /* HERO */

  const hero =
    document.getElementById(
      "work-hero"
    );


  if (work.hero && work.hero.image) {

    hero.style.backgroundImage =
      `url("${work.hero.image}")`;


    hero.style.backgroundPosition =
      work.hero.position || "50% 50%";


    hero.classList.add(
      "has-image"
    );

  }



  /* DESCRIPTION */

  const copy =
    document.getElementById(
      "work-copy"
    );


  work.description.forEach(
    paragraph => {

      const p =
        document.createElement("p");

      p.textContent =
        paragraph;

      copy.appendChild(p);

    }
  );



  /* GALLERY */

  const gallery =
    document.getElementById(
      "work-gallery"
    );


  if (
    work.gallery &&
    work.gallery.length > 0
  ) {


    work.gallery.forEach(
      (item, index) => {


        const wrapper =
          document.createElement("div");


        wrapper.className =
          "project-gallery-item";



        const image =
          document.createElement("div");


        image.className =
          "project-gallery-image";


        const ratio =
          item.ratio || "landscape";


        image.classList.add(
          `project-gallery-${ratio}`
        );


        image.style.backgroundImage =
          `url("${item.image}")`;


        image.style.backgroundPosition =
          item.position || "50% 50%";


        image.classList.add(
          "has-image"
        );



        wrapper.appendChild(
          image
        );



        if (item.caption) {


          const caption =
            document.createElement("div");


          caption.className =
            "project-caption";


          const number =
            String(index + 2)
              .padStart(2, "0");


          caption.innerHTML = `

            <span>
              ${number}
            </span>

            <span>
              ${item.caption}
            </span>

          `;


          wrapper.appendChild(
            caption
          );

        }


        gallery.appendChild(
          wrapper
        );


      }
    );

  }



  /* PREVIOUS */

  const previous =
    document.getElementById(
      "work-previous"
    );


  if (
    work.previous &&
    WORKS[work.previous]
  ) {


    const previousWork =
      WORKS[work.previous];


    previous.innerHTML = `

      <a href="work.html?id=${work.previous}">
        ← ${previousWork.title}
      </a>

    `;

  }

  else {

    previous.innerHTML = `

      <a href="projects.html">
        ← PROJECT INDEX
      </a>

    `;

  }



  /* NEXT */

  const next =
    document.getElementById(
      "work-next"
    );


  if (
    work.next &&
    WORKS[work.next]
  ) {


    const nextWork =
      WORKS[work.next];


    next.innerHTML = `

      <a href="work.html?id=${work.next}">
        ${nextWork.title} →
      </a>

    `;

  }

}
