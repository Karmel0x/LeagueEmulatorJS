const NavigationGrid = require('../Constants/NavigationGrid');
// need to verify NavigationGrid.MiddleOfMap

module.exports = {
    from: (waypoints) => {
        var obj = [];

        for(let waypoint of waypoints){
            obj.push({
                X: (2 * waypoint.X + NavigationGrid.MiddleOfMap.X).toFixed(5),
                Y: (2 * waypoint.Y + NavigationGrid.MiddleOfMap.Y).toFixed(5),
            });
        }
        return obj;
    },
    to: (waypoints) => {
        var obj = [];

        for(let waypoint of waypoints){
            obj.push({
                X: (waypoint.X - NavigationGrid.MiddleOfMap.X) / 2,
                Y: (waypoint.Y - NavigationGrid.MiddleOfMap.Y) / 2,
            });
        }
        return obj;
    },
};
