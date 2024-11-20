import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import { Badge, Calendar, HStack, List } from 'rsuite';
import { useFetchedContext } from '../../../context/FetchedContext';
import SpinnerMini from '../../../components/SpinnerMini';
import { useNavigate } from 'react-router-dom';


function UpcomingCalender() {
    const navigate = useNavigate()
    const { events, loader } = useFetchedContext()


    // SELECT AN UPCOMING
    const handleSelect = function(date) {
        const eventDate = moment(date).format('YYYY-MM-DD');
        const currentEvent = events?.find(el => el?.start_date == eventDate);
        if(!currentEvent) return;
        navigate(`/dashboard/events/manage/${currentEvent?.id}`)
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

        comingEventDays?.forEach((evtDay, index) => {
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

    return (
        <div className="dashboard--card" style={{ position: "relative" }}>
            {loader && <SpinnerMini />}
            
            {!loader && (
                <HStack spacing={0} alignItems="flex-start" wrap>
                    <Calendar onSelect={handleSelect} bordered compact renderCell={renderCell} style={{ width: "auto", height: "auto" }} />
                </HStack>
            )}
        </div>
    );

}

export default UpcomingCalender