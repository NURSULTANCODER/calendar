/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { data } from './contribushions'
import { classNames } from './classNames'

function App() {
  const [dates, setDates] = useState<string[]>([])
  const [orderedDaysOfWeek, setOrderedDaysOfWeek] = useState<number[]>([])
  const [orderedMonths, setOrderedMonths] = useState<string[]>([])


  const createDays = () => {
    function formatDates(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    const daysArray = [];
    
    const currentDate = new Date();
    
    for (let i = 0; i < 51 * 7; i++) {
      daysArray.push(formatDates(currentDate));
      currentDate.setDate(currentDate.getDate() - 1);
    }    

    return daysArray.reverse()
  }

  const createOrderDaysOfWeek = () => {
    const currentDayIndex = new Date().getDay();
    
    const daysOfWeek = Array.from({ length: 7 }, (_, index) => (index + 1 + currentDayIndex) % 7);

    const orderedDaysOfWeek = [
      ...daysOfWeek.slice(1 + currentDayIndex),
      ...daysOfWeek.slice(0, 1 + currentDayIndex)
    ];
    

    return orderedDaysOfWeek
  }

  const createOrderMonths = () => {
    const months = [
      'Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь',
      'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'
    ];
    
    
    
    const currentMonth = new Date().getMonth();

    let orderedMonths 
    
    if (new Date().getDate() < 15) {
      orderedMonths = [
        ...months.slice(currentMonth),
        ...months.slice(0, currentMonth)
      ];
    }else {
      orderedMonths = [
        ...months.slice(1 + currentMonth),
        ...months.slice(0, 1 + currentMonth)
      ];
    }
    
    return orderedMonths
  }

  useEffect(() => {
    setDates(createDays())

    setOrderedDaysOfWeek(createOrderDaysOfWeek())

    setOrderedMonths(createOrderMonths())
  }, [])

  function formatDate(inputDate: string) {
    interface optionsInterface {
      weekday: string, 
      month: string, 
      day: string,
      year: string
    }
    const options: optionsInterface = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    // @ts-expect-error 
    const formattedDate = new Date(inputDate).toLocaleDateString('ru-RU', options);
    return formattedDate;
  }

  return (
    <div className='calendar'>
      <div className='calendar'>
        
        <div className='calendar-wrap'>
          <div className='calendar-months'>
            {
              orderedMonths.map(item => (
                <span key={item}>{item}</span>
              ))
            }
          </div>
          {
            orderedDaysOfWeek.map(weekDayIndex => (
              <div className='calendar-content' key={weekDayIndex}>
                <div className='calendar-week__names'>
                  {weekDayIndex === 1 ? <div className='calendar-week__name'>Пн</div> : <></> }
                  {weekDayIndex === 3 ? <div className='calendar-week__name'>Ср</div> : <></> }
                  {weekDayIndex === 5 ? <div className='calendar-week__name'>Пт</div> : <></> }
                </div>
                <div className='calendar-row'>
                  {
                    dates && dates.filter(item => new Date(item).getDay() === weekDayIndex).map((item, i) => (
                      Object.keys(data).includes(item) ?
                      (<div className={classNames('day', {
                        'var-2': data[item] >= 1 && data[item] <= 9,
                        'var-3': data[item] >= 10 && data[item] <= 19,
                        'var-4': data[item] >= 20 && data[item] <= 29,
                        'var-5': data[item] >= 30,
                      }, [])} key={i}>
                        <div className='hover'>
                          <p>{data[item]} contributions</p>
                          <span>{formatDate(item)}</span>
                        </div>
                      </div>) : (
                        <div className={classNames('day', {}, ['var-1'])} key={i}>
                          <div className='hover'>
                            <p>No contributions</p>
                            <span>{formatDate(item)}</span>
                          </div>
                        </div>
                      )
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="calendar-options">
        <span>меньше</span>
        <div className="day var-1">
          <div className='hover'>
            <p>No contributions</p>
          </div>
        </div>
        <div className="day var-2">
          <div className='hover'>
            <p> 1-9 contributions</p>
          </div>
        </div>
        <div className="day var-3">
          <div className='hover'>
            <p>10-19 contributions</p>

          </div>
        </div>
        <div className="day var-4">
          <div className='hover'>
            <p>20-29 contributions</p>
          </div>
        </div>
        <div className="day var-5">
          <div className='hover'>
            <p>30+ contributions</p>
          </div>
        </div>
        <span>больше</span>
      </div>
    </div>
  )
}

export default App
