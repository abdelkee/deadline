export type ItemType = {
    name: string
    type: 'Paper' | 'Fee' | 'Event' | 'Medicine' | 'Appointment' | 'Work' | 'Home' | 'Family'
    startDate: string | null
    endDate: string
    isDone: boolean
    phrase: string
    message: string
}