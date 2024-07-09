export class Back {
    constructor(
        public id: number,
        public userid: number,
        public deadlift?: number,
        public reps_deadlift?: number,
        public bentOverRow?: number,
        public reps_bentOverRow?: number,
        public pullUps?: number,
        public reps_pullUps?: number,
        public latPulldown?: number,
        public reps_latPulldown?: number,
        public dumbbellRow?: number,
        public reps_dumbbellRow?: number,
    ) { }
}