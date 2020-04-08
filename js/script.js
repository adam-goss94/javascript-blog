'use strict';
{
  const test = "test"
  console.log(tes
  const templates = {
    articleLink: window.Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagCloudLink: window.Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleAuthorSelector = '.post-author',
    optArticleTagsSelector = '.post-tags .list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optArticleAuthorAll = 'data-author';

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
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
        const linkHTMLData = {id: 'tag-'+tag, title: tag};
        const linkHTML = templates.articleLink(linkHTMLData);
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
    const allTagsData = {tags: []};

    for (let tag in allTags){
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagsClass(allTags[tag], tagsParams)
      });
    }

    tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
  
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      let wrapperAuthors = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const author = article.getAttribute(optArticleAuthorAll);
      const linkHTMLData = {id: 'author-'+author, title: author};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
    
      if(!Object.prototype.hasOwnProperty.call(allAuthors, author)){
        allAuthors[author] = 1;
      }
      else {
        allAuthors[author]++;
      }
    
      wrapperAuthors.innerHTML = html;
      
    }
    const allAuthorList = document.querySelector('.authors');
    
    const allAuthorsData = {tags: []};
  
    for(let authorLink in allAuthors){
      allAuthorsData.tags.push({
        tag: authorLink,
        count: allAuthors[authorLink],
        className: 'author-' + authorLink,
      });            
    }

    allAuthorList.innerHTML = templates.tagCloudLink(allAuthorsData);
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


