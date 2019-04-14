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


        let deadLine = '2019-04-15';

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
                    if(hours.textContent.length < 2) hours.textContent = "0" + hours.textContent;
                    if(minutes.textContent.length < 2) minutes.textContent = "0" + minutes.textContent;
                    if(seconds.textContent.length < 2) seconds.textContent = "0" + seconds.textContent;

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
});
