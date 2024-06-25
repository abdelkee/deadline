export type ItemType = {
    name: string
    type: 'Paper' | 'Fee' | 'Event' | 'Medicine' | 'Appointment'
    startDate: string | null
    endDate: string
}