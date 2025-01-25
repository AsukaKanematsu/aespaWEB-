class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        
        this.events = {
            // イベントデータ
            "2024-01-20": "Drama Comeback Stage",
            "2024-01-25": "Music Bank Performance",
            "2024-02-14": "Valentine's Day Fan Meeting"
        };

        this.init();
    }

    init() {
        this.updateCalendar();
        this.addEventListeners();
    }

    updateCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        document.getElementById('currentMonth').textContent = 
            `${firstDay.toLocaleString('default', { month: 'long' })} ${this.currentYear}`;

        const calendarDays = document.getElementById('calendar-days');
        calendarDays.innerHTML = '';

        // 前月の日付を追加
        for (let i = 0; i < startingDay; i++) {
            calendarDays.appendChild(this.createDayElement(''));
        }

        // 当月の日付を追加
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = this.createDayElement(i);
            const dateString = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            if (this.events[dateString]) {
                dayElement.classList.add('has-event');
                dayElement.title = this.events[dateString];
            }

            calendarDays.appendChild(dayElement);
        }
    }

    createDayElement(day) {
        const div = document.createElement('div');
        div.textContent = day;
        return div;
    }

    addEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.updateCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.updateCalendar();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});