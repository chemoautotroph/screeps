var roleMiner = {

    /** @param {Creep} creep **/
    run : function(creep) {

        var miners = _.filter(Game.creeps, (creep)=>creep.memory.role == 'miner');
        var container = creep.room.find(FIND_STRUCTURES,
            {filter: {structureType:STRUCTURE_CONTAINER}});

        var containerPosition = [];
        var containerStorage = [];
    
        for(var i in container){
            containerPosition.push(container[i].pos);
            containerStorage.push(_.sum(container[i].store));
        }

        console.log(miners+'In miner')
        
        /*if(miners){
            var allPos = [];
            allPos.push([creep.memory._move.dest.x,creep.memory._move.dest.y])
            console.log(allPos+'allpos')
        }
        */
        /*
        var freeContainer
        if(Game.time%10===0){
            console.log('10 t')
        }
        for(var k of allPos){
            for(var j of containerPosition){
                if(!k === j){
                    freeContainer.push(j);
                }
            }
        }

        console.log(freeContainer+'This is J ');
        */
        

        //creep.memory.isMining = true;
        if(creep.memory.isMining && !creep.pos.isEqualTo(containerPosition[0])){
            creep.memory.isMining = false;
            console.log('mining')
        }
        if(!creep.memory.isMining && creep.pos.isEqualTo(containerPosition[0])){
            creep.memory.isMining = true;
            console.log('also Mining')
        }



        console.log(creep.memory.isMining)

        //console.log(creep.memory._move.dest.x)



        if(creep.pos.isEqualTo(containerPosition[0])){
            var resource = creep.pos.findClosestByRange(FIND_SOURCES);
            if(containerStorage[0] == 2000){
                creep.say('Full Container')
            }
            else{
                if(creep.harvest(resource) == ERR_NOT_IN_RANGE){
                    console.log('Error! container wrong position, can not reach energy resource')
                }
            }
        }
        else{
            creep.moveTo(containerPosition[0]);
            //console.log(creep.pos.isEqualTo(containerPosition));
            //console.log(creep.pos);
            //console.log(containerPosition);
        }


    }

};

module.exports = roleMiner;