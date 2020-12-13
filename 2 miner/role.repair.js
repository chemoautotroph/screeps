const { isNull } = require("lodash");

var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep){

        if(creep.memory.repire && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repire = false;
            creep.say(' transport');
        }
        if(!creep.memory.repire && creep.store.getFreeCapacity() == 0){
            creep.memory.repire = true;
            creep.say(' repairing');
        }

        if(creep.memory.repire){
            //creep.say('true');
            var wall = creep.pos.findInRange(FIND_STRUCTURES,20,{
                filter: (Structure)=>{
                    return( //Structure.structureType == STRUCTURE_WALL ||
                            Structure.structureType == STRUCTURE_ROAD ||
                            Structure.structureType == STRUCTURE_CONTAINER)}});
            //console.log(wall.length+'This is wall')
            
            //console.log(wall[0].hits+'This is hits of the container');
            var i = 0;
            //console.log(wall[i].hits+'road hits')
            //console.log(wall[i].hits===wall[i].hitsMax)
            //console.log(wall[i].hitsMax+'road maxhits')
            while(wall.length > i){
                var structurePosition = wall[i].pos
                if(structurePosition){
                    if(creep.repair(wall[i]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structurePosition)
                    }
                    else if (creep.repair(wall[i]) == ERR_NOT_ENOUGH_RESOURCES){
                        break;
                    }
                    else if (wall[i].hits === wall[i].hitsMax){
                        i+=1;
                        //console.log('this is fine'+i)
                        
                    }

                }
                break;
            }
            /*
            for(var i in wall){
                var structurePosition = wall[i].pos
                console.log(structurePosition+'This is structurePosition')
                if(structurePosition){
                    if(creep.repair(wall[i]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structurePosition)
                    }
                }
            }
            */
            /*
            var wallPosition = wall.pos;
            console.log(wall+'This is the wall');
            console.log(wallPosition+'This is wall position');
            console.log(creep.repair(wall));
            if(wall){
                if(creep.repair(wall) == ERR_NOT_IN_RANGE){
                    creep.moveTo(wallPosition);
                }

            }*/
        }
        else if(!creep.memory.repair){
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {filter: {structureType: STRUCTURE_CONTAINER}});
                //This returns the closest object if found, null otherwise. 
            var containerPosition = container.pos;
            //console.log(containerPosition+'container position');
            if (containerPosition){
                //creep.say('1');
                //console.log(creep.pos+'creep pisition');
                //console.log(creep.withdraw(container,RESOURCE_ENERGY));

                if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containerPosition);
                }

            }
        }
    }


};
module.exports = roleRepair;