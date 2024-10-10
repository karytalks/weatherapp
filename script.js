
    const usertab=document.querySelector("[data-userWeather]")
    const searchtab=document.querySelector("[data-searchWeather]")
    const grant=document.querySelector(".grant-location-container")
    const searchform=document.querySelector("[data-searchForm]")
    const loadingScreen=document.querySelector(".loading-screen-container")
    const userInfoContainer=document.querySelector(".user-info-container")  
    const grantAccess=document.querySelector("[data-grantAccess]")
    getfromSessionStorage()
    let currentTab=usertab; 
       currentTab.classList.add("current-tab")



       function switchTab(clickedTab){
         if(clickedTab!=currentTab){
 currentTab.classList.remove("current-tab")
 currentTab=clickedTab;
 currentTab.classList.add("current-tab")
  if(!searchform.classList.contains("active")){
     grant.classList.remove("active")
     loadingScreen.classList.remove("active")
     userInfoContainer.classList.remove("active")
     searchform.classList.add("active")
  }
  else{
     searchform.classList.remove("active")
     userInfoContainer.classList.remove("active")
     getfromSessionStorage();
  }
         }}


       function getfromSessionStorage(){
        const localCoordinates=sessionStorage.getItem("user-coordinates")
        if(!localCoordinates){
            grant.classList.add("active")
        }
        else{
             const coordinates=JSON.parse(localCoordinates)
             fetchUserWeatherInfo(coordinates)
        }
       }

       function renderWeatherInfo(data){
        const cityName=document.querySelector("[data-city-name]")
        const countryIcon=document.querySelector("[data-countryIcon]")
        const desc=document.querySelector("[data-weatherDesc]")
        const weatherIcon=document.querySelector(["[data-weatherIcon]"])
        const temp=document.querySelector("[data-temp]")
        const windspeed=document.querySelector("[data-windSpeed]")
        const humidity=document.querySelector("[data-Humidity]")
        const cloudiness=document.querySelector("[data-cloudiness]")
       
       
         cityName.innerText=data?.name;
         countryIcon.src=` https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`
         desc.innerText=data?.weather?.[0]?.description;
         weatherIcon.src=`https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
       temp.innerText=`${data?.main?.temp} °C`;
       windspeed.innerText=`${data?.wind?.speed}`;
       humidity.innerText=`${data?.main?.humidity}`;
cloudiness.innerText=`${data?.clouds?.all}`;

       
       
       
        }
    



      async function fetchUserWeatherInfo(coordinates){
     const {lat,lon}=coordinates;
                const API_KEY="35268934e5febd56adab2daf9705a2bc"
                grant.classList.remove("active")
                loadingScreen.classList.add("active")

                try{
                 const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
                 const data=await response.json()
                
                 loadingScreen.classList.remove("active")
                 userInfoContainer.classList.add("active")
                 renderWeatherInfo(data);
            
             }
       catch(e){
        loadingScreen.classList.remove("active")
       }
    }

   

    


        function showPosition(position){
            const userCoordinates={
         lat:position.coords.latitude,
         lon:position.coords.longitude
        }
sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates))
        fetchUserWeatherInfo(userCoordinates)
    }


    async function fetchSearchWeatherInfo(city){
 loadingScreen.classList.add("active");
   userInfoContainer.classList.remove("active");
   grant.classList.remove("active");
try{ 
  
 
           const API_KEY="35268934e5febd56adab2daf9705a2bc"
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data=await response.json()
    loadingScreen.classList.remove("active")
    userInfoContainer.classList.add("active")
    renderWeatherInfo(data);
}
catch{

}
    }


   usertab.addEventListener("click",()=>{
    switchTab(usertab)  ;        
}
   )
   searchtab.addEventListener("click",()=>{
    switchTab(searchtab)  ;        
   })
   grantAccess.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    

   })
   const searchInput=document.querySelector("[data-searchInput]")
   searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
     let cityName =searchInput.value;
     
   //   if(cityName === ""){
   //      return;
   //   }
   //   else{
        fetchSearchWeatherInfo(cityName);
   //   }  
   })

   