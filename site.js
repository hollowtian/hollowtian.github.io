/* =========================================================
   SITE RENDERER
   Global identity, navigation, footer and metadata
   ========================================================= */


if (typeof SITE !== "undefined") {


  /* =====================================================
     SITE NAME
     ===================================================== */


  const siteNames =
    document.querySelectorAll(
      ".site-name"
    );


  siteNames.forEach(
    element => {

      element.textContent =
        SITE.nameDisplay;

      element.href =
        "index.html";

    }
  );



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
