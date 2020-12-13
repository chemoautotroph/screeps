var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //console.log(creep.memory._move.dest.x+' '+creep.memory._move.dest.y)


	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {filter: {structureType: STRUCTURE_CONTAINER}});
            
            var containerPosition = container.pos;
            var containerStorage = _.sum(container.store);

            var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {filter: {structureType : STRUCTURE_STORAGE}});
            
            var storagePosition = storage.pos;

            //console.log(containerStorage+'container storage');
            
            //console.log(targets[0])
            if(targets.length > 1) {
                if(creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            else if(targets.length===0){
                if(false){
                    creep.say('storage');
                    if(creep.transfer(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerPosition)}
                }
                else{
                    creep.say('storage');
                    if(creep.transfer(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storagePosition);
                    }
                }
                
            }
            /*
                if(creep.transfer(container),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerPosition)
                }
            }*/
        }
	}
};

module.exports = roleHarvester;