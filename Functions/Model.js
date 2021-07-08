
var Models = {
    PLAYER: {
        basename: '',
        team: {
            BLUE: '',
            RED: '',
        },
        type: {
            NAUTILUS: 'nautilus',
        },
    },
    MINION: {
        basename: '_Minion_',
        team: {
            BLUE: 'Blue',
            RED: 'Red',
        },
        type: {
            MALEE: 'Basic',
            CASTER: 'Wizard',
            CANNON: 'MechCannon',
            SUPER: 'MechMalee',
        },
    },
    MONSTER: {
        basename: '',
        team: {
            NEUTRAL: '',
        },
        type: {
            Golem: 'Golem',
            wolf: 'wolf',
            AncientGolem: 'AncientGolem',
            Caster: 'Caster',
            GiantWolf: 'GiantWolf',
            LizardElder: 'LizardElder',
            YoungLizard: 'YoungLizard',
            Wraith: 'Wraith',
            Worm: 'Worm',
            SmallGolem: 'SmallGolem',
            GreatWraith: 'GreatWraith',
        },
    }
};

module.exports = (unitType, team, type) => {
    return (Models[unitType]?.team?.[team] || '') + (Models[unitType]?.basename || '') + (Models[unitType]?.type?.[type] || '');
};
