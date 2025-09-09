function speedDetector(speed){
    const speedlimit = 70; //speed limit
    const kmperPoint = 5;  //Every 5km/h over limit = 1 point

    // If  speed is within limit,return 'ok'
if(speed < speedlimit){
    return 'OK';
    //calculate demerit points(rounded down)
}else {
    const points = Math.floor((speed - speedlimit)/ kmperPoint);
    if(points > 12) {
        return 'License suspended'
    }
    else{
        return 'points:' + points;
    }
}
}

//tests
console.log(speedDetector(50));
console.log(speedDetector(70));

