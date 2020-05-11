//Your API key is: 89970aa6f414475ab22c9f8855874290

console.log("Yo Yo News Website :");


//It is card function :, whenever We call it , It will return card structure as string
//Providing three argument of it:
//title,url,imgUrl 
let card = (title,url,imgUrl) =>{

    return ` <div class="card" style ="">
    <img class="card-img-top" src= '${imgUrl}' alt="Card image cap">
    <div class="card-body">
      <p class="card-text">${title}</p>
      <a href= '${url}' class="btn btn-primary w-100">explore it</a>
    </div>
  </div>` 

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
          <button class="btn btn-link" data-toggle="collapse" data-target='${id}' aria-expanded="true" aria-controls="collapseOne">
             ${title}
          </button>
        </h5>
      </div>
  
      <div id= '${id}' class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
         ${content}
         <a href ='${url}'>source</a>

        </div>
      </div>
    </div>
    
  </div>
  
    `

}