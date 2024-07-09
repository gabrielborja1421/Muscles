export class Arm {
    constructor(
        public id: number,
        public userid: number,
        //biceps
        public bicepCurl: number,
        public reps_bicepCurl: number,
        public hammerCurl: number,
        public reps_hammerCurl: number,
        public barbellCurl: number,
        public reps_barbellCurl: number,
        //triceps
        public skullcrusher: number,
        public reps_skullcrusher: number,
        public dumbbellOverheadTricepsExtension: number,
        public reps_dumbbellOverheadTricepsExtension: number,
        public tricepsPushdown: number,
        public reps_tricepsPushdown: number,
        public pushPress: number,
        public reps_pushPress: number,
        public closeGripBenchPress: number,
        public reps_closeGripBenchPress: number,  
        //hombro
        public militaryPress: number,
        public reps_militaryPress: number,
        public lateralRaise: number,
        public reps_lateralRaise: number,
        public frontRaise: number,
        public reps_frontRaise: number,
        public reverseFly: number,
        public reps_reverse: number,
        public shoulderPress: number,
        public reps_shoulderPress: number,
    ) { }
}