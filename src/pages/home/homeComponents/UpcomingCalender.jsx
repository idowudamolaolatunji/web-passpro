import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import { Badge, Calendar, HStack, List } from 'rsuite';
import { useFetchedContext } from '../../../context/FetchedContext';
import SpinnerMini from '../../../components/SpinnerMini';


function UpcomingCalender() {
    const { events, loader, error, handleFetchEvents } = useFetchedContext()
    const { width } = useWindowSize()
    const [selectedDate, setSelectedDate] = useState(null);
    const [avail, setAvail] = useState(false);


    // SELECT AN UPCOMING
    const handleSelect = function(date) {
        setSelectedDate(date);
    };


    // THE FUNCTION THAT FINDS THE UPCOMING EVENTS FOR THE DATA FROM THE BACKEND
    const getUpcomingList = function (date) {
        if (!date) {
            return [];
        }

        const comingEventTime = events?.map((upcoming) => {
            const date = new Date(upcoming?.start_date);
            const time = moment(date).format('h:mm a');
            return time;
        });

        const comingEventDays = events?.map((upcoming) => new Date(upcoming?.start_date).getDate());
        const comingEventMonths = events?.map((upcoming) => new Date(upcoming?.start_date).getMonth() + 1);


        const day = new Date(date).getDate();
        const month = new Date(date).getMonth() + 1;

        let upcoming = [];

        comingEventDays.forEach((evtDay, index) => {
            if (day === evtDay && month === comingEventMonths[index]) {
                return upcoming = [{
                    name: events[index]?.event_name,
                    time: comingEventTime[index],
                    location: events[index]?.event_location,
                },];
            }
        });

        return upcoming;
    }


    // THE FUNCTION THAT GET AND PLACE A BADGE ON THE UPCOMING EVENTS
    const renderCell = function (date) {
        const list = getUpcomingList(date);

        if (list.length) {
            return <Badge className="calendar-todo-item-badge" />;
        }

        return null;
    }

    // UPCOMING LIST COMPONENT
    const UpcomingList = function({ date }) {
        const list = getUpcomingList(date);

        useEffect(() => {
            console.log(date, list, selectedDate)
            if(!list.length) {
                setAvail(false)
            } else {
                setAvail(true)
            }
        }, [date]);


        if (!list.length) {
            return null;
        }

        return (
            <List style={{ flex: 1 }} bordered>
                {list.map(item => (
                    <List.Item key={item?.time}>
                        <div>
                            <span>Name:</span> 
                            <p>{item?.name}</p>
                        </div>
                        <div>
                            <span>Time:</span> 
                            <p>{item?.time}</p>
                        </div>
                        <div>
                            <span>Location:</span> 
                            <p>{item?.location}</p>
                        </div>
                    </List.Item>
                ))}
            </List>
        );
    };

    return (
        <div className="dashboard--card" style={{ position: "relative" }}>
            {loader && <SpinnerMini />}
            
            {!loader && (
                <HStack spacing={0} style={ (width < 1030 && width > 550 && avail) ? { gridTemplateColumns: "2fr 1fr" } : (width < 1030 && width > 550 && !avail) && { gridTemplateColumns: "1fr"}} alignItems="flex-start" wrap>
                    <Calendar onSelect={handleSelect} bordered compact renderCell={renderCell} style={{ width: "auto", height: "auto" }} />
                    <UpcomingList date={selectedDate} />
                </HStack>
            )}
        </div>
    );

}

export default UpcomingCalender