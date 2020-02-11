let bigRow,smallBox,smallRow,spaces
let Arr_box=[
    [
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    ],


    [
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    ],


    [
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    ]
]
var color=['#66FCF1','#C5C6C7']
var num_player=[1,2]
function big_row(input){
    bigRow=input
}
function small_row(input){
    smallRow=input
}
function small_box(input){
    smallBox=input
}
function space_calc(sp){
    var no=(bigRow*27)+(smallBox*9)+(smallRow*3)+sp
    return no
}
function space(input){

    spaces=input
    if(Arr_box[bigRow][smallBox]==1||Arr_box[bigRow][smallBox]==2){
        alert('Player '+Arr_box[bigRow][smallBox]+' have won this. Choose Another Box')
    }
    var val=Arr_box[bigRow][smallBox][smallRow][spaces]
    if(val==''&&Arr_box[bigRow][smallBox]!=1&&Arr_box[bigRow][smallBox]!=2){
        let coord=space_calc(input)
        //console.log(coord)
        let player=parseInt(document.getElementById('pl-no').innerHTML)-1
        var div=document.createElement('div')
        div.setAttribute('class','number')
        var name='player'+(player+1)
        div.classList.add(name)
        document.getElementsByClassName('space')[coord].appendChild(div)
        Arr_box[bigRow][smallBox][smallRow][spaces]=player+1
        check_small_box()
        player_change()
    }
    
    else{
        alert('Choose Another Box')
    }
}
function check_small_box(){
    
    var match=[]
    let player=parseInt(document.getElementById('pl-no').innerHTML)
    var Arr=Arr_box[bigRow][smallBox]
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            var no=(i*3)+j
            if(Arr[i][j]==player){
                match.push(no)
            }
        }
    }
    var answer =check_match(match)
    if(answer){
        var box=(bigRow*3)+smallBox
        
        document.getElementsByClassName('small-box')[box].style.backgroundColor='#1F2833'
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                var no=(bigRow*27)+(smallBox*9)+(i*3)+j
                document.getElementsByClassName('space')[no].style.borderColor=color[player-1]
            }
        }
        Arr_box[bigRow][smallBox]=player
        check_big_box()
    }
}
function check_big_box(){
    var match=[]
    let player=parseInt(document.getElementById('pl-no').innerHTML)
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            var no=(i*3)+j
            if(Arr_box[i][j]==player){
                match.push(no)
            }
        }
    }
    
    var answer =check_match(match)
    if(answer){
        for(var i=0;i<9;i++){
            document.getElementsByClassName('small-box')[i].style.backgroundColor='#1F2833'
        }
        for(var i=0;i<81;i++){
            document.getElementsByClassName('space')[i].style.borderColor=color[player-1]
        }
        alert('Congrats Player-'+player+' on winning the game.')
        document.location.reload(true)
    }
}
function check_match(arr){
    var accepted=[[0,1,2],[0,3,6],[2,5,8],[6,7,8],[0,4,8],[2,4,6],[1,4,7],[3,4,5]]
    let result
    for(var i=0;i<8;i++){
        var arr1=accepted[i]
        //console.log(arr1)
        result = arr1.every(function(val) { 
            return arr.indexOf(val) >= 0; 
        }); 
        //console.log(result)
        if(result){
            return true
        }
    }
    return false

}
function player_change(){
    var len=num_player.length
    var current_player=parseInt(document.getElementById('pl-no').innerHTML)
    let new_player
    if(current_player==num_player[len-1]){
        new_player=1
    }
    else{
        new_player=current_player+1
    }
    document.getElementById('pl-no').innerHTML=new_player.toString()
    document.getElementsByClassName('other-elem')[0].style.color=color[new_player-1]
    document.getElementsByClassName('player-img')[0].style.borderColor=color[new_player-1]
}