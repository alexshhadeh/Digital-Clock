class Clock {
    constructor() {
        this.today = new Date();
    }
    setTime(time) {
        this.today = time ? time : new Date()
    }
    getTime() {
        return this.today;
    }
    update() {
        //Set time so that the time added by user isn't being added every time the interval resets
        this.setTime()

        //Check if user added time before, if not set to 0
        if (isNaN(parseInt(window.sessionStorage.getItem('miliseconds'))))
            window.sessionStorage.setItem('miliseconds', 0);
    
        //Add time set by user
        this.today = new Date(this.today.getTime() + parseInt(window.sessionStorage.getItem('miliseconds')));
    
        //Extract time from date
        let hour = this.today.getHours()
        let minutes = this.today.getMinutes()
        let seconds = this.today.getSeconds()
    
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = weekday[this.today.getDay()];
    
        let date = this.today.getDate();
    
        const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month =  monthArr[this.today.getMonth()];
    
        //Add 0 if time is < 10 (single digit)
        hour = (hour < 10) ? '0' + hour : hour;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        
        //Check if user wants the 12-hour clock and convert
        if(document.getElementById("clockType").checked) {
            hour = (hour > 12) ? hour - 12 : hour;
            hour = (hour == 0) ? 12 : hour;
        }
        
    
        //Insert time using dom
        document.getElementById('hours').innerHTML = hour + ' :&nbsp';
        document.getElementById('minutes').innerHTML = minutes + ' :&nbsp';
        document.getElementById('seconds').innerHTML = seconds +'&nbsp';
        document.getElementById('timeOfDay').innerHTML = document.getElementById("clockType").checked ? (hour > 12) ? "AM" : "PM" : "";
        document.getElementById('day').innerHTML = day + ',&nbsp';
        document.getElementById('month').innerHTML =  month + '&nbsp';
        document.getElementById('date').innerHTML = date;
        
    
    }
    //Saving time to sessionStorage if user clicks a button
    addHour() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+3600000);
    }
    addMinute() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+60000);
    }
    addSecond() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+1000);
    } 
    substractHour() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-3600000);
    }
    substractMinute() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-60000);
    }
    substractSecond() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-1000);
    } 
}

const clock = new Clock();

setInterval(() => {
    clock.update();
}, 1000); 