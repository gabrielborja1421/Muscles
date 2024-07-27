export class Chest {
    constructor(
        public id: number,
        public userid: number,
        public barbellBenchPress?: number,
        public reps_barbellBenchPress?: number, 
        public dumbellBenchPress?: number,
        public reps_dumbellBenchPress?: number,
        public inclineBenchPress?: number,
        public reps_inclineBenchPress?: number,
        public machineChestPress?: number,
        public reps_machineChestPress?: number,
        public declinePress?: number,
        public reps_declinePress?: number,
    ) { }
}