//Your API key is: 89970aa6f414475ab22c9f8855874290
//It is Api Key :Please Visit https://newsapi.org for Your Api key :  
const key = "89970aa6f414475ab22c9f8855874290"
 
//Creating Url :
let  url = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${key}` ;


//It is random function :It is generating random number from 0 to 20:
const random = ()=>{
  return  Math.floor(Math.random()*20) ;
}

//It is insertCollapse function :It  Inserts News to Collpase structure and append to collapse Object(Element Having id value= collase):
//providing one argument as News :
const insertCollapse = (News) =>{
//create and initialize variable by 1 :  
let i = 1;


//creating empty string :
let text = `` ;

//It is looping article list present in News Object through forEach method:
//article is array of Object of News
//article = [ {News1},{News2},{News3}....]:
//forEach() is built-in method in array/list:

News.articles.forEach((article)=>{
  //creating id variable and initialize with collai++ value : 
 let id =`colla${i++}`
 //Whenever we call collpase function it return collpase structure as string :
 //we passing for argument on it:
   text += collapse(id,article.title,article.content,article.url)  
})

//Inserting text into collapse object(Element having id="Collapse")
document.querySelector('#collapse').innerHTML = text;

}
const insertRow = News =>{
    
const Articles  = [] ;
console.log("Our news :",News);
Articles.push(News.articles[random()]);
Articles.push(News.articles[random()]);
Articles.push(News.articles[random()]);

 
console.log(Articles);
let text = ``;
Articles.forEach((article)=>{
 text  += card(article.title,article.url,article.urlToImage)
});

document.querySelector('.row').innerHTML = text ;
 
}


// fetchApi is an function: It is responsible to fetch data from given url :
// Providing an argument as url(where to fetch news data :)
const  fetchApi = (url,insertRow,insertCollapse) =>{

  let xhr =  new  XMLHttpRequest() ;
  xhr.open("GET",url,true);
  xhr.send();
  
  xhr.onprogress = () =>{
    let text  = `<h1 class="display-4 text-center mx-auto">Wait a Minute: Data is loading :)</h1> `
    document.querySelector('#row').innerHTML = text; 
    document.querySelector('#collapse').innerHTML = text;
  }
  xhr.onload = () =>{

    if(xhr.status == 200){
      console.log(JSON.parse(xhr.responseText));
       const News = JSON.parse(xhr.responseText) ;
        insertRow(News); 
        insertCollapse(News);
    }
    else{
      let text = `<h1 class="display-4"> <span class="badge badge-danger">Oops data did not load ,Try again :( </span> </h1>` ;
      document.querySelector('#row').innerHTML = text ;
      document.querySelector('#collapse').innerHTML = text ;

    }
  }
  

}


fetchApi(url,insertRow,insertCollapse);

//It is card function :, whenever We call it , It will return card structure as string
//Providing three argument of it:
//title,url,imgUrl 
let card = (title,url,imgUrl) =>{

    return `  <div class="col-sm-4">
    <div class="card" style ="width:100%">
    <img class="card-img-top " src= '${imgUrl}' alt="Card image cap" >
    <div class="card-body">
      <p class="card-text">${title}</p>
      <a href= '${url}' class="btn btn-primary w-100">View More</a>
    </div>
  </div>
  </div>
  ` 

}

// It is collapse function:,whenever We call it , It will return collapse structure as string
//Providing four argument of it:
//id,title,content,url 
let collapse = (id,title,content,url) =>{
 
    return `
    <div id="accordion">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button class="btn btn-link badge badge-danger" data-toggle="collapse" data-target='#${id}' aria-expanded="true" aria-controls="collapseOne">
             ${title}
          </button>
        </h5>
      </div>
  
      <div id= '${id}' class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
         ${content}
         <a href ='${url}' class="badge badge-primary" target="_blank">source</a>

        </div>
      </div>
    </div>
    
  </div>
  
    `

}