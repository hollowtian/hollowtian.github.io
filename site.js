/* =========================================================
   SITE RENDERER
   Global identity, navigation, footer, metadata, active nav
   ========================================================= */


if (typeof SITE !== "undefined") {


  /* =====================================================
     SITE NAME
     ===================================================== */

  const siteNames =
    document.querySelectorAll(".site-name");


  siteNames.forEach(
    element => {

      element.textContent =
        SITE.nameDisplay;

      element.href =
        "index.html";

    }
  );



  /* =====================================================
     DETECT CURRENT PAGE
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

    pageKey =
      "projects";

  }


  else if (
    filename === "journal.html"
  ) {

    pageKey =
      "journal";

  }


  else if (
    filename === "about.html"
  ) {

    pageKey =
      "about";

  }


  else if (
    filename === "cv.html"
  ) {

    pageKey =
      "cv";

  }


  else if (
    filename === "work.html"
  ) {

    pageKey =
      "work";

  }


  else if (
    filename === "article.html"
  ) {

    pageKey =
      "article";

  }



  /* =====================================================
     NAVIGATION
     ===================================================== */

  const navigationLinks =
    document.querySelectorAll(
      ".site-nav a"
    );


  navigationLinks.forEach(
    link => {


      const href =
        link.getAttribute("href") || "";


      /* TEXT */

      if (
        href.includes("#work")
      ) {

        link.textContent =
          SITE.navigation.selectedWork;

      }


      else if (
        href.includes("projects.html")
      ) {

        link.textContent =
          SITE.navigation.projectIndex;

      }


      else if (
        href.includes("journal.html")
      ) {

        link.textContent =
          SITE.navigation.journal;

      }


      else if (
        href.includes("about.html")
      ) {

        link.textContent =
          SITE.navigation.about;

      }


      else if (
        href.includes("cv.html")
      ) {

        link.textContent =
          SITE.navigation.cv;

      }



      /* ACTIVE STATE */

      let isActive =
        false;


      if (
        pageKey === "projects" &&
        href.includes("projects.html")
      ) {

        isActive =
          true;

      }


      else if (
        (
          pageKey === "journal" ||
          pageKey === "article"
        ) &&
        href.includes("journal.html")
      ) {

        isActive =
          true;

      }


      else if (
        pageKey === "about" &&
        href.includes("about.html")
      ) {

        isActive =
          true;

      }


      else if (
        pageKey === "cv" &&
        href.includes("cv.html")
      ) {

        isActive =
          true;

      }


      else if (
        (
          pageKey === "work" ||
          (
            pageKey === "home" &&
            window.location.hash === "#work"
          )
        ) &&
        href.includes("#work")
      ) {

        isActive =
          true;

      }


      if (isActive) {

        link.classList.add(
          "active"
        );

      }


    }
  );



  /* =====================================================
     FOOTER
     ===================================================== */

  const footers =
    document.querySelectorAll(
      ".site-footer"
    );


  footers.forEach(
    footer => {


      const children =
        Array.from(
          footer.children
        );


      if (children.length > 0) {

        const first =
          children[0];


        first.textContent =
          `© ${new Date().getFullYear()} ${SITE.nameDisplay}`;

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
              SITE.location.toUpperCase();

          }


        }
      );


    }
  );



  /* =====================================================
     HOMEPAGE PROFILE
     ===================================================== */

  const profileTexts =
    document.querySelectorAll(
      "[data-site-profile]"
    );


  profileTexts.forEach(
    element => {

      element.textContent =
        SITE.profile;

    }
  );



  /* =====================================================
     HOMEPAGE ABOUT
     ===================================================== */

  const aboutTexts =
    document.querySelectorAll(
      "[data-site-about]"
    );


  aboutTexts.forEach(
    element => {

      element.textContent =
        SITE.about;

    }
  );



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


const revealTargets = document.querySelectorAll(
  `
  .section-heading,
  .home-work-card,
  .home-work-feature,
  .home-journal-item,
  .home-about,
  .project-index-row,
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


revealTargets.forEach(
  element => {

    element.classList.add(
      "reveal-item"
    );

    if (
      element.classList.contains("section-heading") ||
      element.classList.contains("home-about") ||
      element.classList.contains("about-intro") ||
      element.classList.contains("cv-intro")
    ) {

      element.classList.add(
        "reveal-line"
      );

    }

  }
);


/* ---------------------------------------------------------
   OBSERVER
   --------------------------------------------------------- */


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }

  );


revealTargets.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);

/* =========================================================
   BACK TO TOP
   ========================================================= */


const backToTop =
  document.createElement("button");


backToTop.className =
  "back-to-top";


backToTop.setAttribute(
  "aria-label",
  "Back to top"
);


backToTop.innerHTML =
  `
  <span>TOP</span>
  <span class="back-to-top-arrow">↑</span>
  `;


document.body.appendChild(
  backToTop
);


/* SHOW / HIDE */

const updateBackToTop = () => {

  if (
    window.scrollY > 500
  ) {

    backToTop.classList.add(
      "is-visible"
    );

  }

  else {

    backToTop.classList.remove(
      "is-visible"
    );

  }

};


window.addEventListener(
  "scroll",
  updateBackToTop,
  {
    passive: true
  }
);


updateBackToTop();


/* CLICK */

backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

/* =========================================================
   PROJECT STRIP ACTIVE STATE
   ========================================================= */

document.querySelectorAll(".project-strip-track").forEach(track => {
  const cards = track.querySelectorAll(".project-strip-card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(c => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });

    card.addEventListener("focus", () => {
      cards.forEach(c => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });
});
