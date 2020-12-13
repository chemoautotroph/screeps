var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarrier = require('role.carrier');
var roleRepair = require('role.repair');
var roleMiner = require('role.miner');
var roleTransfer = require('role.transfer');

module.exports.loop = function () {

    var tower = Game.getObjectById('5fd1c2a658b91494e2569074');
    if(tower) {


        var closestHostil = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostil) {
            tower.attack(closestHostil);
        }
    }
    var tower1 = Game.getObjectById('5fbdd1c19ffa5d636d54d295');
    var tower0 = Game.getObjectById('5fd1831d53281c4ad4d74ba8');
    var allStructure = tower0.room.find(FIND_STRUCTURES,{
        filter:(structure)=>{
            return  (structure.structureType == STRUCTURE_ROAD||
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.hits < structure.hitsMax
        }
    });

    var wallRampart_RepairNow = tower0.room.find(FIND_STRUCTURES,{
        filter:(structure)=>{
            return  (structure.structureType == STRUCTURE_WALL||
                    structure.structureType == STRUCTURE_RAMPART) &&
                    structure.hits < structure.hitsMax/1000
        }
    });

    var wallRampart = tower0.room.find(FIND_STRUCTURES,{
        filter:(structure)=>{
            return  (structure.structureType == STRUCTURE_WALL||
                    structure.structureType == STRUCTURE_RAMPART) &&
                    structure.hits < structure.hitsMax/5
        }
    });

    var wallRampart_RepairFully = tower0.room.find(FIND_STRUCTURES,{
        filter:(structure)=>{
            return  (structure.structureType == STRUCTURE_WALL||
                    structure.structureType == STRUCTURE_RAMPART) &&
                    structure.hits < structure.hitsMax
        }
    });

    //var closestHostile = storage.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //console.log('allStructure is '+allStructure);
    //console.log(allStructure[0]);
    if(tower0) {
        if(allStructure[0]){
            tower0.repair(allStructure[0]);
            
        }
        else{
            tower0.repair(wallRampart_RepairNow[0]);
        }
        /*if(closestHostile) {
            tower0.attack(closestHostil);
        }*/
    }
    if(tower1) {
        if(allStructure){
            //console.log(allStructure)
            tower1.repair(allStructure[0]);
        }
        /*if(closestHostile) {
            tower1.attack(closestHostil);
        }*/
    }




    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'carrier'){
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'miner'){
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'transfer'){
            roleTransfer.run(creep);
        }
    }
    
    for(var name in Memory.creeps) {
        //console.log(name);
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }



    function parse(str, arr = undefined) {
        const r = /([1-9][0-9]*)?[mwcarhlt]/i;
        if(arr === undefined){
            arr = [];
        }
        let s = str.match(r);
        if(s === null){
            return arr;
        }
        let count = 1;
        if(s[1] !== undefined){
            count = parseInt(s[1]);
        }
        const dict = {m:MOVE, w:WORK, c:CARRY, a:ATTACK, r:RANGED_ATTACK, h:HEAL, l:CLAIM, t:TOUGH};
        let t = dict[s[0][s[0].length - 1].toLowerCase()];
        for(let i = 0; i < count; i++){
            arr.push(t);
        }
    
        return parse(str.substr(s['index'] + s[0].length), arr);
    }



    
    //respawn harvesters

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 4 && harvesters.length > 0) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    else if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    //console.log('The length of harvesters is '+harvesters.length)
    
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    
    //respawn builders

    
    var builders = _.filter(Game.creeps,(creep)=>creep.memory.role == 'builder');
    console.log('Builders: '+ builders.length);
    
    if(builders.length < 1){
        var newNameBuilders = 'Buliders'+ Game.time;
        console.log('Spawing new builders: '+ newNameBuilders);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],newNameBuilders, {memory:{role:'builder'}});
    }
    
    
    //respawn upgraders
    
    var upgraders = _.filter(Game.creeps,(creep)=>creep.memory.role == 'upgrader');
    console.log('Upgraders: '+upgraders.length);
    
    if(upgraders.length < 4){
        var newNameUpgraders = 'Upgraders'+Game.time;
        console.log('Spawing new Upgraders: '+newNameUpgraders);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],newNameUpgraders,{memory:{role:'upgrader'}});
    }
    else if(upgraders.length<1){
        var newNameUpgraders1 = 'Upgraders'+Game.time;
        console.log('Spawing new Upgraders: '+newNameUpgraders1);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],newNameUpgraders,{memory:{role:'upgrader'}});
    }


    //respawn carriers

    var carriers = _.filter(Game.creeps,(creep)=>creep.memory.role == 'carrier');
    console.log('Carriers: '+carriers.length);

    if(carriers.length<1){
        var newNameCarriers = 'Carrier'+Game.time;
        console.log('Spawing new Upgraders: '+newNameCarriers);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],newNameCarriers,{memory:{role:'carrier'}})
    }



    //respawn repairers

    var repairers = _.filter(Game.creeps,(creep)=>creep.memory.role =='repairer');
    console.log('Repairer: '+repairers.length);

    if(repairers.length<0){
        var newNameRepairers = 'Repairer'+Game.time;
        console.log('Spawing new Repairer: '+newNameRepairers);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY],newNameRepairers,{memory:{role:'repairer'}})
    }

    
    //respawn miners

    var miners = _.filter(Game.creeps, (creep)=>creep.memory.role == 'miner');
    console.log('Miner: '+miners.length);

    if(miners.length<1){
        var newNameMiners = 'Miner'+Game.time;
        console.log('Spawing new Miner: '+newNameMiners);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],newNameMiners,{memory:{role:'miner'}})
    }
    

    //respawn Transfers

    var transfer = _.filter(Game.creeps,(creep)=>creep.memory.role == 'transfer');
    console.log('Transfer: '+transfer.length);

    if(transfer.length<1){
        var newNameTransfer = 'Transfer'+Game.time;
        console.log('Spawing new Transfer: '+newNameTransfer);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE],newNameTransfer,{memory:{role:'transfer'}})
    }

    
    
    
    
}