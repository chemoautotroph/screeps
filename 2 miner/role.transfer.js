var roleTransfer = {

    /** @para {Creep} creep **/
    run: function(creep) {
        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
            {filter: {structureType:STRUCTURE_STORAGE}});
        var storagePosition = storage.pos;
        var storageStorage = _.sum(storage.store);

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        /*
        var deadCreep = creep.room.findClosestByRange(TOMBSTONE_DECAY_PER_PART);
        if(deadCreep){
            if(creep.pickup(RESOURCES_ALL) == ERR_NOT_IN_RANGE){
                creep.moveTo(deadCreep);
            }
        }*/



        if(creep.memory.empty && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.empty = false;
            creep.say('withdraw')
        }
        if(!creep.memory.empty && creep.store.getFreeCapacity() == 0){
            creep.memory.empty = true;
            creep.say('transfer')
        }

        if(creep.memory.empty){
            if(targets.length){
                if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
        }
        else{
            if(creep.withdraw(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(storagePosition);
            }
        }
        
    }
};

module.exports = roleTransfer;