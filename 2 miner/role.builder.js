var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 withdraw');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
			var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
				{filter: {structureType:STRUCTURE_STORAGE}});
			var storagePosition = storage.pos;
			var storageStorage = _.sum(storage.store);
			//console.log(storage);
			//console.log(storagePosition);
			//console.log(storageStorage);

			if(storageStorage > 100){
				if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
					creep.moveTo(storagePosition);
				}
			}
			//Harvest resources
	        /*var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/
	    }
	}
};

module.exports = roleBuilder;