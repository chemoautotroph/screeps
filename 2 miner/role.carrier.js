const { isEqual } = require("lodash");

var roleCarrier ={

    /** @param {Creep} creep **/
    run: function(creep){
        var container = creep.room.find(FIND_STRUCTURES,
            {filter: {structureType:STRUCTURE_CONTAINER}});
        
        var containerPosition = [];
        var containerStorage = [];

        for(var i in container){
            containerPosition.push(container[i].pos);
            containerStorage.push(_.sum(container[i].store));
        }
        //console.log(containerStorage);
        

        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES,
            {filter: {structureType:STRUCTURE_STORAGE}});
        var storagePosition = storage.pos;
        var storageStorage = _.sum(storage.store);



        



        if(creep.store.getFreeCapacity() > 0 && containerStorage[0] > 300) {
            if(creep.pos.isNearTo(containerPosition[0])){
                creep.withdraw(container[0], RESOURCE_ENERGY)
            }
            else{
                creep.moveTo(containerPosition[0]);
            }
        }
        else if(creep.store.getFreeCapacity() > 0 && containerStorage[0] < 300){
            creep.moveTo(21,34);
        }
        else{
            //console.log('free capacity is 0');
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(storagePosition);
            }
        }


        const tomb = creep.pos.lookFor(LOOK_TOMBSTONES);
        if(tomb && creep.store.getFreeCapacity() > 0){
            if(creep.withdraw(tomb,RESOURCES_ALL) == ERR_NOT_IN_RANGE){
                creep.moveTo(tomb.pos);
                creep.say('bbb')
            }
            //creep.say('aaa')
        }
    }





};

module.exports = roleCarrier;