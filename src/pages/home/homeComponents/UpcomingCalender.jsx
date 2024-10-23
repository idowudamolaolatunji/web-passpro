import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import { Badge, Calendar, HStack, List } from 'rsuite';

const upcomingEvents = [
    { name: "This fellowsip", eventDate: "2024-10-17T02:00:00.000+00:00", location: "Lagos Nigeria" },
    { name: "This fellowsip2", eventDate: "2024-10-27T03:00:00.000+00:00", location: "Lagos Nigeria" },
    { name: "This fellowsip4", eventDate: "2024-12-27T04:00:00.000+00:00", location: "Lagos Nigeria" },
    { name: "This fellowsip3", eventDate: "2024-10-23T05:00:00.000+00:00", location: "Lagos Nigeria" },
];



function UpcomingCalender() {
    const { width } = useWindowSize()
    const [selectedDate, setSelectedDate] = useState(null);
    const [avail, setAvail] = useState(false);

    console.log(avail)

    // SELECT AN UPCOMING
    const handleSelect = function(date) {
        setSelectedDate(date);
    };


    // THE FUNCTION THAT FINDS THE UPCOMING EVENTS FOR THE DATA FROM THE BACKEND
    const getUpcomingList = function (date) {
        if (!date) {
            return [];
        }

        const comingEventTime = upcomingEvents.map((upcoming) => {
            const date = new Date(upcoming?.eventDate);
            const time = moment(date).format('h:mm a');
            return time;
        });

        const comingEventDays = upcomingEvents.map((upcoming) => new Date(upcoming?.eventDate).getDate());
        const comingEventMonths = upcomingEvents.map((upcoming) => new Date(upcoming?.eventDate).getMonth() + 1);


        const day = new Date(date).getDate();
        const month = new Date(date).getMonth() + 1;

        let upcoming = [];

        comingEventDays.forEach((evtDay, index) => {
            if (day === evtDay && month === comingEventMonths[index]) {
                return upcoming = [{
                    name: upcomingEvents[index]?.name,
                    time: comingEventTime[index],
                    location: upcomingEvents[index]?.location,
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
        <div className="dashboard--card">
            <HStack spacing={0} style={ (width < 1030 && width > 550 && avail) ? { gridTemplateColumns: "2fr 1fr" } : (width < 1030 && width > 550 && !avail) && { gridTemplateColumns: "1fr"}} alignItems="flex-start" wrap>
                <Calendar onSelect={handleSelect} bordered compact renderCell={renderCell} style={{ width: "auto", height: "auto" }} />
                <UpcomingList date={selectedDate} />
            </HStack>
        </div>
    );

}

export default UpcomingCalender