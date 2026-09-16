/* =========================================================
   ARTICLE RENDERER
   ========================================================= */


const params =
  new URLSearchParams(
    window.location.search
  );


const articleId =
  params.get("id");


const article =
  JOURNAL_POSTS[articleId];



/* =========================================================
   INVALID ARTICLE
   ========================================================= */


if (!article) {


  document.querySelector(
    ".article-page"
  ).innerHTML = `

    <section class="page-title">

      <h1>
        Article<br>
        Not Found
      </h1>

    </section>

    <a href="journal.html">
      ← JOURNAL
    </a>

  `;

}



/* =========================================================
   ARTICLE
   ========================================================= */


else {


  const category =
    JOURNAL_CATEGORIES[
      article.category
    ];



  /* PAGE TITLE */

  document.title =
    `${article.title} — Haotian Zhang`;



  /* META DESCRIPTION */

  const description =
    document.getElementById(
      "article-description"
    );


  if (description) {

    description.setAttribute(
      "content",
      article.excerpt ||
      `${article.title} — Journal by Haotian Zhang.`
    );

  }



  /* CATEGORY */

  const categoryElement =
    document.getElementById(
      "article-category"
    );


  categoryElement.textContent =
    category?.title || "Journal";


  categoryElement.href =
    article.category
      ? `journal.html?category=${article.category}`
      : "journal.html";



  /* DATE */

  document.getElementById(
    "article-date"
  ).textContent =
    article.dateDisplay ||
    article.date ||
    "";



  /* TITLE */

  document.getElementById(
    "article-title"
  ).textContent =
    article.title;



  /* HERO */

  const hero =
    document.getElementById(
      "article-hero"
    );


  if (
    article.hero &&
    article.hero.image
  ) {


    hero.style.backgroundImage =
      `url("${article.hero.image}")`;


    hero.style.backgroundPosition =
      article.hero.position ||
      "50% 50%";


    hero.classList.add(
      "has-image"
    );

  }



  /* BODY */

  const body =
    document.getElementById(
      "article-body"
    );



  if (article.body) {


    article.body.forEach(
      block => {


        /* PARAGRAPH */

        if (
          block.type === "paragraph"
        ) {


          const p =
            document.createElement("p");


          p.className =
            "article-paragraph";


          p.textContent =
            block.text;


          body.appendChild(p);

        }



        /* HEADING */

        else if (
          block.type === "heading"
        ) {


          const heading =
            document.createElement("h2");


          heading.className =
            "article-heading";


          heading.textContent =
            block.text;


          body.appendChild(heading);

        }



        /* QUOTE */

        else if (
          block.type === "quote"
        ) {


          const quote =
            document.createElement(
              "blockquote"
            );


          quote.className =
            "article-quote";


          quote.textContent =
            block.text;


          body.appendChild(quote);

        }



        /* IMAGE */

        else if (
          block.type === "image"
        ) {


          const figure =
            document.createElement(
              "figure"
            );


          figure.className =
            "article-figure";



          const image =
            document.createElement("div");


          image.className =
            "article-image";


          image.classList.add(
            `article-image-${block.ratio || "landscape"}`
          );



          if (block.image) {


            image.style.backgroundImage =
              `url("${block.image}")`;


            image.style.backgroundPosition =
              block.position ||
              "50% 50%";


            image.classList.add(
              "has-image"
            );

          }



          figure.appendChild(image);



          if (block.caption) {


            const caption =
              document.createElement(
                "figcaption"
              );


            caption.className =
              "article-caption";


            caption.textContent =
              block.caption;


            figure.appendChild(caption);

          }



          body.appendChild(figure);

        }


      }
    );

  }


}
