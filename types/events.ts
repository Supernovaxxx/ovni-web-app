export interface Event {
    id: number,
    title: string,
    subtitle: string,
    start_date: Date,
    end_date: Date
}

export interface EventsList {
    count: number,
    next: number,
    previous: number,
    results: Event[]
}
