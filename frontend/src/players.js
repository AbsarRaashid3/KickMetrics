const players = [
    {
        _id: '1',
        name: 'L. Messi',
        image: '/images/L. Messi.jpg',
        full_name: 'Lionel Andrés Messi Cuccittini',
        birth_date: '6/24/1987',
        age: 31,
        height_cm: 170.18,
        weight_kgs: 72.1,
        positions: 'CF,RW,ST',
        nationality: 'Argentina',
        overall_rating: 94,
        potential: 94,
        long_shots: 94,
        crossing: 86,
        finishing: 95,
        heading_accuracy: 70,
        short_passing: 92,
        volleys: 86,
        dribbling: 97,
        curve: 93,
        freekick_accuracy: 94,
        long_passing: 89,
        ball_control: 96,
        acceleration: 91,
        sprint_speed: 86,
        agility: 93,
        reactions: 95,
        balance: 95,
        shot_power: 85,
        jumping: 68,
        stamina: 72,
        strength: 66,
        aggression: 48,
        interceptions: 22,
        positioning: 94,
        vision: 94,
        penalties: 75,
        composure: 96,
        marking: 33,
        standing_tackle: 28,
        sliding_tackle: 26,
    },
    {
        _id: '2',
        name: 'C. Eriksen',
        image: '/images/C. Eriksen.jpg',
        full_name: 'Christian  Dannemann Eriksen',
        birth_date: '2/14/1992',
        age: 27,
        height_cm: 154.94,
        weight_kgs: 76.2,
        positions: 'CAM,RM,CM',
        nationality: 'Denmark',
        overall_rating: 88,
        potential: 89,
        long_shots: 89,
        crossing: 88,
        finishing: 81,
        heading_accuracy: 52,
        short_passing: 91,
        volleys: 80,
        dribbling: 84,
        curve: 86,
        freekick_accuracy: 87,
        long_passing: 89,
        ball_control: 91,
        acceleration: 76,
        sprint_speed: 73,
        agility: 80,
        reactions: 88,
        balance: 81,
        shot_power: 84,
        jumping: 50,
        stamina: 92,
        strength: 58,
        aggression: 46,
        interceptions: 56,
        positioning: 84,
        vision: 91,
        penalties: 67,
        composure: 88,
        marking: 59,
        standing_tackle: 57,
        sliding_tackle: 22,
    },
    {
        _id: '3',
        name: 'P. Pogba',
        image: '/images/P. Pogba.jpg',           
        full_name: 'Paul Pogba',
        birth_date: '3/15/1993',
        age: 25,
        height_cm: 190.5,
        weight_kgs: 83.9,
        positions: 'CM,CAM',
        nationality: 'France',
        overall_rating: 88,
        potential: 91,
        long_shots: 82,
        crossing: 80,
        finishing: 75,
        heading_accuracy: 75,
        short_passing: 86,
        volleys: 85,
        dribbling: 87,
        curve: 85,
        freekick_accuracy: 82,
        long_passing: 90,
        ball_control: 90,
        acceleration: 71,
        sprint_speed: 79,
        agility: 76,
        reactions: 82,
        balance: 66,
        shot_power: 90,
        jumping: 83,
        stamina: 88,
        strength: 87,
        aggression: 78,
        interceptions: 64,
        positioning: 82,
        vision: 88,
        penalties: 82,
        composure: 87,
        marking: 63,
        standing_tackle: 67,
        sliding_tackle: 67,
    },
    {
        _id: '4',
        name: 'L. Insigne',
        image: '/images/L. Insigne.jpg',
        full_name: 'Lorenzo Insigne',
        birth_date: '6/4/1991',
        age: 27,
        height_cm: 162.56,
        weight_kgs: 59.0,
        positions: 'LW,ST',
        nationality: 'Italy',
        overall_rating: 88,
        potential: 88,
        long_shots: 84,
        crossing: 86,
        finishing: 77,
        heading_accuracy: 56,
        short_passing: 85,
        volleys: 74,
        dribbling: 90,
        curve: 87,
        freekick_accuracy: 77,
        long_passing: 78,
        ball_control: 93,
        acceleration: 94,
        sprint_speed: 86,
        agility: 94,
        reactions: 83,
        balance: 93,
        shot_power: 75,
        jumping: 53,
        stamina: 75,
        strength: 44,
        aggression: 34,
        interceptions: 26,
        positioning: 83,
        vision: 87,
        penalties: 61,
        composure: 83,
        marking: 51,
        standing_tackle: 24,
        sliding_tackle: 22,
    },
    {
        _id: '5',
        name: 'K. Koulibaly',
        image: '/images/K. Koulibaly.jpg',
        full_name: 'Kalidou Koulibaly',
        birth_date: '6/20/1991',
        age: 27,
        height_cm: 187.96,
        weight_kgs: 88.9,
        positions: 'CB',
        nationality: 'Senegal',
        overall_rating: 88,
        potential: 91,
        long_shots: 15,
        crossing: 30,
        finishing: 22,
        heading_accuracy: 83,
        short_passing: 68,
        volleys: 14,
        dribbling: 69,
        curve: 28,
        freekick_accuracy: 28,
        long_passing: 60,
        ball_control: 63,
        acceleration: 70,
        sprint_speed: 75,
        agility: 50,
        reactions: 82,
        balance: 40,
        shot_power: 55,
        jumping: 81,
        stamina: 75,
        strength: 94,
        aggression: 87,
        interceptions: 88,
        positioning: 24,
        vision: 49,
        penalties: 33,
        composure: 80,
        marking: 91,
        standing_tackle: 88,
        sliding_tackle: 87,
    },
    {
        _id: '6',
        name: 'V. van Dijk',
        image: '/images/V. van Dijk.jpg',
        full_name: 'Virgil van Dijk',
        birth_date: '7/8/1991',
        age: 27,
        height_cm: 193.04,
        weight_kgs: 92.1,
        positions: 'CB',
        nationality: 'Netherlands',
        overall_rating: 88,
        potential: 90,
        long_shots: 64,
        crossing: 53,
        finishing: 52,
        heading_accuracy: 83,
        short_passing: 79,
        volleys: 45,
        dribbling: 70,
        curve: 60,
        freekick_accuracy: 70,
        long_passing: 81,
        ball_control: 76,
        acceleration: 74,
        sprint_speed: 77,
        agility: 61,
        reactions: 87,
        balance: 49,
        shot_power: 81,
        jumping: 88,
        stamina: 75,
        strength: 92,
        aggression: 82,
        interceptions: 88,
        positioning: 41,
        vision: 60,
        penalties: 62,
        composure: 87,
        marking: 90,
        standing_tackle: 89,
        sliding_tackle: 84,
    },
    {
        _id: '7',
        name: 'K. Mbappé',
        image: '/images/K. Mbappé.jpg',
        full_name: 'Kylian Mbappé',
        birth_date: '12/20/1998',
        age: 20,
        height_cm: 152.4,
        weight_kgs: 73.0,
        positions: 'RW,ST,RM',
        nationality: 'France',
        overall_rating: 88,
        potential: 95,
        long_shots: 78,
        crossing: 77,
        finishing: 88,
        heading_accuracy: 77,
        short_passing: 82,
        volleys: 78,
        dribbling: 90,
        curve: 77,
        freekick_accuracy: 63,
        long_passing: 73,
        ball_control: 91,
        acceleration: 96,
        sprint_speed: 96,
        agility: 92,
        reactions: 87,
        balance: 83,
        shot_power: 79,
        jumping: 75,
        stamina: 83,
        strength: 71,
        aggression: 62,
        interceptions: 38,
        positioning: 88,
        vision: 82,
        penalties: 70,
        composure: 86,
        marking: 34,
        standing_tackle: 34,
        sliding_tackle: 32,
    },
    {
        _id: '8',
        name: 'M. Neuer',
        image: '/images/M. Neuer.jpg',
        full_name: 'Manuel Neuer',
        birth_date: '3/27/1986',
        age: 32,
        height_cm: 193.04,
        weight_kgs: 92.1,
        positions: 'GK',
        nationality: 'Germany',
        overall_rating: 89,
        potential: 89,
        long_shots: 16,
        crossing: 15,
        finishing: 13,
        heading_accuracy: 25,
        short_passing: 55,
        volleys: 11,
        dribbling: 30,
        curve: 14,
        freekick_accuracy: 11,
        long_passing: 59,
        ball_control: 46,
        acceleration: 54,
        sprint_speed: 60,
        agility: 51,
        reactions: 84,
        balance: 35,
        shot_power: 25,
        jumping: 77,
        stamina: 43,
        strength: 80,
        aggression: 29,
        interceptions: 30,
        positioning: 12,
        vision: 70,
        penalties: 47,
        composure: 70,
        marking: 17,
        standing_tackle: 10,
        sliding_tackle: 11,
    },
    
   
];

export default players;
