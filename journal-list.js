/* =========================================================
   JOURNAL LIST RENDERER
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */


function getPublishedPosts() {

  return Object.entries(JOURNAL_POSTS)

    .filter(
      ([id, post]) =>
        post.published === true
    )

    .sort(
      (a, b) =>
        new Date(b[1].date) -
        new Date(a[1].date)
    );

}



function applyJournalImage(
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
   CATEGORY DIRECTORY
   ========================================================= */


function renderJournalCategories() {


  const container =
    document.getElementById(
      "journal-category-list"
    );


  if (!container) {
    return;
  }



  Object.entries(
    JOURNAL_CATEGORIES
  ).forEach(
    ([id, category]) => {


      const item =
        document.createElement("a");


      item.className =
        "journal-category";


      item.href =
        `journal.html?category=${id}`;


      item.innerHTML = `

        <div class="journal-category-number">
          ${category.number}
        </div>

        <div class="journal-category-name">
          ${category.title}
        </div>

        <div class="journal-category-description">
          ${category.description}
        </div>

        <div class="journal-category-arrow">
          →
        </div>

      `;


      container.appendChild(item);


    }
  );

}



/* =========================================================
   ARTICLE LIST
   ========================================================= */


function renderJournalPosts() {


  const container =
    document.getElementById(
      "journal-post-list"
    );


  const heading =
    document.getElementById(
      "journal-post-heading"
    );


  if (!container) {
    return;
  }



  const params =
    new URLSearchParams(
      window.location.search
    );


  const selectedCategory =
    params.get("category");



  let posts =
    getPublishedPosts();



  if (
    selectedCategory &&
    JOURNAL_CATEGORIES[selectedCategory]
  ) {


    posts =
      posts.filter(
        ([id, post]) =>
          post.category === selectedCategory
      );


    if (heading) {

      heading.textContent =
        JOURNAL_CATEGORIES[
          selectedCategory
        ].title;

    }

  }



  if (posts.length === 0) {


    const empty =
      document.createElement("div");


    empty.className =
      "journal-empty";


    empty.textContent =
      "No entries yet.";


    container.appendChild(empty);


    return;

  }



  posts.forEach(
    ([id, post]) => {


      const article =
        document.createElement("a");


      article.className =
        "journal-post";


      article.href =
        `article.html?id=${id}`;



      const image =
        document.createElement("div");


      image.className =
        "journal-post-image";


      applyJournalImage(
        image,
        post.hero?.image,
        post.hero?.position
      );



      const category =
        JOURNAL_CATEGORIES[
          post.category
        ];



      const information =
        document.createElement("div");


      information.innerHTML = `

        <div class="journal-post-category">
          ${category?.title || ""}
        </div>

        <div class="journal-post-title">
          ${post.title}
        </div>

        <div class="journal-post-date">
          ${post.dateDisplay || post.date}
        </div>

      `;



      article.appendChild(image);

      article.appendChild(information);


      container.appendChild(article);


    }
  );

}



/* =========================================================
   RUN
   ========================================================= */


renderJournalCategories();

renderJournalPosts();
