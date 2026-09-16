/* =========================================================
   JOURNAL DATABASE
   ========================================================= */


/* =========================================================
   CATEGORIES
   ========================================================= */

const JOURNAL_CATEGORIES = {


  "architecture": {

    number: "01",

    title: "Architecture",

    description:
      "Buildings, cities, materials, details and observations on the built environment.",

    image: null,

    position: "50% 50%"

  },


  "automobile": {

    number: "02",

    title: "Automobile",

    description:
      "Cars, driving, engineering, design and the culture surrounding the automobile.",

    image:
      "images/journal/automobile.jpg",

    position:
      "50% 50%"

  },


  "photography": {

    number: "03",

    title: "Photography",

    description:
      "Images, visual studies, cameras and observations through photography.",

    image: null,

    position: "50% 50%"

  },


  "objects": {

    number: "04",

    title: "Objects",

    description:
      "Objects, products, materials and industrial design.",

    image: null,

    position: "50% 50%"

  },


  "places": {

    number: "05",

    title: "Places",

    description:
      "Cities, landscapes, travel and places worth remembering.",

    image: null,

    position: "50% 50%"

  }

};



/* =========================================================
   ARTICLES
   ========================================================= */

const JOURNAL_POSTS = {


  /* =====================================================
     TEST ENTRY
     ===================================================== */

  "journal-test": {

    published: false,

    title: "Journal System Test",

    category: "architecture",

    date: "2026-09-16",

    dateDisplay: "September 16, 2026",

    excerpt:
      "A temporary entry for testing the Journal publishing system.",


    hero: {

      image: null,

      position: "50% 50%"

    },


    body: [


      {
        type: "paragraph",

        text:
          "This is a temporary Journal entry used to test the publishing system."
      },


      {
        type: "heading",

        text:
          "A Data-Driven Journal"
      },


      {
        type: "paragraph",

        text:
          "Articles are now stored in journal-data.js and rendered automatically through a shared article template."
      },


      {
        type: "image",

        image: null,

        ratio: "landscape",

        position: "50% 50%",

        caption:
          "Example image caption."
      }


    ]

  }

};
