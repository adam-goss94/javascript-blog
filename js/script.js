'use strict';
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleAuthorSelector = '.post-author',
    optArticleTagsSelector = '.post-tags .list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

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

  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    document.querySelector(optTitleListSelector).innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();  

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function calculateTagsParams(tags){
    const params = {
      max: 0,
      min: 999,
    };

    for(let tag in tags){
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }

    return params;
  }

  function calculateTagsClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    const className = optCloudClassPrefix + classNumber;
    return className;
  }

  function generateTags(){

    let allTags = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){
      const articleTitle = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for(let tag of articleTagsArray){
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html = html + linkHTML;

        if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
          allTags[tag] = 1;
        }else{
          allTags[tag]++;
        }
      }

      articleTitle.innerHTML = html;
    }

    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    for (let tag in allTags){
      allTagsHTML += '<li><a class="'+calculateTagsClass(allTags[tag], tagsParams)+'" href="#tag-' + tag + '">'+tag+'(' + allTags[tag] + ')</li></a>';
    }

    tagList.innerHTML = allTagsHTML;

  }
  generateTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let tagActiveLink of tagActiveLinks) {
      tagActiveLink.classList.remove('active');
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let tagLink of tagLinks) {
      tagLink.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '" ]');
  }
  
  function addClickListtenersToTag() {
    const linksToTag = document.querySelectorAll('.post-tags .list a');

    for (let linkToTag of linksToTag) {
      linkToTag.addEventListener('click', tagClickHandler);
    }
  }
  addClickListtenersToTag();


  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
  
    for(let article of articles){
      const authors = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHTML;  
  
      authors.innerHTML = html;
    }
  }
  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');    
    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for (let authorActiveLink of authorActiveLinks) {
      authorActiveLink.classList.remove('active');
    }
    
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    
    generateTitleLinks('[data-author="' + author + '" ]'); 
  }
  
  function addClickListtenersToAuthor() {
    const linksToAuthors = document.querySelectorAll('.post-author a');
    
    for (let linkToAuthor of linksToAuthors) {
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  }
  addClickListtenersToAuthor();
}


