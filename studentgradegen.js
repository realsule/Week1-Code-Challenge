//Student Grade Generator


function studentgrade(marks) {
    //validate input -marks must be btn 0 and 100
if (marks < 0 || marks > 100) {
    console.log('Invalid input.Marks should between 0 and 100');
}
//determine grades based on marks
if(marks > 79) {
    console.log('grade A');
}else if(marks >= 60){
    console.log('grade B');
}else if(marks >= 49){
    console.log('grade C');
}
else if(marks >= 40){
    console.log('grade D');
}
else if(marks < 40){
    console.log('grade E');  
}
}

studentgrade(50)