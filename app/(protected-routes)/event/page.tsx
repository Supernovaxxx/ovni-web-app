'use client'
import { getEventsList } from '@/lib/sdk/get-events-list'
import { Event } from '@/types/events'
import React from 'react'

export default function Page() {
    const { data } = getEventsList()
    const events: Event[] | undefined = data?.results

    function formatDate (date: Date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    if (events)
        return (
            <div className='p-8'>
                <h1 className='text-lg'>Events:</h1>
                {events.map((event, index: number) => {
                    return (
                        <div key={index}>
                            <p className='font-semibold'>Event: {event.title}</p>
                            <p>Dates: {formatDate(new Date(event.start_date))} - {formatDate(new Date(event.end_date))}</p>
                        </div>
                    )
                })}
            </div>
        )
}
