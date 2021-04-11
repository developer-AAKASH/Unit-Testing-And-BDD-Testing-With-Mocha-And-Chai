const expect = require("chai").expect;

describe("checkForShip", ()=>{
    let checkForShip = require("../game_logic/ship_methods").checkForShip;

    it("should correctly report no ship at a given players coordinate.", ()=>{
        player = {
            ships: [
                {
                    locations: [[0, 0]]
                }
            ]
        };
        
        expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
    });

    it("should correctly report a ship located at the given coordinate.", ()=>{
        player = {
            ships: [
                {
                    locations: [[0, 0]]
                }
            ]
        };
        
        expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal(player.ships[0]);
    });

    it("should handle ships located at more than one coordinate.", ()=>{
        player = {
            ships: [
                {
                    locations: [[0, 0], [0, 1]]
                }
            ]
        };

        expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal(player.ships[0]);
        expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal(player.ships[0]);
        expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
    });

    it("should handle checking multiple ships.", ()=>{
        player = {
            ships: [
                {
                    locations: [[0, 0], [0, 1]]
                },
                {
                    locations: [[1, 0], [1, 1]]
                },
                {
                    locations: [[2, 0], [2, 1],[2, 2], [2, 3]]
                },
            ]
        };
        // when we have to check for true values means when we pass true/genune values to function, it supposed to return the true.
        expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal(player.ships[0]);
        expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal(player.ships[0]);
        expect( checkForShip( player, [ 1, 0 ] ) ).to.deep.equal(player.ships[1]);
        expect( checkForShip( player, [ 1, 1 ] ) ).to.deep.equal(player.ships[1]);
        expect( checkForShip( player, [ 2, 3 ] ) ).to.deep.equal(player.ships[2]);
        // when we have to check for false values means when we pass true or falsy or not genune value to function ,it supposed to return the false values.
        expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
    });
});

describe("damageShip", ()=>{
    const damageShip = require("../game_logic/ship_methods").damageShip;

    it("should register damage on a given ship at a given location. ", ()=>{
        const ship = {
            locations: [ [0, 0] ],
            damage: []
        };

        damageShip( ship, [0, 0]);

        expect( ship.damage ).to.not.be.empty;
        // we can do the below check for all the coordinates...
        expect( ship.damage[0] ).to.deep.equal([0, 0]); 
    });
});

describe("fire", ()=>{
    const fire = require("../game_logic/ship_methods").fire;

    it("should record damage on the given players ship at a givren coordinate", ()=>{
        const player = {
            ships: [
                {
                    locations: [[ 0, 0 ]],
                    damage: []
                }
            ]
        };

        fire( player, [ 0, 0 ]);

        expect( player.ships[0].damage[0]).to.deep.equal([ 0, 0 ]);
    });

    it("should NOT record damage if there is no ship at my coordinate", ()=>{
        const player = {
            ships: [
                {
                    locations: [[ 0, 0 ]],
                    damage: []
                }
            ]
        };

        fire( player, [ 9, 9 ]);

        expect( player.ships[0].damage).to.be.empty;
    });
});