interface TimeEntry {
    id: number
    spent_date: string
    user: NameAndId
    user_assignment: any
    client: NameAndId
    project: NameAndId
    task: NameAndId
    task_assignment: any
    invoice: { id: number; number: string }
    hours: number
    hours_without_timer: number
    rounded_hours: number
    notes: string
    is_locked: boolean
    locked_reason: string
    is_closed: boolean
    is_billed: boolean
    timer_started_at: string
    started_time: string
    ended_time: string
    is_running: boolean
    billable: boolean
    budgeted: boolean
    billable_rate: number
    cost_rate: number
    created_at: string
    updated_at: string
}

interface NameAndId {
    id: number
    name: string
}
