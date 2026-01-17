export interface Profile {
    user_id: string;
    username: string;
    habit_id: string;
    title: string | null;
    xp_reward: number | null;
    total_xp: number;
    lvl: number;
    next_level: number;
    next_level_required_xp: number;
}
