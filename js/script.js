'use strict';
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  const generateTitleLinks = () => {
    /* remove contents of titleList */
    document.querySelector(optTitleListSelector).innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into variable */
      html = html + linkHTML;
    }
    document.querySelector(optTitleListSelector).innerHTML = html;
  };
  generateTitleLinks();


  const titleClickHandler = function(event){
    event.preventDefault();

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    this.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    const articleSelector = this.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
    /* find all articles */

    /* START LOOP: for every article: */

      /* find tags wrapper */

      /* make html variable with empty string */

      /* get tags from data-tags attribute */

      /* split tags into array */

      /* START LOOP: for each tag */

        /* generate HTML of the link */

        /* add generated code to html variable */

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }

  generateTags();
}
