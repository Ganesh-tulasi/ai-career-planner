export interface CareerProfile {
    degree: string;
    skills: string[];
    target_role: string;
    daily_hours: number;
}

export interface StudyTask {
    description: string;
    duration_hours: number;
    resource_link?: string;
}

export interface WeeklyPlan {
    week_number: number;
    focus_area: string;
    tasks: string[];
}

export interface CareerRoadmap {
    summary: string;
    skill_gaps: string[];
    study_plan: WeeklyPlan[];
    learning_resources: string[];
    next_steps: string[];
}
