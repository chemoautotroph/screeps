var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
            {filter: {structureType:STRUCTURE_STORAGE}});
        var storagePosition = storage.pos;
        var storageStorage = _.sum(storage.store);

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.withdraw(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storagePosition, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;