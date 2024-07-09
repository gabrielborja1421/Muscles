export class Leg {
    constructor(
        public id: number,
        public userid: number,
        public legPress?: number, //1 
        public reps_legPress?: number,
        public legCurl?: number, //2
        public reps_legCurl?: number,
        public legExtension?: number, //3
        public reps_legExtension?: number,
        public Squat?: number, //4
        public reps_Squat?: number,
    ) { }
}