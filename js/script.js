window.addEventListener("DOMContentLoaded", function(){
    "use strict";


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector(".info-header"),
        infoContent = document.querySelectorAll(".info-tabcontent");

        function hideTabContent (a) {
            for(let i = a; i < infoContent.length; i++){

                infoContent[i].classList.remove('show');
                infoContent[i].classList.add('hide');

            }
        }

        hideTabContent(1);

        function showTabContent (a) {
            if(infoContent[a].classList.contains("hide")){
                infoContent[a].classList.add('show');
                infoContent[a].classList.remove('hide');
            }
        }

        info.addEventListener('click', function(event){
            let target = event.target; 
            if( target && target.classList.contains('info-header-tab') ){

                for(let i = 0; i < tab.length; i++){
                    if( target == tab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }  
                }
            }
        });

        let deadLine = '2019-05-15';

        function getTimeRemaining(){
            let t = Date.parse(deadLine) - Date.parse( new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/1000/3600);
            
            return {
                "total": t,
                "seconds": seconds,
                "minutes": minutes,
                "hours": hours
            }
        }

        function setClock(id, endTime){
            let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(upDateClock, 1000);

            

            function upDateClock(){
                let t = getTimeRemaining(endTime);
                    hours.textContent = t.hours;
                    minutes.textContent = t.minutes;
                    seconds.textContent = t.seconds;
                    if(hours.textContent.length < 2) hours.textContent = `0${hours.textContent}`;   
                    if(minutes.textContent.length < 2) minutes.textContent = `0${minutes.textContent}`;
                    if(seconds.textContent.length < 2) seconds.textContent = `0${seconds.textContent}`;

                    if(t.total <= 0){
                        clearInterval(timeInterval);
                        hours.textContent = "00";
                        minutes.textContent = "00";
                        seconds.textContent = "00";
                    }

            }
        }

    setClock('timer', deadLine);

    //Modal
        //For learn more
        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            popup = document.querySelector('.popup-close');

            more.addEventListener('click', function(){
                overlay.style.display = "block";
                this.classList.add("more-splash");
                document.body.style.overflow = "hidden";
            });

            popup.addEventListener('click', function(){ //button off modal window
                overlay.style.display = "none";
                more.classList.remove("more-splash");
                document.body.style.overflow = "";
            });
        //For learn detail
        let btn = document.querySelector('.description-btn');

        btn.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        })


    // Form
        let message = {
            loading: "Загрузка",
            success: "Спасибо! Скоро мы с вами свяжемся!",
            failure: "Что-то пошло не так..."
        };

        let form = document.querySelector('.main-form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

            statusMessage.classList.add('status');

        form.addEventListener('submit', function(event){
            event.preventDefault();
            form.appendChild(statusMessage);

            

                let formData = new FormData(form),
                obj = {};
                formData.forEach(function(value, key){
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);
                

            function postData(data) {
                return new Promise(function(resolve, reject) {

                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


                        request.addEventListener("readystatechange", function(){
                                (request.readyState < 4) ? resolve():  
                                (request.readyState === 4 && request.status == 200) ? resolve():
                                reject();
                            });
                            request.send(data);
                        });
                        
                }; //end Data

                function clearInput(){
                    for( let i = 0; i < input.length; i++){
                        input[i].value = '';
                        }
                    } 


                postData(formData)
                    .then(()=> statusMessage.innerHTML = message.loading)
                    .then(()=> statusMessage.innerHTML = message.success)
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInput)
         });


         //Slider
            let slideIndex = 1,
                slides = document.querySelectorAll(".slider-item"),
                prev = document.querySelector(".prev"),
                next = document.querySelector(".next"),
                dotsWrap = document.querySelector(".slider-dots"),
                dots = document.querySelectorAll(".dot");

                showSlides(slideIndex);

                function showSlides(n){
                if(n> slides.length){
                     slideIndex = 1; 
                    }
                if(n < 1){
                     slideIndex = slides.length;
                     }

                    slides.forEach((item) => item.style.display = "none");

                    dots.forEach((item)=> item.classList.remove("dot-active"));

                    slides[slideIndex - 1].style.display = "block";
                    dots[slideIndex - 1].classList.add("dot-active");
                }

                function plusSlides(n){
                    showSlides(slideIndex += n);
                }

                function currentSlides(n){
                    showSlides(slideIndex = n);
                }

                prev.addEventListener('click', function(){
                    plusSlides(-1);
                });

                next.addEventListener('click', function(){
                    plusSlides(1);
                });

                dotsWrap.addEventListener("click", function(event){
                    for(let i = 0; i < dots.length + 1; i++){
                        if(event.target.classList.contains("dot") &&  event.target == dots[i - 1]){
                           currentSlides(i); 
                        }
                    }
                });



                //Calc
                    let persons = document.querySelectorAll(".counter-block-input")[0],
                        restDays = document.querySelectorAll(".counter-block-input")[1],
                        place = document.getElementById("select"),
                        totalValue = document.getElementById("total"),
                        personSum = 0,
                        daysSum = 0,
                        total = 0;

                        totalValue.innerHTML = total;

                        persons.addEventListener('change', function(){
                            personSum = +this.value;
                            total = (personSum + daysSum) * 4000;

                            if (restDays.value == "" || persons.value == ""){
                                totalValue.innerHTML = 0;
                            } else {
                                totalValue.innerHTML = total;
                            }
                            
                        });

                        restDays.addEventListener('change', function(){
                            daysSum = +this.value;
                            total = (personSum + daysSum) * 4000;
                            
                            if (restDays.value == "" || persons.value == ""){
                                totalValue.innerHTML = 0;
                            } else {
                                totalValue.innerHTML = total;
                            }
                        });

                        place.addEventListener("change", function() {
                            if(restDays.value == "" || persons.value == ""){
                                totalValue.innerHTML = 0;
                            } else {
                                let a = total;
                                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                            }
                        });

                
                        
});