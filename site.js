/* =========================================================
   SITE SYSTEM
   Identity / Navigation / Metadata / Motion / Utilities
   ========================================================= */


/* =========================================================
   GLOBAL SITE DATA
   ========================================================= */

if (typeof SITE !== "undefined") {


  /* SITE NAME */

  document
  .querySelectorAll(".site-name")
  .forEach(element => {

    element.href =
      "index.html";

    element.setAttribute(
      "aria-label",
      "Haotian Zhang — Home"
    );

    element.innerHTML = `
      <img
        src="images/favicon/favicon.png"
        alt=""
        class="site-logo-image"
      >
    `;

  });

  /* =====================================================
     CURRENT PAGE
     ===================================================== */

  const filename =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  let pageKey =
    "home";


  if (
    filename === "projects.html"
  ) {
    pageKey = "projects";
  }

  else if (
    filename === "journal.html"
  ) {
    pageKey = "journal";
  }

  else if (
    filename === "about.html"
  ) {
    pageKey = "about";
  }

  else if (
    filename === "cv.html"
  ) {
    pageKey = "cv";
  }

  else if (
    filename === "work.html"
  ) {
    pageKey = "work";
  }

  else if (
    filename === "article.html"
  ) {
    pageKey = "article";
  }


  /* =====================================================
     NAVIGATION
     ===================================================== */

  const navigationLinks =
    document.querySelectorAll(
      ".site-nav a"
    );


  function updateNavigation() {

    navigationLinks.forEach(link => {

      const href =
        link.getAttribute("href") || "";


      link.classList.remove(
        "active"
      );


      if (
        href.includes("#work")
      ) {

        link.textContent =
          SITE.navigation.selectedWork;

      }

      else if (
        href.includes(
          "projects.html"
        )
      ) {

        link.textContent =
          SITE.navigation.projectIndex;

      }

      else if (
        href.includes(
          "journal.html"
        )
      ) {

        link.textContent =
          SITE.navigation.journal;

      }

      else if (
        href.includes(
          "about.html"
        )
      ) {

        link.textContent =
          SITE.navigation.about;

      }

      else if (
        href.includes(
          "cv.html"
        )
      ) {

        link.textContent =
          SITE.navigation.cv;

      }


      let active = false;


      if (
        pageKey === "projects" &&
        href.includes(
          "projects.html"
        )
      ) {

        active = true;

      }

      else if (
        (
          pageKey === "journal" ||
          pageKey === "article"
        ) &&
        href.includes(
          "journal.html"
        )
      ) {

        active = true;

      }

      else if (
        pageKey === "about" &&
        href.includes(
          "about.html"
        )
      ) {

        active = true;

      }

      else if (
        pageKey === "cv" &&
        href.includes(
          "cv.html"
        )
      ) {

        active = true;

      }

      else if (
        pageKey === "work" &&
        href.includes("#work")
      ) {

        active = true;

      }

      else if (
        pageKey === "home" &&
        window.location.hash ===
          "#work" &&
        href.includes("#work")
      ) {

        active = true;

      }


      if (active) {

        link.classList.add(
          "active"
        );

      }

    });

  }


  updateNavigation();


  window.addEventListener(
    "hashchange",
    updateNavigation
  );


  /* =====================================================
     FOOTER
     ===================================================== */

  document
    .querySelectorAll(
      ".site-footer"
    )
    .forEach(footer => {

      const children =
        Array.from(
          footer.children
        );


      if (
        children.length > 0
      ) {

        children[0].textContent =
          `© ${
            new Date().getFullYear()
          } ${SITE.nameDisplay}`;

      }


      children.forEach(
        element => {

          const text =
            element.textContent
              .trim()
              .toUpperCase();


          if (
            text === "NEW YORK"
          ) {

            element.textContent =
              SITE.location
                .toUpperCase();

          }

        }
      );

    });


  /* =====================================================
     HOMEPAGE TEXT
     ===================================================== */

  document
    .querySelectorAll(
      "[data-site-profile]"
    )
    .forEach(element => {

      element.textContent =
        SITE.profile;

    });


  document
    .querySelectorAll(
      "[data-site-about]"
    )
    .forEach(element => {

      element.textContent =
        SITE.about;

    });


  /* =====================================================
     PAGE METADATA
     ===================================================== */

  const pageData =
    SITE.pages[pageKey];


  if (pageData) {

    document.title =
      pageData.title;


    let description =
      document.querySelector(
        'meta[name="description"]'
      );


    if (!description) {

      description =
        document.createElement(
          "meta"
        );

      description.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        description
      );

    }


    description.setAttribute(
      "content",
      pageData.description
    );

  }

}



/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeReveal() {

  const revealTargets =
    document.querySelectorAll(
      `
      .section-heading,
      .home-journal-item,
      .home-about,
      .project-strip-section-head,
      .journal-category,
      .journal-post,
      .about-intro,
      .about-details,
      .about-bio,
      .cv-intro,
      .cv-section,
      .project-detail-header,
      .project-hero-layout,
      .project-copy-section,
      .project-gallery-item,
      .article-header,
      .article-hero,
      .article-paragraph,
      .article-heading,
      .article-figure
      `
    );


  if (
    !("IntersectionObserver"
      in window)
  ) {

    revealTargets.forEach(
      element =>
        element.classList.add(
          "is-visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList.add(
                "is-visible"
              );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.08,
        rootMargin:
          "0px 0px -30px 0px"
      }

    );


  revealTargets.forEach(
    element => {

      element.classList.add(
        "reveal-item"
      );

      observer.observe(
        element
      );

    }
  );

}


window.addEventListener(
  "load",
  initializeReveal
);



/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop =
  document.createElement(
    "button"
  );


backToTop.className =
  "back-to-top";


backToTop.type =
  "button";


backToTop.setAttribute(
  "aria-label",
  "Back to top"
);


backToTop.innerHTML = `
  <span>TOP</span>
  <span class="back-to-top-arrow">
    ↑
  </span>
`;


document.body.appendChild(
  backToTop
);


function updateBackToTop() {

  backToTop.classList.toggle(
    "is-visible",
    window.scrollY > 500
  );

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  {
    passive: true
  }
);


updateBackToTop();


backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);
