//Your API key is: 89970aa6f414475ab22c9f8855874290
//It is Api Key :Please Visit https://newsapi.org for Your Api key :  
const key = "89970aa6f414475ab22c9f8855874290" ;

// Url :Where we are fetching data :
let server = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${key}`;

//It is function which return link:Where we fetch data/news :
//Passing 2 argument:
//1st one :catagory Of news:
//2nd one :Api Key :
const url = (catagory,key) =>{
  return `http://newsapi.org/v2/top-headlines?country=in&catagory=${catagory}&apiKey=${key}` ;
}

//Selecting  element having id value = dropdown  & store to drop variable : 
 const drop  = document.querySelector('#dropdown');

 ////assign particular anonymous function on change event at drop Object :
 drop.addEventListener('change',(eventObject)=>{

   //Accessing value of target element/Object & store to catagory variable :
   let catagory =  eventObject.target.value;

   //calling url function and passing catagory and key :
   const link =  url(catagory,key);
   
   //Calling fetch Api :
   fetchApi(link, insertRow, insertCollapse);

 });

//Accessing and storing search Object (element having id value :search) into search variable :
const search = document.querySelector('#search');

//assign particular anonymous function on input event :  
search.addEventListener('input', (eventObject) => {

  //accessing inner Text of event element(element on which event assign) ,convert into lower case and store to data variable : 
  let data = eventObject.target.value.toLowerCase();

  // Accessing all child elements of collapse object(element having id value = collapse) and store to list array : 
  //list is HTML COllection :
  let list = document.querySelector('#collapse').children;

  //Array from () is function which convert HTML Collection to Array :
  //iterating list array through forEach method :
  //for Each is method is used to iterate array :
  //for Each is callback function :it receiver a function as argument:
  Array.from(list).forEach((element) => {

    //accesssing child element ,having class value = card-body & store to b1 :  
    let b1 = element.querySelector('.card-body');

    //accessing innerText and convert into lower case and store to text variable : 
    let text = b1.innerText.toLowerCase();


    //include is a method ,which return true it given data found in text :    
    //if data not found in text then if block execute:
    if (!(text.includes(data)))
      element.style.display = "none"; // changing display property of element & assign to  none: (Means element  is not visible to web page:) 

    //if Data contain empty string :
    //then if block executed :     
    if (data == "")
      element.style.display = "block"; // changing display propeerty of element & assign to display :: (Means element  is  visible to web page:)
  })
});

//It is random function :It is generating random number from 0 to 20:
const random = () => {
  return Math.floor(Math.random() * 20);
}

//It is insertCollapse function :It  Inserts News to Collpase structure and append to collapse Object(Element Having id value= collase):
//providing one argument as News :
const insertCollapse = (News) => {
  //create and initialize variable by 1 :  
  let i = 1;


  //creating empty string :
  let text = ``;

  //It is looping article list present in News Object through forEach method:
  //article is array of Object of News
  //article = [ {News1},{News2},{News3}....]:
  //forEach() is built-in method in array/list:

  News.articles.forEach((article) => {
    //creating id variable and initialize with collai++ value : 
    let id = `colla${i++}`
    //Whenever we call collpase function it return collpase structure as string :
    //we passing for argument on it:
    text += collapse(id, article.title, article.content, article.url)
  })

  //Inserting text into collapse object(Element having id="Collapse")
  document.querySelector('#collapse').innerHTML = text;

}

//It is insertRow function :  Insert News to Card structure and append to row Object(Element Having id value= collase):
const insertRow = News => {

  //creating article variable & assigning empty array/list :  
  const Articles = [];

  //Inserting random article from News.article array/list to Articles List:
  Articles.push(News.articles[random()]);

  //Inserting random article from News.article array/list to Articles List:
  Articles.push(News.articles[random()]);

  //Inserting random article from News.article array/list to Articles List:
  Articles.push(News.articles[random()]);


  //creating text variable & assigning empty string :  
  let text = ``;

  //It is looping article list through for Each function():
  //article is array of News
  //article = [ {News1},{News2},{News3}....]:
  //forEach() is built-in method in array/list:
  Articles.forEach((article) => {

    //Calling card function:it return card structure as string ,storing to text variable & giving appropiate arguments : 
    text += card(article.title, article.url, article.urlToImage)
  });

  //Accessing row object(element having class value = row) & assigning text as innerHTML :
  document.querySelector('.row').innerHTML = text;

}


// fetchApi is an function: It is responsible to fetch data from given url :
// Providing an argument as url(where to fetch news data :)
const fetchApi = (url, insertRow, insertCollapse) => {

  //For request and fetching data from server ,we create Object of XMLHttpRequest Object : 
  let xhr = new XMLHttpRequest();

  //calling open function and passing three argument:
  //1st one : either GET or POST:
  //2nd one:  Url:
  //3rd : either true or false :
  //true for asynchronous operations:
  //false for synchronous operations,now we donot use it :  
  xhr.open("GET", server, true);

  //calling send function: Responsible for sending request to given url :
  xhr.send();

  //onprogress is event : It triggers whenever data is loading from server :
  //assigning an anonymous function to onprogress event :
  //so when onprogress event triggers :given function will run automatically :  
  xhr.onprogress = () => {
    let text = `<h1 class="display-4 text-center mx-auto">Wait a Minute: News are loading :)</h1> `
    document.querySelector('#row').innerHTML = text;
    document.querySelector('#collapse').innerHTML = text;
  }
  //onload is event :It triggers when data completely load from server or response received from server :
  //assigning an anonymous function to onload event :
  //so when onload event triggers :given function will run automatically :   
  xhr.onload = () => {
    //whenever data is succesfully load from server status container value:200
    //Otherwise it would be 404,503.....etc:
    if (xhr.status == 200) {
      // xhr.responseText contain  data(data as text) sent from server:
      //JSON.parse() :responsible to convert JSON text into javascript Object:
      //So receiving data ,convert into javascript object and storing into News Object :    
      const News = JSON.parse(xhr.responseText);
      //Calling insertRow function and passing News object to it: 
      insertRow(News);
      //Calling insertCollapse function and passing News object to it:  
      insertCollapse(News);
    }
    else {
      // assigning  html string into text vaiable :
      let text = `<h1 class="display-4"> <span class="badge badge-danger">Oops data did not load ,Try again :( </span> </h1>`;

      //accessing row object(element having id value = row ) & insert text to it innerHTML :
      document.querySelector('#row').innerHTML = text;

      //accessing collapse object(element having id value = collapse ) & insert text to it innerHTML :
      document.querySelector('#collapse').innerHTML = text;

    }
  }


}


fetchApi(url, insertRow, insertCollapse);

//It is card function :, whenever We call it , It will return card structure as string
//Providing three argument of it:
//title,url,imgUrl 
let card = (title, url, imgUrl) => {

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
let collapse = (id, title, content, url) => {

  return `
    <div id="accordion col-sm-12">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h6 class="mb-0" style="font-size:3vh;" >
          <button class="btn-link badge-danger" data-toggle="collapse" data-target='#${id}' aria-expanded="true" aria-controls="collapseOne">
             ${title}
          </button>
        </h6>
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