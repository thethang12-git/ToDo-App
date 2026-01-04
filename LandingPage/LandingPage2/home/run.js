let calenNavbarMain = document.querySelector('.popUp-add-options-calendar__navbar')
let calendarMain = document.querySelector('.calendar-display')
let timeMain = document.querySelector('.time-display')
let repeatMain = document.querySelector('.repeat-display')
let tagMain = document.querySelector('.tag-display-options')
let groupsChoosing = document.querySelector('.groups-choose-navbar')
function reset(event) {
    event.target.value = ''
}
//  dữ liệu các mục
// phần "tất cả"
let data = [
    {
        group:'Dữ liệu test',
        content :
            [
                {
                    choosing: false,
                    star: true,
                    title:'nội dung 1',
                    content : 'Curabitur venenatis semper consequat. Mauris semper, enim ut molestie aliquet, nulla orci ornare felis',
                    tag : ['công việc'],
                    repeat: true,
                    date : '02/09/2025',
                    time: '09:26',
                },
            ]
    }
]
// Phần "hôm nay"
let todayData = [
    {
        group: 'Dữ liệu test' ,
        content :
            [
                {
                    star:true,
                    title: 'nội dung 1',
                    content : 'Curabitur venenatis semper consequat. Mauris semper, enim ut molestie aliquet, nulla orci ornare felis',
                    tag : ['công việc','khác'],
                    repeat: true,
                    date : '02/09/2025',
                    time: '09:25',
                },
            ]
    },
]
// Phần "3 ngày tới"
let next3DaysData = [{
    group:'Dữ liệu test',
    content :
        [
            {
                title:'nội dung 1',
                content : 'Curabitur venenatis semper consequat. Mauris semper, enim ut molestie aliquet, nulla orci ornare felis',
                tag : ['công việc','khác'],
                repeat: true,
                date : '02/09/2025',
                time: '09:50',
            },
        ]
    },
]
// Phần "7 ngày tới"
let Next7DaysData = [{
    group:'Dữ liệu test',
    content :
        [
            {
                star:true,
                title:'nội dung 1',
                content : 'Curabitur venenatis semper consequat. Mauris semper, enim ut molestie aliquet, nulla orci ornare felis',
                tag : ['công việc','khác'],
                repeat: true,
                date : '02/09/2025',
                time: '09:26',
            },
        ]
    },
]
//
function onFocus(event) {
    if (!event.target.closest('.navbar-options-num').hasAttribute('isChecked')) {
        for (let i = 0; i < 7; i++) {
            document.getElementsByClassName("navbar-options-num")[i].setAttribute('isChecked', 'false')
        }
    }
    if (event.target.closest('.navbar-options-num').getAttribute('isChecked') === 'false') {
        for (let i = 0; i < 7; i++) {
            document.getElementsByClassName("navbar-options-num")[i].setAttribute('isChecked', 'false')
            document.getElementsByClassName("navbar-options-num")[i].style.background = 'white'
            document.getElementsByClassName("navbar-options-num")[i].style.color = '#4D5761'
        }
        event.target.closest('.navbar-options-num').style.background = '#FDEAD7'
        event.target.closest('.navbar-options-num').style.color = '#EF6820'
        event.target.closest('.navbar-options-num').setAttribute('isChecked', 'true')
    }
}

function colorChange(event,array) {
    let item = event.target;
    let container = item.closest('.parent')
    let getClassName = container.querySelector('.parent-options').className
    let getID = parseInt(getClassName.match(/\d+/g).toString())
    array.forEach(item => item.content.forEach((itm) => {
        if(itm.id === getID){
            itm.star = !itm.star
        }
    } ))
    if (event.target.classList.contains('fa-regular')) {
        item.classList.remove('fa-regular')
        item.classList.add('fa-solid');
        item.style.color = '#EF6820'
    } else if (event.target.classList.contains('fa-solid')) {
        item.classList.remove('fa-solid')
        item.classList.add('fa-regular');
        item.style.color = 'black'
    }
    console.log('arrray', array)
}
function colorToFinish(event,array){
    let container = event.target.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    array.forEach(item => item.content.forEach((itm) => {
        if(itm.id === getID){
            itm.choosing = !itm.choosing
        }
    } ))
    if (event.target.getAttribute('src') === '../asset/Radio.png') {
        event.target.setAttribute('src', '../asset/Radio2.png')
        event.target.style.width = '20px'
        event.target.style.height = '20px'
        event.target.style.marginLeft = '8px'
        console.log('case finished!',previous)

        container.style.transition = 'all 0.5s ease-in'
        container.style.transform = 'translate(-500px, -500px) rotate(-30deg)';
        container.style.opacity = '0';
        container.style.height = container.scrollHeight + 'px';
        container.style.marginTop = '-15px'
        setTimeout(() =>container.style.height = '0' ,200)
        setTimeout(()=>{
            container.style.height = '0'
        //     xoá phần tử khỏi đối tượng hiện tại và thêm vào mục đã hoàn thành
            array.forEach((item) => {
                let finished = item.content.find((itemm) => itemm.id === getID)
                let index = item.content.findIndex(itm => itm.id === getID)
                let name = item.group
                if(finished){
                    item.content = item.content.filter((itemm) => itemm.id !== getID)
                    pushFinish(dataListToString,name,index,finished)
                }
                // if(item.content.length === 0){
                //     previous.splice(0,previous.length,...previous.filter(item =>item.content.length > 0))
                // }
            } )
        },100)
        filterMode = false
        setTimeout(() => {listFilter();filterMode = true},100)
    //
    }
    else if ((event.target.getAttribute('src') === '../asset/Radio2.png')) {
        event.target.setAttribute('src', '../asset/Radio.png')
        event.target.style.width = '28px'
        event.target.style.height = '28px'
        event.target.style.marginLeft = '0'
        console.log('case not finished!')
    }
}
let contain = document.querySelector('.navbar');
let collapsed = false;
// click bất kỳ đâu cũng đóng sidebar
function handleClick(e) {
    // if (!contain.contains(e.target) ) {
        contain.style.left = '-300px'
        document.removeEventListener('click', handleClick);
    // }
}

window.addEventListener('resize', function () {
    collapsed = false;
    let button = document.querySelector('.toggleDisplay');
    let button_left = document.querySelector('.toggle1');
    let button_right = document.querySelector('.toggle2');
    let popUp = document.querySelector('.popUp-add')
    let search = document.querySelector('.search-popUp-container')
    if (window.innerWidth > 1400) {
        contain.style.left = ''
        contain.style.zIndex = ''
        contain.style.background = ' '
        contain.style.borderRadius = ''
        contain.style.height = ''
        contain.style.width = '237px'
        // 
        popUp.style.width = '487px'
        search.style.width = '624px'
        //
        // sửa phần popup calendar, time, repeat,tags case view > 1400
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.position = 'absolute'
        calendarMain.style.transform = 'none'
        calendarMain.style.left = '-150%'
            //
        timeMain = document.querySelector('.time-display');
        timeMain.style.position = 'absolute'
        timeMain.style.transform = 'none'
        timeMain.style.left = '-20%'
            //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.position = 'absolute'
        repeatMain.style.transform = 'none'
        repeatMain.style.left = '-50px'
        repeatMain.style.top = '100%'
            //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.position = 'absolute'
        tagsMain.style.transform = 'none'
        tagsMain.style.left = '0'
        //
    } else if (window.innerWidth <= 1200) {
        document.querySelector('.toggleDisplay').style.display = 'none'
        button.setAttribute('data-status', 'left');
        button_left.style.borderRadius = '55px';
        button_left.style.background = 'white';
        button_right.style.background = '#E5E7EB';
        display()
        // sửa phần popup và tìm kiếm ở đây cho mobile
        popUp.style.width = '100vw'
        search.style.width = '100vw'
        //

        // sửa phần popup calendar, time, repeat,tags cho mobile
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.transition = 'all 1.5s ease'
        calendarMain.style.position = 'fixed'
        calendarMain.style.transform = 'translateX(-50%)'
        calendarMain.style.left = '50%'
            //
        timeMain = document.querySelector('.time-display');
        timeMain.style.position = 'fixed'
        timeMain.style.transform = 'translateX(-50%)'
        timeMain.style.left = '50%'
            //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.position = 'fixed'
        repeatMain.style.transform = 'translateX(-50%)'
        repeatMain.style.left = '50%'
        repeatMain.style.top = '100%'
            //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.position = 'fixed'
        tagsMain.style.transform = 'translateX(-50%)'
        tagsMain.style.left = '50%'
        //
    } else if (window.innerWidth > 1200) {
        document.querySelector('.toggleDisplay').style.display = 'flex'
        // contain.style.width = '237px'
        // display()
        // 
        popUp.style.width = '487px'
        search.style.width = '624px'
        // sửa phần popup calendar, time, repeat,tags case view > 1200
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.position = 'absolute'
        calendarMain.style.transform = 'none'
        calendarMain.style.left = '-150%'
            //
        timeMain = document.querySelector('.time-display');
        timeMain.style.position = 'absolute'
        timeMain.style.transform = 'none'
        timeMain.style.left = '-20%'
            //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.position = 'absolute'
        repeatMain.style.transform = 'translateX(-50%)'
        repeatMain.style.left = '-50px'
        repeatMain.style.top = '100%'
            //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.position = 'absolute'
        tagsMain.style.transform = 'none'
        tagsMain.style.left = '0'
        //
    }
})

function optionsSizeReset () {
    let popUp = document.querySelector('.popUp-add')
    let search = document.querySelector('.search-popUp-container')
    if (window.innerWidth > 1400) {
        popUp.style.width = '487px'
        search.style.width = '624px'
        //
        // sửa phần popup calendar, time, repeat,tags case view > 1400
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.position = 'absolute'
        calendarMain.style.transform = 'none'
        calendarMain.style.left = '-150%'
        //
        timeMain = document.querySelector('.time-display');
        timeMain.style.position = 'absolute'
        timeMain.style.transform = 'none'
        timeMain.style.left = '-20%'
        //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.position = 'absolute'
        repeatMain.style.transform = 'none'
        repeatMain.style.left = '-50px'
        repeatMain.style.top = '100%'
        //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.position = 'absolute'
        tagsMain.style.transform = 'none'
        tagsMain.style.left = '0'
        //
    }
    else if (window.innerWidth <= 1200) {
        // sửa phần popup và tìm kiếm ở đây cho mobile
        popUp.style.width = '100vw'
        search.style.width = '100vw'
        //

        // sửa phần popup calendar, time, repeat,tags cho mobile
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.transition = 'all 1.5s ease'
        calendarMain.style.position = 'fixed'
        calendarMain.style.transform = 'translateX(-50%)'
        calendarMain.style.left = '50%'
        //
        timeMain = document.querySelector('.time-display');
        timeMain.style.transition = 'all 1.5s ease'
        timeMain.style.position = 'fixed'
        timeMain.style.transform = 'translateX(-50%)'
        timeMain.style.left = '50%'
        //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.transition = 'all 1.5s ease'
        repeatMain.style.position = 'fixed'
        repeatMain.style.transform = 'translateX(-50%)'
        repeatMain.style.left = '50%'
        repeatMain.style.top = '100%'
        //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.transition = 'all 1.5s ease'
        tagsMain.style.position = 'fixed'
        tagsMain.style.transform = 'translateX(-50%)'
        tagsMain.style.left = '50%'
        //
    } else if (window.innerWidth > 1200) {
        // contain.style.width = '237px'
        // display()
        //
        popUp.style.width = '487px'
        search.style.width = '624px'
        // sửa phần popup calendar, time, repeat,tags case view > 1200
        calendarMain = document.querySelector('.calendar-display');
        calendarMain.style.position = 'absolute'
        calendarMain.style.transform = 'none'
        calendarMain.style.left = '-150%'
        //
        timeMain = document.querySelector('.time-display');
        timeMain.style.position = 'absolute'
        timeMain.style.transform = 'none'
        timeMain.style.left = '-20%'
        //
        repeatMain = document.querySelector('.repeat-display')
        repeatMain.style.position = 'absolute'
        repeatMain.style.transform = 'translateX(-50%)'
        repeatMain.style.left = '-50px'
        repeatMain.style.top = '100%'
        //
        let tagsMain = document.querySelector('.tag-display-options');
        tagsMain.style.position = 'absolute'
        tagsMain.style.transform = 'none'
        tagsMain.style.left = '0'
        //
    }
}

function toggleSidebar() {
    let item = document.querySelector('.navbar');
    if (window.innerWidth < 1400) {
        item.style.left = '0px'
        item.style.zIndex = '999'
        item.style.background = ' white'
        item.style.borderRadius = '8px'
        item.style.height = '100vh'
        item.style.width = '237px'
        document.removeEventListener('click', handleClick)
        setTimeout(() => {
            document.addEventListener('click', handleClick);
        }, 10)
        return
    }
    item.style.width = '237px'
    item.style.left = '0'
    // console.log(collapsed);
    if (!collapsed) {
        item.style.width = '0px';
        item.style.overflow = 'hidden';
        item.style.padding = '8px 0';
    } else {

        item.style.width = '237px';
        item.style.padding = '8px 16px';
    }
    collapsed = !collapsed;
}

function repeatToggle(event,array) {
    let container = event.target.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let item = array.flatMap(item => item.content).find(itm => itm.id == getID)
    let div = event.target.closest('div');
    let calendar = div.querySelector('.fa-calendar');
    if(!item.repeat) {
        calendar.style.color = '#F04438'
        event.target.style.color = '#F04438'
    }
    else {
        calendar.style.color = '#9DA4AE'
        event.target.style.color = '#9DA4AE'
    }
    array.forEach(item => item.content.forEach((itm) => {
        if(itm.id == getID){
            itm.repeat = !itm.repeat
        }
    } ))
}


// function dislayModify(){
//     let item = document.querySelector('.content-body');
//     let item1 = document.querySelector('.content-body--1');
//     let item2 = document.querySelector('.content-body--2');
//     let item3 = document.querySelector('.content-body--3');
//     item1.style.width = '29.2rem'
//     item2.style.width = '28.3rem'
//     item3.style.flex = '1'
//     setTimeout(() => {
//         item.style.flexDirection = 'row'
//             }
//         , 500)
// }
function display() {
    let item = document.querySelector('.content-body');
    let item1 = document.querySelector('.content-body--1');
    let item2 = document.querySelector('.content-body--2');
    let item3 = document.querySelector('.content-body--3');
    item3.style.width = '15rem'
    setTimeout(() => {
            item1.style.width = '100%'
        }
        , 100)
    setTimeout(() => {
            item2.style.width = '100%'
        }
        , 400)
    setTimeout(() => {
            item3.style.width = '100%'
        }
        , 600)
    setTimeout(() => {
        document.querySelectorAll('#content > div').forEach(div => div.style.width = '100%')
        }
        , 800)
    setTimeout(() => {
            item.style.flexDirection = 'collumn'
        }
        , 300)
}


function displayMenu() {
    let item = document.querySelector('.content-body');
    let item1 = document.querySelector('.content-body--1');
    let item2 = document.querySelector('.content-body--2');
    let item3 = document.querySelector('.content-body--3');
    let button = document.querySelector('.toggleDisplay');
    let button_left = document.querySelector('.toggle1');
    let button_right = document.querySelector('.toggle2');
    if (button.getAttribute('data-status') === 'left') {
        item.style.flexWrap = 'wrap'
        button.setAttribute('data-status', 'right');
        button_right.style.borderRadius = '55px';
        button_right.style.background = 'white';
        button_left.style.background = '#E5E7EB';
        //
        document.querySelectorAll('#content > div').forEach(div => div.style.width = '30%')
        // item1.style.width = '30%' //29.2rem
        // item2.style.width = '30%' //28.3rem
        // item3.style.width = '30%'
        setTimeout(() => {
                item.style.flexDirection = 'row'
            }
            , 800)
    } else {
        button.setAttribute('data-status', 'left');
        button_left.style.borderRadius = '55px';
        button_left.style.background = 'white';
        button_right.style.background = '#E5E7EB';
        //
        item.style.flexWrap = 'nowrap'
        if(item3){
            item3.style.width = '15rem'
        }
        setTimeout(() => {
                item1.style.width = '100%'
            }
            , 100)
        setTimeout(() => {
                item2.style.width = '100%'
            }
            , 400)
        setTimeout(() => {
                item3.style.width = '100%'
            }
            , 600)
        setTimeout(() => {
                document.querySelectorAll('#content > div').forEach(div => div.style.width = '100%')
                item.style.flexDirection = 'column'
            }
            , 300)
    }
}

document._handlepopUp = (e) => {
    let speciGr = document.querySelectorAll('.fa-plus')
    let popup = document.querySelector('.popUp-add')
    let container = document.querySelector('.container')
    let button = document.querySelector('.add-Btn')
    let overlay = document.querySelector('.blur-overlay')
    let valid = Array.from(speciGr).some(group => group.contains(e.target))
    if (popup.contains(e.target) === false && e.target.closest('.add-Btn') !== button && !valid ) {
        popup.removeAttribute('data-status');
        popup.style.opacity = '0'
        popup.style.visibility = 'hidden'
        overlay.style.display = 'none'
        document.removeEventListener('click', document._handlepopUp)
        popup.removeEventListener('click', popup._handlepopUp)
    }
}

function handlePopup(e) {
    let invalid = !e.target.closest('.options_num-1') && !e.target.closest('.options_num-2') && !e.target.closest('.options_num-3') && !e.target.closest('.options_num-4') && !e.target.closest('.groups-choose>div')
    if (invalid) {
        calenNavbarMain.style.display = 'none'
        calendarMain.style.display = 'none'
        timeMain.style.display = 'none'
        repeatMain.style.display = 'none'
        tagMain.style.display = 'none'
        groupsChoosing.style.display = 'none'
    }
}

function addBtn() {
    if(isNeedToReset) {
        renderForAddTodo()
        isNeedToReset = false;
    }
    let popup = document.querySelector('.popUp-add')
    let overlay = document.querySelector('.blur-overlay')
    popup.setAttribute('data-status', 'actived');
    popup._handlepopUp = (e) => {
        handlePopup(e)
    }
    if (popup.getAttribute('data-status') === 'actived') {
        setTimeout(() => {
                document.addEventListener('click', document._handlepopUp)
                document.removeEventListener('click',popup._handlepopUp)
            }, 100
        )
    }
    popup.style.transform = 'translateX(-50%) scale(1)';
    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
    popup.style.zIndex = '1812'
    setTimeout(() => {
        popup.style.display = 'flex';
        popup.addEventListener('click', popup._handlepopUp)
    }, 0)
    overlay.style.display = 'block'
}

function addCalendarBtn(event) {
    let container = document.querySelector('.options_num-1')
    let item = document.querySelector('.popUp-add-options-calendar__navbar')
    let icon = container.querySelector('i');
    let p = container.querySelector('div p');
    let valid = event.target === event.currentTarget || event.target === icon || event.target === p
    if (valid && item.style.display === 'none') {
        item.style.display = 'block';
        calendarMain.style.display = 'none';
        timeMain.style.display = 'none';
        repeatMain.style.display = 'none';
        tagMain.style.display = 'none';
    } else if (event.target.closest('.undo')) {
        let undo = document.querySelector('.undo');
        undo.style.display = 'none';
        icon.style.display = 'block';
        p.innerText = ''
    } else {
        item.style.display = 'none';
    }
}

function setValue(contain, icon, content, event) {
    let iconn = document.querySelector(icon);
    let contentt = document.querySelector(content);
    let undo = document.querySelector('.undo');
    let containn = document.querySelector(contain);
    iconn.style.display = 'none';
    contentt.style.display = 'block';
    contentt.innerText = event.target.textContent;
    undo.style.display = 'block';
    containn.style.background = '#FEFAF5';
    containn.style.borderRadius = '8px';
}

// Calendar
// Chọn ngày để hiển thị ở đây
let choosedDate = ''
let userChoosedMonth = ''
let userChoosedYear = ''
let tempCalen
function displayCalen(e) {
    let calendar = document.querySelector('.calendar-display')
    let contentt = document.querySelector('.options_num-1 div:first-of-type>p');
    let value = e.target.closest('td')
    let popup = document.querySelector('.popUp-add')
    if (calendar.getAttribute('data-status') === 'active' && value !== null) {
        calendar.style.display = 'none';
        choosedDate = value.innerText
        userChoosedMonth = choosedMonth
        userChoosedYear = choosedYear
        calendar.setAttribute('data-status', 'deactive');
        contentt.innerHTML = `${value.innerText}/${choosedMonth}/${choosedYear}`;
        tempCalen = `${choosedDate}/${userChoosedMonth}/${userChoosedYear}`;
    }
    // else if (calendar.style.display == 'none') {
    else if (!calendar.contains(e.target) ){
        calendar.setAttribute('data-status', 'deactive');
        if(tempCalen) {
            contentt.innerHTML = tempCalen
        }
        else {
            let iconn = document.querySelector('.options_num-1 i:first-of-type');
            let undo = document.querySelector('.undo');
            contentt.innerHTML  = null
            iconn.style.display = 'block'
            undo.style.display = 'none';
        }
        popup.removeEventListener('click', displayCalen);
    }
    if (e.target.closest('.undo')) {
        let iconn = document.querySelector('.options_num-1 i:first-of-type');
        let undo = document.querySelector('.undo');
        undo.style.display = 'none';
        iconn.style.display = 'block';
        contentt.innerText = ''
        calendar.style.display = 'none';
        calendar.setAttribute('data-status', 'deactive');
    }
}

let thisYear = new Date().getFullYear()
let thisMonth = new Date().getMonth() + 1

function calendarDisplay() {
    // let contentt = document.querySelector('.options_num-1 div:first-of-type>p');
    let date = document.querySelector('.calendar-date')
    let calendar = document.querySelector('.calendar-display')
    let popup = document.querySelector('.popUp-add')
    if (calendar.getAttribute('data-status') === 'deactive') {
        date.innerText = `Tháng ${choosedMonth} ${choosedYear}`;
        popup.removeEventListener('click', displayCalen);
        calendar.style.display = 'flex'
        calendar.setAttribute('data-status', 'active')
        setTimeout(() => {
            popup.addEventListener('click', displayCalen)
        }, 10)
        createCalendar(thisYear, thisMonth);
        // calenNavbarMain.style.display = 'none';
        // timeMain.style.display = 'none';
        // repeatMain.style.display = 'none';
        // tagMain.style.display = 'none';
    }
}

let choosedMonth = thisMonth
let choosedYear = thisYear

function previousMonth() {
    let date = document.querySelector('.calendar-date')
    if (choosedMonth === thisMonth && choosedYear === thisYear) {
        return
    } else if (choosedMonth === 1) {
        choosedYear--;
        choosedMonth = 13
    }
    createCalendar(choosedYear, choosedMonth -= 1);
    date.innerText = `Tháng ${choosedMonth} ${choosedYear}`;
}

function nextMonth() {
    let date = document.querySelector('.calendar-date')
    if (choosedMonth > 11) {
        choosedMonth = 0;
        choosedYear++;
    }
    createCalendar(choosedYear, choosedMonth += 1);
    date.innerText = `Tháng ${choosedMonth} ${choosedYear}`;
}
// Lấy ngày và add vào mảng
function getDaysInMonth(year, month) {
    let date = new Date(year, month, 0);
    let daysInMonth = date.getDate();
    let daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }
    return daysArray;
}

// Từ mảng -> tạo bảng và add giá trị vào HTML
function createCalendar(year, month) {
    let today = new Date().getDate()
    let calendar = document.querySelector('.calendar_table')
    calendar.innerHTML = '<tr><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th><th>T7</th><th>CN</th></tr>'
    let table = ''
    // let prevMonth,prevYear
    // if(month === 1){
    //     prevMonth = 12
    //     prevYear = year - 1
    // }
    // else {
    //     prevMonth = month - 1
    //     prevYear = year
    // }
    // let prev = getDaysInMonth(prevYear,prevMonth)

    let currentMonth = getDaysInMonth(year, month)

    // let nextMonth, nextYear;
    // if (month === 12) {
    //     nextMonth = 1;
    //     nextYear = year + 1;
    // } else {
    //     nextMonth = month + 1;
    //     nextYear = year;
    // }
    // let nextMonthDays = getDaysInMonth(nextYear, nextMonth);

    let firstdayInWeek = new Date(year,month -1,1).getDay()
    firstdayInWeek = firstdayInWeek === 0 ? 6 : firstdayInWeek - 1
    // let prevSpliced = prev.splice(prev.length - firstdayInWeek,prev.length)
    // let nextSpliced = nextMonthDays.splice(0,firstdayInWeek)
    // currentMonth.unshift(...prevSpliced)
    // currentMonth.push(...nextSpliced)
    for(let i = 0;i< firstdayInWeek;i++){
        currentMonth.unshift('')
    }
    for (let t = 0; t <= 43 - currentMonth.length;t++){
        currentMonth.push('')
    }
    console.log(currentMonth,month,year)
    // 
    for (let i = 0; i < 43; i++) {
        if (currentMonth[i] === '') {
            table += '<td  style = "pointer-events: none;">' + '' + '</td>';
            continue
        }
        if (currentMonth[i] === undefined){
            table += '<td  style = "pointer-events: none;display: none">' + '' + '</td>'
            continue
        }
        if (currentMonth[i] == choosedDate && userChoosedMonth == choosedMonth && userChoosedYear == choosedYear) {
            table += '<td style="background: #EF6820;color: white">' + currentMonth[i] + '</td>';
            continue
        }
        if (i === 0) {
            table += '<tr>'
            if(currentMonth[i] < today){
                table += '<td style="color: #D2D6DB" >' + currentMonth[i] + '</td>';
            }
            else {
                table += '<td>' + currentMonth[i] + '</td>';
            }
            continue
        }
        if ((i ) % 7 == 0 && (i ) % 2 == 0) {
            table += `</tr data-num ="${i}" >`

            table += '<tr>';
        } else if ((i) % 7 == 0 && (i ) % 2 != 0) {
            table += '</tr>';
            table += '<tr>';
        }
        if(currentMonth[i] < today) {
            table += '<td style="color: #D2D6DB">' + currentMonth[i] + '</td>';
            continue
        }
        table += '<td>' + currentMonth[i] + '</td>';
    }
    table += '</tr>';
    calendar.innerHTML += table;
}   

let toggleTime = false

function timeDisplay(event) {
    let contain = document.querySelector('.options_num-2');
    let undo = document.querySelector('.options_num-2 .undo2');
    let icon = document.querySelector('.options_num-2 i:first-of-type')
    let content = document.querySelector('.time-display');
    let hour = document.querySelector('.time-display_hour').value;
    let minute = document.querySelector('.time-display_minute').value;
    let display = document.querySelector('.options_num-2 div:first-of-type>p')
    let p = contain.querySelector('p');
    let valid = event.target === contain || event.target === icon || event.target === p
    if (content.style.display === 'none' && valid) {
        content.style.display = 'flex'
        calenNavbarMain.style.display = 'none';
        repeatMain.style.display = 'none';
        tagMain.style.display = 'none';
        calendarMain.style.display = 'none'
    }
    else if (valid && content.style.display === 'flex') {
        content.style.display = 'none'
    }
    else if (hour !== '--' && minute !== '--') {
        if (content.contains(event.target) && toggleTime ) {
            content.style.display = 'flex';
            toggleTime = false;
            return
        }
        toggleTime = true
        display.style.display = 'block'
        icon.style.display = 'none'
        display.innerHTML = `${hour}:${minute}`;
        content.style.display = 'none'
        undo.style.display = 'block'
        contain.style.background = '#FEFAF5'
    }
    if (undo.contains(event.target)) {
        content.style.display = 'none'
        contain.style.background = 'white'
        document.querySelector('.time-display_hour').value = '--'
        document.querySelector('.time-display_minute').value = '--'
        display.innerHTML = ``;
        icon.style.display = 'block'
        undo.style.display = 'none'
    }
}

// repeat Displaying
function repeatCounter() {
    let contain = document.querySelector('.options_num-3')
    let container = document.querySelector('.repeatCounter-container')
    let img = container.querySelector('img')
    if (contain.querySelector('.repeatCounter').value <= 0 || contain.querySelector('.repeatCounter').value >= 100 || contain.querySelector('.repeatCounter').value === '') {
        contain.querySelector('.repeatCounter').value = ''
        img.setAttribute('src', '../asset/Radio.png')
        img.style.width = '28px'
        img.style.height = '28px'
        img.style.marginLeft = '0'
        return
    }
    img.setAttribute('src', '../asset/Radio2.png')
    img.style.width = '20px'
    img.style.height = '20px'
    img.style.marginLeft = '8px'
}

function repeatDisplay(event) {
    let content = document.querySelector('.repeat-display')
    let contain = document.querySelector('.options_num-3')
    let icon = contain.querySelector('.fa-repeat')
    if (content.style.display === 'none') {
        content.style.display = 'flex'
        timeMain.style.display = 'none'
        calendarMain.style.display = 'none'
        calenNavbarMain.style.display = 'none';
        tagMain.style.display = 'none';
    } else if (event.target === event.currentTarget || event.target.closest('.fa-repeat') === icon) {
        content.style.display = 'none'
    } else if (content.style.display === 'flex' && event.target === contain.querySelector('.repeatCounter')) {
        contain.querySelector('.repeatCounter').addEventListener('input', repeatCounter);
    }
}

function repeatNav1(event) {
    let container = document.querySelector('.options_num-3')
    let icon = container.querySelector('i')
    let content = document.querySelector('.repeat-display_navbar-1')
    let contain = document.querySelector('.repeat-display_navbar')
    let isValid = event.target === event.currentTarget || event.target === contain.querySelector('p') || event.target === contain.querySelector('i')
    if (isValid && content.style.display === 'none') {
        content.style.display = 'flex'
    } else if (isValid && content.style.display === 'flex') {
        content.style.display = 'none'
    } else if (content.style.display === 'flex') {
        let target = event.target.closest('p');
        contain.querySelector('p').innerText = target.innerText
        content.style.display = 'none'
        if (target.innerText !== 'Không lặp lại ') {
            container.style.background = '#FEFAF5'
            icon.style.color = 'rgb(239, 104, 32)'
            return
        }
        container.style.background = 'white'
        icon.style.color = 'black'
    }
}

function focusChange(item) {
    let contain = document.querySelector('.options_num-3')
    contain.querySelector(item).value = ''
    contain.querySelector(item).focus()
    contain.querySelector('.repeatCounter').addEventListener('input', repeatCounter);
    contain.querySelector('.repeatCounter').addEventListener('focusout', repeatCounter);
}

function calendarModify(event, valid) {
    let contain = document.querySelector('.repeat-calendarModify')
    let img = contain.querySelector('img')
    if (valid) {
        for (let i = 1; i < 4; i++) {
            let item = contain.querySelector(`.repeat-calendar-num-${i}`);
            if (!item.value) {
                item.value = ''
                img.setAttribute('src', '../asset/Radio.png')
                img.style.width = '28px'
                img.style.height = '28px'
                img.style.marginLeft = '0'
                return
            }
        }
        img.setAttribute('src', '../asset/Radio2.png')
        img.style.width = '20px'
        img.style.height = '20px'
        img.style.marginLeft = '8px'
    } else {
        if (event.target.getAttribute('max') === '9999') {
            if (event.target.value > 0) {
                event.target.addEventListener('focusout', () => {
                    if (event.target.value < 2000) {
                        event.target.value = '';
                        img.setAttribute('src', '../asset/Radio.png')
                        img.style.width = '28px'
                        img.style.height = '28px'
                        img.style.marginLeft = '0'
                    } else if (event.target.value > 9999) {
                        event.target.value = '';
                        img.setAttribute('src', '../asset/Radio.png')
                        img.style.width = '28px'
                        img.style.height = '28px'
                        img.style.marginLeft = '0'
                    }
                })
            }
            return
        }
        event.target.value = ''
        img.setAttribute('src', '../asset/Radio.png')
        img.style.width = '28px'
        img.style.height = '28px'
        img.style.marginLeft = '0'
    }
}

function counter(event) {
    let number = +event.target.className.match(/\d+/g)[0]
    let contain = document.querySelector('.repeat-calendarModify')
    if (event.target.closest('input').value.length === 2) {
        contain.querySelector(`.repeat-calendar-num-${number + 1}`).value = ''
        contain.querySelector(`.repeat-calendar-num-${number + 1}`).focus()
    }
}

function counter2(event, valid) {
    let number = +event.target.className.match(/\d+/g)[0]
    let contain = document.querySelector('.repeat-calendarModify')
    if (event.target.closest('input').value.length === 4) {
        if (valid) {
            contain.querySelector(`.repeat-calendar-num-${number}`).blur()
        } else {
            contain.querySelector(`.repeat-calendar-num-${number}`).value = ''
            contain.querySelector(`.repeat-calendar-num-${number}`).focus()
        }
    }
}

let tempData = []

function tagDisplay(event) {
    let container = document.querySelector('.options_num-4')
    let contain = container.querySelector('.tag-display-options')
    let icon = container.querySelector('i')
    let content = container.querySelector('p')
    let valid = event.target === event.currentTarget || event.target === icon || event.target === content
    if (valid && contain.style.display === 'none') {
        contain.style.display = 'flex'
        timeMain.style.display = 'none'
        calendarMain.style.display = 'none'
        calenNavbarMain.style.display = 'none';
        repeatMain.style.display = 'none'
    } else if (valid && contain.style.display === 'flex') {
        contain.style.display = 'none'
    } else if (event.target.closest('p')) {
        content.style.display = 'block'
        icon.style.display = 'none'
        if (event.target.closest('p').getAttribute('data-isChoosed') === 'false') {
            tempData.push(event.target.closest('p').innerText)
            content.innerHTML = tempData.join(',')
            event.target.closest('p').setAttribute('data-isChoosed', 'true')
            content.style.color = '#EF6820'
            event.target.closest('p').style.background = '#FEFAF5'
            event.target.closest('p').style.color = '#EF6820'
            container.style.background = '#FEFAF5'
        } else if (event.target.closest('p').getAttribute('data-isChoosed') === 'true') {
            tempData = tempData.filter(item => item !== event.target.closest('p').innerText)
            content.innerHTML = tempData.join(',')
            event.target.closest('p').setAttribute('data-isChoosed', 'false')
            event.target.closest('p').style.background = 'white'
            if (tempData.length === 0) {
                icon.style.display = 'block';
                content.style.display = 'none'
                container.style.background = 'white'
            }
            event.target.closest('p').style.color = 'black'
        }
    }
}

function tagAdd(status) {
    let plus = document.querySelector('.tag-display-add span')
    setTimeout(() => {
        if (status === 'true') {
            plus.style.display = 'block'
        }
        else {
            plus.style.display = 'none'
        }
    }, 1000);
}
let isTagDupl = []
function tagAddHandle() {
    let container = document.querySelector('.tag-display-options')
    let contain = document.querySelector('.tag-display-add')
    let input = contain.querySelector('input')
// Xử lý thêm 1 thẻ mới vào giữa những thẻ có sẵn 
    let valid = input.value.trim() && input.value.length <= 20 && !isTagDupl.includes(input.value.trim()) && !TagsHandler().includes(input.value.trim())
    if(valid) {
        let newTag = document.createElement('p');
        newTag.setAttribute('data-isChoosed', 'false')
        newTag.textContent = input.value
        isTagDupl.push(input.value.trim())
        newTag.setAttribute('style', "font-size:13px;border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;")
        container.insertBefore(newTag, contain);
        input.value = ''
    }
}

// xử lý load nội dung khi ấn vào các mục ở side-bar

function loadContent(url,contentt) {
    let content = document.getElementById('content')
    content.classList.add('fade-out');
    setTimeout(() => {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                content.innerHTML = html;
                if(window[contentt]){
                    content.innerHTML = window[contentt]()
                }
            })
            .catch(err => {
                console.error("Lỗi:", err);
            })
        content.classList.remove('fade-out');
    }, 200)
}

// Click vào để chỉnh sửa thẻ
function clickToEdit(e){
    let getContainer = e.currentTarget
    let getToEdit = getContainer.querySelector('.click-to-edit')
    if(getContainer.style.background === 'rgb(254, 246, 238)'){
        getToEdit.style.opacity = '0'
        getToEdit.style.display = 'flex'
        setTimeout(() =>getToEdit.style.opacity = '1' ,100)
    }
    else {
        getToEdit.style.opacity = '0'
        setTimeout(() =>getToEdit.style.display = 'none' ,200)
    }

}
function clickToModify(element, event, isallow ,dupDel,array) {
    if (isallow) {
        let icon = element.querySelector('i')
        let tab = document.createElement('i')
        let container = icon.closest('.parent')
        let getClassName = container.querySelector('.parent-options').className
        let getID = parseInt(getClassName.match(/\d+/g).toString())
        let chooseItem =  array.flatMap((item) => item.content).find((itm) => itm.id == getID)
        if(element.style.background === 'rgb(254, 246, 238)') {
            tab.className = (chooseItem.star ? 'fa-solid' : 'fa-regular') + ' fa-star tab-transition';
            tab.style.color = chooseItem.star ? '#EF6820' : 'black'
            tab.style.opacity = '0'
            tab.onclick = function (event) {
            colorChange(event, array)
            stopPropa(event)
}
            setTimeout(() => {tab.classList.remove('tab-transition');tab.style.opacity = '1';tab.style.transform = 'translateY(0)';},100)
            icon.replaceWith(tab)
            element.style.background = 'white'
        }
        else  {
            tab.classList.add('fa-solid','fa-ellipsis','tab-transition')
            setTimeout(() => {tab.classList.remove('tab-transition');tab.style.opacity = '1';tab.style.transform = 'translateY(0)';},100)
            tab.setAttribute('onclick', `dupDelFunc('${dupDel}');stopPropa(event)`)
            icon.replaceWith(tab)
            // element.style.background = 'rgb(254, 250, 245)'
            element.style.background = 'rgb(254, 246, 238)'
        }
    }
}

// function littleDisable(parent,dupDel) {
//     parent.setAttribute('onclick',`clickToModify(this,event,true,'${dupDel}')`)
// }

// function disable(element,dupDel) {
//     let parent = element.closest('.parent')
//     parent.setAttribute('onclick','clickToModify(this,event,false)')
//     document.addEventListener('click',() => littleDisable(parent,dupDel), { once: true });
// }

function dupDelFunc (item) {
    let element = document.querySelector(item)
    if(element.style.display === 'none') {
        element.classList.add('scaleUp');
        element.style.display = 'flex';
        setTimeout(() => {element.classList.remove('scaleUp');element.style.scale = '1';element.style.opacity = '1';}, 200)
    }
    else if (element.style.display === 'flex' ) {
        element.style.scale = '0';
        element.style.opacity = '0';
        setTimeout(() => {element.style.display = 'none'}, 200)
        return
    }
    setTimeout(() => {document.addEventListener('click', (e) =>
            {
                if(!element.contains(e.target)) {
                    element.style.scale = '0';
                    element.style.opacity = '0';
                    setTimeout(() => {element.style.display = 'none'}, 200)
                }
            },
        {once: true}
        );
        // xử lý truowngf hợp người dùng vẫn click ở trong element
            element.addEventListener('click', (e) => {
            e.stopPropagation();
            });
        },
        500
    )
}

function stopPropa(event){
    event.stopPropagation()
}
// phần chọn group ở 'thêm mới'
function groupChoose(event) {
    let container = document.querySelector('.groups-choose')
    let content = container.querySelector('.groups-choose-navbar')
    let valid = event.target.closest('.groups-choose>div') === container.querySelector('div')
    if(content.style.display === 'none' && valid ) {
        content.style.display = 'flex'
        calenNavbarMain.style.display = 'none'
        calendarMain.style.display = 'none'
        timeMain.style.display = 'none'
        repeatMain.style.display = 'none'
        tagMain.style.display = 'none'
    }
    else if( valid && content.style.display === 'flex') {
        content.style.display = 'none'
    }
}
function focusOnGroups(status){
    let container = document.querySelector(`.groups-choose-navbar-addGroup`)
    let icon = container.querySelector('span')
    setTimeout(() => {
    if(status === 'true') {
        icon.style.display = 'none'
    }
    else {
        icon.style.display = 'block'
    }
},1000)
}
let isGroupDupl = []
function addGroups(){
    let container = document.querySelector(`.groups-choose-navbar`)
    let contain = container.querySelector('.groups-choose-navbar-addGroup')
    let input = container.querySelector('input')
    let newTag = document.createElement('p');
    let flatMapp = currentTab.flatMap(itm => itm.group)
    let valid = input.value.trim() && input.value.length < 20 && !isGroupDupl.includes(input.value.trim()) && !flatMapp.includes(input.value.trim())
    if(valid){
        newTag.setAttribute('data-isChoosed', 'false')
        newTag.innerHTML = input.value + '<span ><i class="fa-solid fa-check"></i></span>'
        isGroupDupl.push(input.value.trim())
        newTag.setAttribute('style', "border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;")
        container.insertBefore(newTag, contain);
        newTag.setAttribute('onclick',`choosedGroup(this)`)
        input.value = ''
    }
}

function choosedGroup(itemed){
    let div = document.querySelector('.groups-choose div')
    let content = document.querySelector('.groups-choose div p')
    let container = document.querySelector('.groups-choose-navbar')
    let array =  [...container.querySelectorAll('.groups-choose-navbar p')];
    let itemStatus = itemed.getAttribute('data-isChoosed')
    if(itemStatus === 'false') {
        for(let i = 0; i< array.length;i++){
            array[i].style.background = 'white'
            array[i].style.color = '#4D5761'
            array[i].setAttribute('data-isChoosed','false')
            array[i].querySelector('span').style.display = 'none'
            addHover(array[i])
        }
        itemed.style.color = '#EF6820'
        itemed.style.background = '#FEFAF5'
        itemed.setAttribute('data-isChoosed','true')
        itemed.querySelector('span').style.display = 'block'
        content.innerText = itemed.innerText
    }
    else if (itemStatus === 'true') {
        itemed.style.color = '#4D5761'
        itemed.style.background = 'white'
        itemed.setAttribute('data-isChoosed','false')
        itemed.querySelector('span').style.display = 'block'
        content.innerText = 'Khác'
    }
    if(div.innerText === 'Khác') {
        div.style.background = 'white'
        div.style.color = '#4D5761'
    }
    else {
        div.style.background = '#FEFAF5'
        div.style.color = '#EF6820'
    }
}

function addHover(element){
    let span = element.querySelector('span')
    element.addEventListener('mouseover', function() {
    if(element.getAttribute('data-isChoosed') === 'false')
        {
            element.style.background = '#FEFAF5'
            element.style.color = '#EF6820'
            span.style.display = 'block'
        }

});

element.addEventListener('mouseout', function() {
    if(element.getAttribute('data-isChoosed') === 'false')
        {
            element.style.background = 'white'
            element.style.color = '#4D5761'
            span.style.display = 'none'
        }
});
}
// Phần note: ghi chú
function hideOption(item) {
    item._hideTimer = setTimeout(() => {item.style.display = 'none'},500)
}

function showOption(container) {
    let element = container.querySelector('div')
    if (container._hideFunc) {
        container.removeEventListener('mouseleave', container._hideFunc);
    }
    if (element._hideTimer){
        clearTimeout(element._hideTimer)
    }
    // hideFunc = () => hideOption(element)
    container.addEventListener('mouseleave',container._hideFunc = () => hideOption(element));
    container.contains(event.relatedTarget)
    element.style.display = 'block'
}

function hideModi(item) {
    let child = item.querySelector('div')
    item._hideModiTimer = setTimeout(() => {
        child.style.transform = 'scale(0)'
        child.style.opacity = '0'
        setTimeout(() => {child.style.display = 'none' ;item.style.display = 'none' }, 200 )
    },500)
}

function showModi(item,container) {
    let containerr = document.querySelector(container)
    let child = item.querySelector('div')
    clearTimeout(item._hideTimer)
    item._hideTimer = null
    containerr.removeEventListener('mouseleave',containerr._hideFunc);
    containerr._hideFunc = null
    item.style.display = 'block'
    child.classList.add('addShoweffect')
    setTimeout(() => {child.style.transform = 'scale(1)';child.style.opacity = '1';child.classList.remove('addShoweffect')} ,10)
    child.style.display = 'flex'
    if(item._hideModiFunc) {
        item.removeEventListener('mouseleave',item._hideModiFunc);
    }
    item.addEventListener('mouseleave',item._hideModiFunc = () => hideModi(item));
}

function showChild(item,container) {
    let parent = item.parentElement?.closest('div');
    let containerr = document.querySelector(container)
    clearTimeout(parent._hideModiTimer)
    parent._hideModiTimer = null
    containerr.removeEventListener('mouseleave', parent._hideModiFunc);
    parent._hideModiFunc = null
    item.style.display = 'flex'
    item.addEventListener('mouseleave', () => hideModi(parent));
}

// Phần note xử lý scroll
function scrollHandle(element) {
    let item = document.querySelector('.note-input')
    if(item) {
        let scrollTop = element.scrollTop
        item.style.bottom = (-scrollTop + 8)  + 'px'
    }
}

// phần note:xử lý auto resize của textarea

function autoResize(){
    let text = document.getElementById('textarea')
    if(text.scrollHeight > 30){
        text.style.height = 'auto'
        text.style.height = text.scrollHeight + 'px'
    }
    if (text.value.length === 0) {
        text.style.height = '20px'
    }
}
function editFunc(item) {
    let clickedElement = item.closest('.note-content-body').querySelector('.note-body--text');
    let container = item.closest('.note-content-body')
    let getClass = container.className
    let getID = parseInt(getClass.match(/\d+/g)[0],10)
    let textContainer = document.querySelector('.note-input');
    let textArea = textContainer.querySelector('textarea');
    let icon = document.querySelector('.note-input>div>div');
    textArea.value = clickedElement.innerText
    textArea.focus()
    icon.style.height = '23px'
    if(!clickedElement.getAttribute('data-id')) {
        clickedElement.setAttribute('data-id', getID)
        // console.log('đã thêm id', getID)
    }
    textArea.setAttribute('editingID',clickedElement.getAttribute('data-id'))
    autoResize(textArea);
}
function editCancel() {
    let text = document.getElementById('textarea')
    let icon = document.querySelector('.note-input>div>div');
    icon.style.height = '0'
    text.removeAttribute('editingID')
}

// Phanaf note:chức năng của nút post
let noteData = [
    {
        date: '28/9/2025',
        content : [
            {
                isEditing: false ,
                content : ' Nội dung mẫu ',
                time : ' this is time',
            }
            ,
        ]
    }
]

function renderNote(noteData) {
    currentTab = null
    window.addEventListener('keydown', e => {
        if(e.key === 'Enter'){
            let text = document.getElementById('textarea')
            e.preventDefault()
            text.focus()
        }
    })
    if(noteData.length === 0) {
    return `
        <div class="content-note" style="flex: 1;position: relative;display: flex;flex-direction:column;gap: 16px;color:#0D121C">
                <div class="note-header" style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
                    <div style="display: flex;flex-direction: row;gap: 16px">
                        <h3> Ghi chú </h3>
                    </div>
                </div>
                <hr>
                <div class="note-body" style="flex: 1;display: flex;flex-direction: column;max-height: 80vh;">
                    <div style="flex: 1;width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;justify-content: center">
                        <img src="/LandingPage/LandingPage2/asset/noteEmpty.png" alt="">
                    </div>
                </div>
                <div class="note-input" style="background: white;max-width:100vw;padding:12px;position: absolute;bottom:2%;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);width: 100%;border-radius: 16px;display: flex;flex-direction: row;justify-content: space-between ">
                    <div style="flex: 1;color: #4D5761">
                        <div style="display: block;height: 0"><i style="margin-right: 6px;" class="fa-solid fa-pen"></i> Chỉnh sửa <i onclick="editCancel()" style="color:red;margin-left:8px;font-size:14px;cursor: pointer" class="fa-solid fa-circle-xmark"></i></div>
                        <textarea id="textarea" oninput="autoResize()" 
                        onkeydown="
                        if(event.key === 'Enter' && event.shiftKey){
                            let text = document.getElementById('textarea')
                            text.value += '\\n';
                            autoResize()
                        }
                        else if(event.key === 'Enter'){notePush(event)}
                        "  style="height: 20px;width: 100%;padding-top: 5px;font-size: 14px;flex: 1;border: none;outline: none;min-height: 20px;max-height: 200px;resize: none;overflow: hidden;overflow-y: auto;" ></textarea>
                    </div>
                    <i onclick="notePush(event)" style="align-self: end;font-size: 28px;cursor: pointer" class="fa-solid fa-circle-chevron-up"></i>
                </div>
        </div>
        `
    }
    let empty = noteData.find(item =>item.content.length === 0)
    if(empty){
        let index = noteData.indexOf(empty)
        noteData.splice(index, 1)
    }
    let noteNumb = 1
    noteData.forEach(element => {
        element.content.forEach( itm => {
            itm.id = noteNumb++
        } )
    });
    noteNumb = 0
    return `
        <div class="content-note" style="flex: 1;position: relative;display: flex;flex-direction:column;gap: 16px;color:#0D121C">
                <div class="note-header" style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
                    <div style="display: flex;flex-direction: row;gap: 16px">
                        <h3> Ghi chú </h3>
                    </div>
                </div>
                <hr>
                <div class="note-body" style="display: flex;flex-direction: column;max-height: 80vh;">
                ${noteData.map((item,numb) => {
                    return `
                        <div style="display: flex;flex-direction: column;gap: 12px;${numb === noteData.length-1 ? 'padding-bottom:66px' : '' } ">
                            <p style="padding: 24px;text-align: center;font-size: 14px;font-weight: 450;color : #0D121C">${item.date}</p>
                            ${item.content.map((itemm) => {
                                noteNumb++
                                return `
                            <div onmouseenter="showOption(this)" class="note-content-body note-body-content-${noteNumb}" style="position: relative;">
                            <div onmouseenter="showModi(this,'.note-body-content-${noteNumb}')"  style="display: none;position: absolute;left: -38px;padding: 6px 8px;border-radius: 99px;background: #E5E7EB">
                                <i class="fa-solid fa-ellipsis"></i>
                                <div class="note-body--modify" onmouseenter="showChild(this,'.note-body-content-${noteNumb} div')" style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);padding:4px;display: none;flex-direction: column;justify-content: space-evenly;position: absolute;background: white;height: 84px;width: 120px;border-radius: 8px;top: 120%;left: 22px">
                                    <p onclick="editFunc(this)" style="padding: 8px;display: flex;flex-direction: row;align-items: center;gap: 10px;cursor: pointer;border-radius: 8px">
                                        <i class="fa-solid fa-pencil"></i>
                                        chỉnh sửa
                                    </p>
                                    <p onclick='noteDelete(this)' style="padding: 8px;display: flex;flex-direction: row;align-items: center;gap: 10px;cursor: pointer;border-radius: 8px">
                                        <i class="fa-solid fa-trash"></i>
                                        Xoá
                                    </p>
                                </div>
                            </div>
                            <div onmouseenter="this.style.background = '#E5E7EB'" onmouseleave="this.style.background = '#F5F5F5'" class="note-body--text-container"  style="padding: 12px;background: #F5F5F5;border-radius:8px;display: flex;flex-direction: column;gap: 4px;font-size: 17px ">
                                <p class="note-body--text" style="line-height: 28px;display: flex;flex-wrap: wrap;overflow-wrap: break-word;word-wrap:break-word;word-break: break-all;">
                                    ${itemm.content}
                                </p>
                                <p class="note-body-content-time" style="text-align: right;font-size: 12px"> ${itemm.time}</p>
                            </div>
                        </div>                                    
                                `
                    }).join('')}
                        </div>    
                    `
                }).join('')}
                </div>
                <div class="note-input" style="background: white;max-width:100vw;padding:12px;position: absolute;bottom:2%;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);width: 100%;border-radius: 16px;display: flex;flex-direction: row;justify-content: space-between ">
                    <div style="flex: 1;color: #4D5761">
                        <div style="display: block;height: 0"><i style="margin-right: 6px;" class="fa-solid fa-pen"></i> Chỉnh sửa <i onclick="editCancel()" style="color:red;margin-left:8px;font-size:14px;cursor: pointer" class="fa-solid fa-circle-xmark"></i></div>
                        <textarea id="textarea" 
                        onclick = "if(!this.value.trim()) {this.value = ''}"
                        oninput="autoResize()" 
                        onkeydown="
                        if(event.key === 'Enter' && event.shiftKey){
                            let text = document.getElementById('textarea')
                            text.value += '\\n';
                            autoResize()
                        }
                        else if(event.key === 'Enter'){notePush(event)}
                        " 
                        style="height: 20px;width: 100%;padding-top: 5px;font-size: 14px;flex: 1;border: none;outline: none;min-height: 20px;max-height: 200px;resize: none;overflow: hidden;overflow-y: auto;" >
                        </textarea>
                    </div>
                    <i onclick="notePush(event)" style="align-self: end;font-size: 28px;cursor: pointer" class="fa-solid fa-circle-chevron-up"></i>
                </div>
        </div>                       
    `
}

function getDate() {
    let raw = new Date()
    return raw.toLocaleDateString("vi-VN")
}
function getTime() {
    let raw = new Date()
    return `${raw.getHours()}:${raw.getMinutes()}`
}
let flag = false
function notePush(event) {
    event.target.onclick = null;
    if (flag){return}
    let text = document.getElementById('textarea')
    let currentContentID = document.getElementById('textarea').getAttribute('editingID')
    if(currentContentID && text.value.trim() !== '' ) {
        let element = document.querySelector(`[data-id = '${currentContentID}']`)
        let container= element.closest('.note-content-body')
        let getFullClass = container.className
        let getDataID = parseInt(getFullClass.match(/\d+/g)[0],10)
        element.innerText = text.value
        noteData.forEach(item => {
            item.content.forEach(itemm => {
                if(itemm.id === getDataID ){
                    itemm.content = text.value
                }
            })
        })
        editCancel()
        text.value = ''
        autoResize()
    }
    else if (text.value.trim() !== '') {
        let getCurrentDate = noteData.find(item => item.date.trim() === getDate())
        if(getCurrentDate && text.value !== '') {
            let newwItem = {
                isEditing: false,
                content: text.value.replace(/\n/g, '<br>'),
                time : getTime(),
            }
            getCurrentDate.content.unshift(newwItem)
            dataCheck(renderNote(noteData))
        }
        else if(!getCurrentDate && text.value.trim() !== '') {
            let newwItem = {
                date: getDate(),
                content : [
                    {
                        isEditing: false,
                        content:text.value.replace(/\n/g, '<br>'),
                        time: getTime(),
                    },
                ]
            }
            noteData.unshift(newwItem)
            dataCheck(renderNote(noteData))
        }
    }
    flag = true
    setTimeout(() =>{event.target.onclick = notePush;flag = false} , 2000)
    console.log(noteData)
}

function noteDelete(item) {
    let noteBody = document.querySelector('.note-body')
    let noteDiv = noteBody.querySelector('div')
    let container= item.closest('.note-content-body')
    let getFullClass = container.className
    let getDataID = parseInt(getFullClass.match(/\d+/g)[0],10)
    container.style.transition = 'all ease 0.8s'
    container.style.opacity = '0'
    container.style.height = container.scrollHeight+ 'px'
    container.style.transform = 'translateX(100vw)'
    noteDiv.style.gap = '0'
    setTimeout(() => {
        container.style.height = '0'
    }
    ,300)
    setTimeout(() =>{
        noteDiv.style.gap = '12px'
        container.style.display = 'none'
    },1100)
    noteData.forEach(item => {
        item.content = item.content.filter(itemm =>
            itemm.id !== getDataID
        )
    })
    renderNote(noteData)
    setTimeout(() =>{
        dataCheck(renderNote(noteData));
    },800)
    editCancel()
}


// phần thùng rác
let recycleBin = []
function renderRecycleBin(array){
currentTab = null
if(recycleBin.length === 0){
    return `
        <div style="display: flex;width: 397px;height: 248px;margin: auto;flex-direction: column;gap: 24px;align-items: center;">
            <img src="/LandingPage/LandingPage2/asset/thungrac.png" height="228" width="188"/>
        </div>
    `
}
console.log(array)
    return `
<div id="recycleBinPopUp" style="display:none;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);border-radius: 8px;flex-direction: column;position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);background: white;height: auto;width: 357px;">
    <div style="margin-left: 20px;display: flex;flex-direction: row;justify-content: left;space-evenly;align-items: center;height: 80px;gap: 20px;">
        <i style="color: #F04438;padding: 8px;background-color: #FEF3F2;border-radius: 8px;" class="fa-solid fa-circle-exclamation"></i>
        <div style="flex: 1;display: flex;flex-direction: column;gap: 8px;">
            <p style="font-weight: 500;font-size: 18px;">Dọn dẹp thùng rác</p>
            <p style="color: #4D5761;">Các mục sẽ được xóa vĩnh viễn</p>
        </div>
    </div>
    <div style="display: flex;flex-direction: row;justify-content: space-evenly;align-items: center;height: 80px;">
        <button onclick='deleteBinItems(undefined,"hủy")' style="border: none;border-radius: 8px;padding: 10px ;width: 150px;font-size: 14px;">
            hủy
        </button>
        <button onclick='deleteBinItems(undefined,"xóa toàn bộ")' style="border: none;border-radius: 8px;padding: 10px;width: 150px; background: #F04438;color: white;font-size: 14px;">
            Dọn dẹp
        </button>
    </div> 
</div>
<div class="content-bin" style="flex: 1;position: relative;display: flex;flex-direction:column;gap: 20px;color:#0D121C;">
    <div class="bin-header" style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
        <div style="display: flex;flex-direction: column;gap: 8px;width: 100%">
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100% ">
                <div style="display: flex;flex-direction: row;align-items:center;gap: 16px">
                    <h3> Thùng rác </h3>
                    <i onclick='deleteBinItems()' style="cursor:pointer;color: #F04438" class="fa-solid fa-trash-can"></i>
                </div>
                <p style="height: 32px;width:34px;justify-content: center;color: #EF6820;font-weight: 500;text-align: center;display: flex;align-items: center;border-radius: 8px;background: #FEF6EE">${array.length}</p>
            </div>
            <p style="font-weight: 400;font-size: 12px;border-radius: 8px;padding: 12px 8px;background: #FEF6EE"> <i style="margin-right: 5px;color: #EF6820" class="fa-solid fa-triangle-exclamation"></i> Toàn bộ dữ liệu sẽ bị xoá vĩnh viễn sau 30 ngày</p>
        </div>
    </div>
    <hr style="color: #F38744">
    <div class="bin-content" style="color:#9DA4AE; display: flex;flex-direction: column;gap: 8px;margin-top: -8px; ">
        ${array.map((item,number) => 
        { 
        item.id = number
        return `
        <div class= 'bin-content-items num-${number}' onclick="displayBinModifier(this)" style="display: flex;flex-direction: column;gap: 8px;">
            <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                    <div style="display: flex;justify-content:space-between ;">
                        <div>
                            <p style="font-weight: bold;margin-bottom: 4px">${item.from}</p>
                            <p style="font-size: 12px;color:#9DA4AE">${item.content.content}</p>
                        </div>
                        <div style="display: flex;flex-direction: row;gap: 8px;position: relative">
                            <i style="position: absolute;transition: all 0.5s ease;" class="star-cc fa-regular fa-star"></i>
                            <i onclick="stopPropa(event);binNavbar(this)" style="cursor: pointer;display: none;color: #121212" class="bin-content--modifier fa-solid fa-ellipsis"></i>
                            <div onclick="stopPropa(event)" style="border-radius:8px;cursor: pointer;display: none;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);width: 120px;position: absolute;flex-direction: column;border: 1px solid #F3F4F6;border-radius: 8px;top: 60%;left: -100px;background: white">
                                <p onclick="deleteBinItems(this,'recover')" onmouseleave="this.style.background= 'white'" onmouseenter =" this.style.background = '#D2D6DB'" style="border-radius:8px;font-size: 14px;color: #0D121C;padding: 8px 12px"> <i style="margin-right: 5px" class="fa-solid fa-trash-can-arrow-up"></i> Khôi phục</p>
                                <p onclick="deleteBinItems(this)" onmouseleave="this.style.background= 'white'" onmouseenter =" this.style.background = '#D2D6DB'" style="border-radius:8px;font-size: 14px;color: #0D121C;padding: 8px 12px"> <i style="border-radius:8px;margin-right: 5px" class="fa-solid fa-delete-left"></i> dọn dẹp</p>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;gap:8px">
                         ${item.content.tag.map(itm => `
                             <p style="padding: 4px 12px;font-size: 12px;color:#D2D6DB;background: #F5F5F5;border-radius: 8px">${itm}</p>
                         `).join('')}
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                        <i style="color: #9DA4AE" class="fa-solid fa-calendar"></i>
                        <p style="color: #9DA4AE" class="date">${item.content.date} - ${item.content.time}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join('<hr>') 
    }
    </div>
</div>
    `
}
function deleteBinItems(item,func){
    let popUp = document.getElementById('recycleBinPopUp')
    if(func === 'recover' && item) {
        let container = item.closest('.bin-content-items')
        let getID = parseInt(container.className.match(/\d+/g).toString())
        let element = recycleBin.find(itm => itm.id === getID)
        let array =  dataList[element.from]
        let relocate = array.find(item => item.group === element.name)
        if(relocate){
            relocate.content.splice(element.index,0,element.content)
            recycleBin.splice(0,recycleBin.length,...recycleBin.filter(item => item.id !== getID))
        }
        else {
            let newValue = {
                group:element.name,
                content :[element.content]
            }
            array.unshift(newValue)
            recycleBin.splice(0,recycleBin.length,...recycleBin.filter(item => item.id !== getID))
        }
        container.style.transition = 'all 0.5s ease-in';
        container.style.background = '#F04438'
        container.style.transform = 'translateY(-260px)';
        container.style.opacity = '0';
        dataCheck(renderRecycleBin(recycleBin))
        return
    }
    if(item){
        let container = item.closest('.bin-content-items')
        let getID = parseInt(container.className.match(/\d+/g).toString())
        container.style.transition = 'all 0.3s ease-in';
        container.style.background = '#F04438'
        container.style.transform = 'translateY(360px)';
        container.style.opacity = '0';
        recycleBin = recycleBin.filter(itm => itm.id !== getID)
        dataCheck(renderRecycleBin(recycleBin))
        return
    }
    popUp.style.display = 'flex'
    popUp.style.opacity = '0'
    popUp.style.zIndex = '99'
    setTimeout(() =>{popUp.style.opacity = '1'},200 )
    if(func === 'hủy'){
        popUp.style.opacity = '0'
        popUp.style.zIndex = '-9'
        setTimeout(() =>{popUp.style.display = 'none'},200 )
    }
    else if(func === 'xóa toàn bộ'){
        popUp.style.opacity = '0'
        popUp.style.zIndex = '-9'
        setTimeout(() =>{popUp.style.display = 'none'},200 )
        recycleBin = []
        dataCheck(renderRecycleBin(recycleBin))
    }
}
function pushRecycleBin(from,name,index,content) {
    recycleBin.unshift(
        {
            from: from,
            name :name,
            index:index,
            content:content,
        }
    )
}
function displayBinModifier(item) {
    let icon = item.querySelector('.bin-content--modifier');
    let star = item.querySelector('.fa-star');
    if(icon.style.display === 'none'){
        icon.classList.add('displayBinModifier')
        setTimeout(() =>{ star.classList.remove('star-cc') ; star.classList.add('star-move')},100)
        setTimeout(() => {icon.style.display = 'block'},200)
        setTimeout(() => {icon.classList.remove('hideBinModifier'); },100)
    }
    else if (icon.style.display === 'block') {
        star.classList.remove('star-move')
        star.classList.add('star-cc')
        icon.classList.remove('displayBinModifier')
        icon.classList.add('hideBinModifier')
        setTimeout(() => {icon.style.display = 'none'},150)
    }
}

function binNavbar (item){
    let content = item.parentElement?.querySelector('div')
    if(content.style.display === 'none'){
        content.style.opacity = '0'
        content.style.transform = 'scale(0)'
        content.style.display = 'flex'
        setTimeout(() => {content.style.opacity= '1';content.style.transform = 'scale(1)'}, 200)
    }
    else  {
        content.style.opacity = '0'
        content.style.transform = 'scale(0)'
        setTimeout(() => {content.style.display = 'none'}, 200)
    }
    document.addEventListener('click', (e) => {
        if(e.target !== content && e.target !== e.currentTarget){
            content.style.opacity = '0'
            content.style.transform = 'scale(0)'
            setTimeout(() => {content.style.display = 'none'}, 200)
        }
    }, {once: true})
}


// Xử lý dữ liệu và hiển thị, lưu trữ mảng các object thông tin để render HTML
let test = [1,2]
// Phần : Tất cả
function renderGroup(todoInf) {
    return `
        <div style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
            <div style="display: flex;flex-direction: row;gap: 16px">
                <h3> ${todoInf.group} </h3>
                <button onclick="addSpeciGroup(event)" style="border: none;outline: none;background:none;"><i style="color: #EF6820;font-size: 14px" class="fa-solid fa-plus"></i></button>
            </div>
            <p style="padding: 8px 16px;background:#FEF6EE;color:#EF6820;font-weight:600">${todoInf.content.length}</p>
        </div>
    `
}

function renderTodoList(todoInf,num){
    return `
            <div onclick="clickToModify(this,event,true,'.dupDel-${num}',data);clickToEdit(event)" class="parent" style="display: flex;flex-direction: column;gap: 8px">
                        <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                            <img alt="..." onclick="colorToFinish(event,data);stopPropa(event)" style="cursor: pointer;" src="${todoInf.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${todoInf.choosing?'20' : '28'}" width="${todoInf.choosing? '20' : '28'}"/>
                            <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                                <div style="display: flex;justify-content:space-between ;">
                                    <div>
                                        <p style="font-weight: bold;margin-bottom: 4px">${todoInf.title}</p>
                                        <p style="font-size: 12px;color:#9DA4AE">${todoInf.content}</p>
                                    </div>
                                    <div style="position: relative;">
                                        <i style="${todoInf.star? `color:#EF6820` : 'color:black'}" onclick="colorChange(event,data);stopPropa(event)"  class="${todoInf.star? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        <div class="dupDel-${num} parent-options" style="z-index: 1000;position: absolute;right: 0;width: 153px;height: 96px;padding: 8px;display: none;flex-direction: column;background: white;justify-content: space-between;border: 2px solid #F3F4F6;border-radius: 6px;color: #4D5761">
                                            <p onclick='duplicateHandle(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;padding: 8px"><i style="margin-right: 6px" class="fa-solid fa-clone"></i> Nhân đôi</p>
                                            <p onclick='toDoDelete(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;;padding: 8px"><i class="fa-solid fa-trash-can"></i> Xoá</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    ${todoInf.tag.map(item => {return `<p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${item}</p>`}).join('')}
                                </div>
                                ${todoInf.repeat
                                ? 
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #F04438" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,data)" style="color: #F04438 " class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                :   
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #9DA4AE" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,data)" style="color: #9DA4AE" class="date">${todoInf.date} - ${todoInf.time} </p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                }
                            </div>
                        </div>
                    </div>
    `
}

function renderContent(data){
    let num = 0
    let button = document.querySelector('.toggleDisplay');
    data.forEach((item) => {
        if(item.content.length === 0 ){
            data.splice(0,data.length,...data.filter(item => item.content.length > 0))
        }
        } )
    if(data.length === 0){
        return `
            <div style="width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;">
        <img src="/LandingPage/LandingPage2/asset/Group 26810.png" alt="">
        <div style="display: flex;flex-direction: column;align-items: center;flex: 1;justify-content: space-between;">
            <p style="font-size: 24px;color: #4D5761;font-weight: 500;margin: 0;"> Tạo danh sách việc cần làm !</p>
        </div>
    </div>
        `
    }
    return `
    ${data.map((item,number) => {return `
        <div style='width:${button.getAttribute('data-status') === 'left'? '100%' : '30%'};height:auto;transition:  width 1s ease, height 1s ease;' class="content-body--${number+1} content-body--container">
            ${renderGroup(item)}
            <hr>
            <div style="display: flex;flex-direction: column;gap: 8px;">
            ${item.content.map((itemm) => {return `
                ${( () => {
                    num++
                    itemm.id = num
                    return renderTodoList(itemm,num)
                })()
    }
            `}).join('<hr>')
}
            </div>
        </div>
    `}).join('')}
`
}
let content = document.getElementById('content')
// Phần dataCheck
let currentTab
let dataListToString
function dataCheck(contentt,tab,toString) {
    let star = document.getElementById('star')
    // cập nhật dữ liệu của mục group thanh bên phải
    if(tab){
        currentTab = tab
        previous = currentTab
        star.classList.remove('fa-solid')
        star.classList.add('fa-regular');
        star.style.color = 'black'
        tagsFilter = null
        tagTempoValue = null
        // reset lại mục nhóm và thẻ ở trong phần popup thêm mới
        // setTimeout(()=>renderForAddTodo(),1000)
        // resetDataAddSection()
    }
    // reset lại mục nhóm và thẻ ở trong phần popup thêm mới
    setTimeout(()=>renderForAddTodo(),1000)
    resetDataAddSection()
    //
    renderNavbarGroup()
    renderTagLists()
    if(toString) {
        dataListToString = toString
    }
     setTimeout(()=>
        content.innerHTML = contentt
    , 400)
    if(filterMode ) {
        filteredStatus = true
    }
}

function toDoDelete(itemm){
    let bigContainer = itemm.closest('.content-body--container')
    let body = document.querySelector('.content-body');
    // document.getElementById('content').style.flex = 'none'
    bigContainer.style.height = 'auto'
    let container = itemm.closest('.parent')
    container.style.height = (container.scrollHeight ) + 'px'
    container.style.transition = 'all ease 0.5s'
    container.style.opacity = '0'
    container.style.marginTop = '-15px'
    setTimeout(() =>container.style.height = '0' ,200)
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    // setTimeout(()=>{body.style.flexFlow = 'column wrap'},500)
    setTimeout(() => {
        data.forEach((item) => {
            let deleteItem = item.content.find((itemm) => itemm.id === getID)
            let index = item.content.findIndex(item => item.id ===getID)
            let name = item.group
            if(deleteItem){
                item.content = item.content.filter((itemm) => itemm.id !== getID)
                pushRecycleBin(dataListToString,name,index,deleteItem)
            }
            // if(item.content.length === 0){
            //     bigContainer.style.opacity = '0'
            //     data.splice(0,data.length,...data.filter(item => item.content.length > 0))
            // }
        } )
        dataCheck(renderContent(data))
        renderForAddTodo()
    },200)
    console.log(data)
}
function duplicateHandle(item){
    let container = item.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedGroup = data.find(item => item.content.find(itemm => itemm.id === getID))
    data.forEach(itm => {
        let choosedItem = itm.content.find(itmm => itmm.id === getID)
        let index = itm.content.findIndex(itemm => itemm.id === getID)
        if(choosedItem) {
            let duplicatedItem = JSON.parse(JSON.stringify(choosedItem));
            choosedGroup.content.splice(index +1,0,duplicatedItem)
        }
    })
    dataCheck(renderContent(data))
}

// Phần : Hôm nay

function renderTodayGroup(todoInf) {
    return `
        <div style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
            <div style="display: flex;flex-direction: row;gap: 16px">
                <h3> ${todoInf.group} </h3>
                <button onclick="addSpeciGroup(event)" style="border: none;outline: none;background:none;"><i style="color: #EF6820;font-size: 14px" class="fa-solid fa-plus"></i></button>
            </div>
            <p style="padding: 8px 16px;background:#FEF6EE;color:#EF6820;font-weight:600">${todoInf.content.length}</p>
        </div>
    `
}

function renderTodayList(todoInf,num){
    return `
            <div onclick="clickToModify(this,event,true,'.dupDel-${num}',todayData);clickToEdit(event)" class="parent" style="display: flex;flex-direction: column;gap: 8px">
                        <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                            <img alt="..." onclick="colorToFinish(event,todayData);stopPropa(event)" style="cursor: pointer;" src="${todoInf.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${todoInf.choosing?'20' : '28'}" width="${todoInf.choosing? '20' : '28'}"/>
                            <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                                <div style="display: flex;justify-content:space-between ;">
                                    <div>
                                        <p style="font-weight: bold;margin-bottom: 4px">${todoInf.title}</p>
                                        <p style="font-size: 12px;color:#9DA4AE">${todoInf.content}</p>
                                    </div>
                                    <div style="position: relative;">
                                        <i style="${todoInf.star? `color:#EF6820` : 'color:black'}" onclick="colorChange(event,todayData);stopPropa(event)"  class="${todoInf.star? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        <div class="dupDel-${num} parent-options" style="z-index: 1000;position: absolute;right: 0;width: 153px;height: 96px;padding: 8px;display: none;flex-direction: column;background: white;justify-content: space-between;border: 2px solid #F3F4F6;border-radius: 6px;color: #4D5761">
                                            <p onclick='duplicateTodayList(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;padding: 8px"><i style="margin-right: 6px" class="fa-solid fa-clone"></i> Nhân đôi</p>
                                            <p onclick='todayListDelete(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;;padding: 8px"><i class="fa-solid fa-trash-can"></i> Xoá</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    ${todoInf.tag.map(item => {return `<p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${item}</p>`}).join('')}
                                </div>
                                ${todoInf.repeat
                                ? 
                                `
                                    <div style="position:relative;;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #F04438" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,todayData)" style="color: #F04438 " class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                :   
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #9DA4AE" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,todayData)" style="color: #9DA4AE" class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                 
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                }
                            </div>
                        </div>
                    </div>
    `
}

// ${item.content.length === 0 ? `<div style="color:#EF6820;font-size: 20px;font-style: italic;margin: auto;display: flex;flex-direction: row;gap: 10px;align-items: center"><i class="fa-solid fa-exclamation"></i> &lt; Nhóm này đang trống, vui lòng thêm mới &gt; </div>` :

function renderTodayContent(todayData){
    let num = 0
    let button = document.querySelector('.toggleDisplay');
    todayData.forEach((item) => {
        if(item.content.length === 0){
            todayData.splice(0,todayData.length,...todayData.filter(item => item.content.length > 0))
            }
        } )
    if(todayData.length === 0){
        return `
            <div style="width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;">
        <img src="/LandingPage/LandingPage2/asset/Group 26810.png" alt="">
        <div style="display: flex;flex-direction: column;align-items: center;flex: 1;justify-content: space-between;">
            <p style="font-size: 24px;color: #4D5761;font-weight: 500;margin: 0;"> Tạo danh sách việc cần làm !</p>
        </div>
    </div>
        `
    }
    return `
    ${todayData.map((item,number) => {return `
        <div style='width:${button.getAttribute('data-status') === 'left'? '100%' : '30%'};height:auto;transition:  width 1s ease, height 1s ease;' class="content-body--${number+1} content-body--container">
            ${renderTodayGroup(item)}
            <hr>
            <div style="display: flex;flex-direction: column;gap: 8px;">
            ${item.content.map((itemm) => {return `
                ${( () => {
                    num++
                    itemm.id = num
                    return renderTodayList(itemm,num)
                })()
        }
            `}).join('<hr>')
    }
            </div>
        </div>
    `}).join('')}
`
}

function todayListDelete(itemm){
    let bigContainer = itemm.closest('.content-body--container')
    // document.getElementById('content').style.flex = 'none'
    bigContainer.style.height = 'auto'
    let container = itemm.closest('.parent')
    container.style.height = (container.scrollHeight ) + 'px'
    container.style.transition = 'all ease 0.5s'
    container.style.opacity = '0'
    container.style.marginTop = '-15px'
    setTimeout(() =>container.style.height = '0' ,200)
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    // setTimeout(()=>{body.style.flexFlow = 'column wrap'},500)
    setTimeout(() => {
        todayData.forEach((item) => {
            let deleteItem = item.content.find((itemm) => itemm.id === getID)
            let index = item.content.findIndex(item => item.id ===getID)
            let name = item.group
            if(deleteItem){
                item.content = item.content.filter((itemm) => itemm.id !== getID)
                pushRecycleBin(dataListToString,name,index,deleteItem)
            }
            // if(item.content.length === 0){
            //     bigContainer.style.opacity = '0'
            //     todayData.splice(0,todayData.length,...todayData.filter(item => item.content.length > 0))
            // }
        } )
        dataCheck(renderTodayContent(todayData))
    },200)
    console.log(todayData)
}
function duplicateTodayList(item){
    let container = item.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedGroup = todayData.find(item => item.content.find(itemm => itemm.id === getID))
    todayData.forEach(itm => {
        let choosedItem = itm.content.find(itmm => itmm.id === getID)
        let index = itm.content.findIndex(itmm => itmm.id === getID)
        if(choosedItem) {
            let duplicatedItem = JSON.parse(JSON.stringify(choosedItem));
            choosedGroup.content.splice(index + 1,0,duplicatedItem)
        }
    })
    dataCheck(renderTodayContent(todayData))
}

// Phần 3 ngày tới

function Next3daysGroup(todoInf) {
    return `
        <div style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
            <div style="display: flex;flex-direction: row;gap: 16px">
                <h3> ${todoInf.group} </h3>
                <button onclick="addSpeciGroup(event)" style="border: none;outline: none;background:none;"><i style="color: #EF6820;font-size: 14px" class="fa-solid fa-plus"></i></button>
            </div>
            <p style="padding: 8px 16px;background:#FEF6EE;color:#EF6820;font-weight:600">${todoInf.content.length}</p>
        </div>
    `
}

function Next3DaysContent(todoInf,num){
    return `
            <div onclick="clickToModify(this,event,true,'.dupDel-${num}',next3DaysData);clickToEdit(event)" class="parent" style="display: flex;flex-direction: column;gap: 8px">
                        <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                            <img alt="..." onclick="colorToFinish(event,next3DaysData);stopPropa(event)" style="cursor: pointer;" src="${todoInf.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${todoInf.choosing?'20' : '28'}" width="${todoInf.choosing? '20' : '28'}"/>
                            <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                                <div style="display: flex;justify-content:space-between ;">
                                    <div>
                                        <p style="font-weight: bold;margin-bottom: 4px">${todoInf.title}</p>
                                        <p style="font-size: 12px;color:#9DA4AE">${todoInf.content}</p>
                                    </div>
                                    <div style="position: relative;">
                                        <i style="${todoInf.star? `color:#EF6820` : 'color:black'}" onclick="colorChange(event,next3DaysData);stopPropa(event)"  class="${todoInf.star? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        <div class="dupDel-${num} parent-options" style="z-index: 1000;position: absolute;right: 0;width: 153px;height: 96px;padding: 8px;display: none;flex-direction: column;background: white;justify-content: space-between;border: 2px solid #F3F4F6;border-radius: 6px;color: #4D5761">
                                            <p onclick='Next3DaysDuplicate(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;padding: 8px"><i style="margin-right: 6px" class="fa-solid fa-clone"></i> Nhân đôi</p>
                                            <p onclick='Next3DaysDelete(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;;padding: 8px"><i class="fa-solid fa-trash-can"></i> Xoá</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    ${todoInf.tag.map(item => {return `<p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${item}</p>`}).join('')}
                                </div>
                                ${todoInf.repeat
                                ? 
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #F04438" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,next3DaysData)" style="color: #F04438 " class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                :   
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #9DA4AE" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,next3DaysData)" style="color: #9DA4AE" class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                }
                            </div>
                        </div>
                    </div>
    `
}
// ${item.content.length === 0 ? `<div style="color:#EF6820;font-size: 20px;font-style: italic;margin: auto;display: flex;flex-direction: row;gap: 10px;align-items: center"><i class="fa-solid fa-exclamation"></i> &lt; Nhóm này đang trống, vui lòng thêm mới &gt; </div>` :

function renderNext3DaysContent(next3DaysData){
    let num = 0
    let button = document.querySelector('.toggleDisplay');
    next3DaysData.forEach((item) => {
        if(item.content.length === 0){
            next3DaysData.splice(0,next3DaysData.length,...next3DaysData.filter(item => item.content.length > 0))
            }
        } )
    if(next3DaysData.length === 0){
        return `
            <div style="width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;">
        <img src="/LandingPage/LandingPage2/asset/Group 26810.png" alt="">
        <div style="display: flex;flex-direction: column;align-items: center;flex: 1;justify-content: space-between;">
            <p style="font-size: 24px;color: #4D5761;font-weight: 500;margin: 0;"> Tạo danh sách việc cần làm !</p>
        </div>
    </div>
        `
    }
    return `
    ${next3DaysData.map((item,number) => {return `
        <div style='width:${button.getAttribute('data-status') === 'left'? '100%' : '30%'};height:auto;transition:  width 1s ease, height 1s ease;' class="content-body--${number+1} content-body--container">
            ${Next3daysGroup(item)}
            <hr>
            <div style="display: flex;flex-direction: column;gap: 8px">
            ${item.content.map((itemm) => {return `
                ${( () => {
                    num++
                    itemm.id = num
                    return Next3DaysContent(itemm,num)
                })()
        }
            `}).join('<hr>')
    }
            </div>
        </div>
    `}).join('')}
`
}

function Next3DaysDelete(itemm){
    let bigContainer = itemm.closest('.content-body--container')
    // document.getElementById('content').style.flex = 'none'
    bigContainer.style.height = 'auto'
    let container = itemm.closest('.parent')
    container.style.height = (container.scrollHeight ) + 'px'
    container.style.transition = 'all ease 0.5s'
    container.style.opacity = '0'
    container.style.marginTop = '-15px'
    setTimeout(() =>container.style.height = '0' ,200)
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    // setTimeout(()=>{body.style.flexFlow = 'column wrap'},500)
    setTimeout(() => {
        next3DaysData.forEach((item) => {
            let deleteItem = item.content.find((itemm) => itemm.id === getID)
            let index = item.content.findIndex(item => item.id ===getID)
            let name = item.group
            if(deleteItem){
                item.content = item.content.filter((itemm) => itemm.id !== getID)
                pushRecycleBin(dataListToString,name,index,deleteItem)
            }
        } )
        dataCheck(renderNext3DaysContent(next3DaysData))
    },200)
    console.log(next3DaysData)
}
function Next3DaysDuplicate(item){
    let container = item.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedGroup = next3DaysData.find(item => item.content.find(itemm => itemm.id === getID))
    next3DaysData.forEach(itm => {
        let choosedItem = itm.content.find(itmm => itmm.id === getID)
        let index = itm.content.findIndex(itmm => itmm.id === getID)
        if(choosedItem) {
            let duplicatedItem = JSON.parse(JSON.stringify(choosedItem));
            choosedGroup.content.splice(index + 1,0,duplicatedItem)
        }
    })
    dataCheck(renderNext3DaysContent(next3DaysData))
}

// Phần : 7 ngày tới

function Next7DaysGroup(todoInf) {
    return `
        <div style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
            <div style="display: flex;flex-direction: row;gap: 16px">
                <h3> ${todoInf.group} </h3>
                <button onclick="addSpeciGroup(event)" style="border: none;outline: none;background:none;"><i style="color: #EF6820;font-size: 14px" class="fa-solid fa-plus"></i></button>
            </div>
            <p style="padding: 8px 16px;background:#FEF6EE;color:#EF6820;font-weight:600">${todoInf.content.length}</p>
        </div>
    `
}

function Next7DaysContent(todoInf,num){
    return `
            <div onclick="clickToModify(this,event,true,'.dupDel-${num}',Next7DaysData);clickToEdit(event)" class="parent" style="display: flex;flex-direction: column;gap: 8px">
                        <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                            <img alt="..." onclick="colorToFinish(event,Next7DaysData);stopPropa(event)" style="cursor: pointer;" src="${todoInf.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${todoInf.choosing?'20' : '28'}" width="${todoInf.choosing? '20' : '28'}"/>
                            <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                                <div style="display: flex;justify-content:space-between ;">
                                    <div>
                                        <p style="font-weight: bold;margin-bottom: 4px">${todoInf.title}</p>
                                        <p style="font-size: 12px;color:#9DA4AE">${todoInf.content}</p>
                                    </div>
                                    <div style="position: relative;">
                                        <i style="${todoInf.star? `color:#EF6820` : 'color:black'}" onclick="colorChange(event,Next7DaysData);stopPropa(event)"  class="${todoInf.star? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        <div class="dupDel-${num} parent-options" style="z-index: 1000;position: absolute;right: 0;width: 153px;height: 96px;padding: 8px;display: none;flex-direction: column;background: white;justify-content: space-between;border: 2px solid #F3F4F6;border-radius: 6px;color: #4D5761">
                                            <p onclick='Next7DaysDuplicate(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;padding: 8px"><i style="margin-right: 6px" class="fa-solid fa-clone"></i> Nhân đôi</p>
                                            <p onclick='Next7DaysDelete(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;;padding: 8px"><i class="fa-solid fa-trash-can"></i> Xoá</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    ${todoInf.tag.map(item => {return `<p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${item}</p>`}).join('')}
                                </div>
                                ${todoInf.repeat
                                ? 
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #F04438" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,Next7DaysData)" style="color: #F04438 " class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                :   
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #9DA4AE" id="abcd" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,Next7DaysData)" style="color: #9DA4AE" class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${num} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                }
                            </div>
                        </div>
                    </div>
    `
}
// ${item.content.length === 0 ? `<div style="color:#EF6820;font-size: 20px;font-style: italic;margin: auto;display: flex;flex-direction: row;gap: 10px;align-items: center"><i class="fa-solid fa-exclamation"></i> &lt; Nhóm này đang trống, vui lòng thêm mới &gt; </div>` :

function renderNext7DaysContent(Next7DaysData){
    let num = 0
    let button = document.querySelector('.toggleDisplay');
    Next7DaysData.forEach((item) => {
        if(item.content.length === 0){
            Next7DaysData.splice(0,Next7DaysData.length,...Next7DaysData.filter(item => item.content.length > 0))
            }
        } )
    if(Next7DaysData.length === 0){
        return `
            <div style="width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;">
        <img src="/LandingPage/LandingPage2/asset/Group 26810.png" alt="">
        <div style="display: flex;flex-direction: column;align-items: center;flex: 1;justify-content: space-between;">
            <p style="font-size: 24px;color: #4D5761;font-weight: 500;margin: 0;"> Tạo danh sách việc cần làm !</p>
        </div>
    </div>
        `
    }
    return `
    ${Next7DaysData.map((item,number) => {return `
        <div style='width:${button.getAttribute('data-status') === 'left'? '100%' : '30%'};height:auto;transition:  width 1s ease, height 1s ease;' class="content-body--${number+1} content-body--container">
            ${Next7DaysGroup(item)}
            <hr>
            <div style="display: flex;flex-direction: column;gap: 8px;">
            ${item.content.map((itemm) => {return `
                ${( () => {
                    num++
                    itemm.id = num
                    return Next7DaysContent(itemm,num)
                })()
        }
            `}).join('<hr>')
    }
            </div>
        </div>
    `}).join('')}
`
}

function Next7DaysDelete(itemm){
    let bigContainer = itemm.closest('.content-body--container')
    // document.getElementById('content').style.flex = 'none'
    bigContainer.style.height = 'auto'
    let container = itemm.closest('.parent')
    container.style.height = (container.scrollHeight ) + 'px'
    container.style.transition = 'all ease 0.5s'
    container.style.opacity = '0'
    container.style.marginTop = '-15px'
    setTimeout(() =>container.style.height = '0' ,200)
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    // setTimeout(()=>{body.style.flexFlow = 'column wrap'},500)
    setTimeout(() => {
        Next7DaysData.forEach((item) => {
            let deleteItem = item.content.find((itemm) => itemm.id === getID)
            let index = item.content.findIndex(item => item.id ===getID)
            let name = item.group
            if(deleteItem){
                item.content = item.content.filter((itemm) => itemm.id !== getID)
                pushRecycleBin(dataListToString,name,index,deleteItem)
            }
            // if(item.content.length === 0){
            //     bigContainer.style.opacity = '0'
            //     // Next7DaysData = Next7DaysData.filter(item => item.content.length > 0)
            //     Next7DaysData.splice(0,Next7DaysData.length,...Next7DaysData.filter(item => item.content.length > 0))
            // }
        } )
        console.log(recycleBin)
        dataCheck(renderNext7DaysContent(Next7DaysData))
    },200)
}
function Next7DaysDuplicate(item){
    let container = item.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedGroup = Next7DaysData.find(item => item.content.find(itemm => itemm.id === getID))
    Next7DaysData.forEach(itm => {
        let choosedItem = itm.content.find(itmm => itmm.id === getID)
        let index = itm.content.findIndex(itmm => itmm.id === getID)
        if(choosedItem) {
            let duplicatedItem = JSON.parse(JSON.stringify(choosedItem));
            choosedGroup.content.splice(index + 1,0,duplicatedItem)
        }
    })
    dataCheck(renderNext7DaysContent(Next7DaysData))
}


// Phần filter nếu user tích vào ngôi sao ở các tab
let previous
let filtered

function filterGroup(todoInf) {
    return `
        <div style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
            <div style="display: flex;flex-direction: row;gap: 16px">
                <h3> ${todoInf.group} </h3>
                <button onclick="addSpeciGroup(event)" style="border: none;outline: none;background:none;"><i style="color: #EF6820;font-size: 14px" class="fa-solid fa-plus"></i></button>
            </div>
            <p style="padding: 8px 16px;background:#FEF6EE;color:#EF6820;font-weight:600">${todoInf.content.length}</p>
        </div>
    `
}

function filterContent(todoInf){
    return `
            <div onclick="clickToModify(this,event,true,'.dupDel-${todoInf.id}',previous);clickToEdit(event)" class="parent" style="display: flex;flex-direction: column;gap: 8px">
                        <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                            <img alt="..." onclick="colorToFinish(event,previous);stopPropa(event)" style="cursor: pointer;" src="${todoInf.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${todoInf.choosing?'20' : '28'}" width="${todoInf.choosing? '20' : '28'}"/>
                            <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                                <div style="display: flex;justify-content:space-between ;">
                                    <div>
                                        <p style="font-weight: bold;margin-bottom: 4px">${todoInf.title}</p>
                                        <p style="font-size: 12px;color:#9DA4AE">${todoInf.content}</p>
                                    </div>
                                    <div style="position: relative;">
                                        <i style="${todoInf.star? `color:#EF6820` : 'color:black'}" onclick="colorChange(event,previous);stopPropa(event)"  class="${todoInf.star? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        <div class="dupDel-${todoInf.id} parent-options" style="z-index: 1000;position: absolute;right: 0;width: 153px;height: 96px;padding: 8px;display: none;flex-direction: column;background: white;justify-content: space-between;border: 2px solid #F3F4F6;border-radius: 6px;color: #4D5761">
                                            <p onclick='filterDuplicate(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;padding: 8px"><i style="margin-right: 6px" class="fa-solid fa-clone"></i> Nhân đôi</p>
                                            <p onclick='filterDelete(this)' onmouseleave="this.style.background='white'" onmouseenter="this.style.background='#EF6820'" style="cursor: pointer;border-radius: 8px;;padding: 8px"><i class="fa-solid fa-trash-can"></i> Xoá</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    ${todoInf.tag.map(item => {return `<p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${item}</p>`}).join('')}
                                </div>
                                ${todoInf.repeat
                                ? 
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #F04438" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,previous)" style="color: #F04438 " class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${todoInf.id} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                :   
                                `
                                    <div style="position:relative;display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                        <i style="color: #9DA4AE" class="fa-solid fa-calendar"></i>
                                        <p onclick="stopPropa(event);repeatToggle(event,previous)" style="color: #9DA4AE" class="date">${todoInf.date} - ${todoInf.time}</p>
                                        <div class="click-to-edit-num-${todoInf.id} click-to-edit" onclick="stopPropa(event)" style='background:#FEFAF5;position:absolute;left:-10px;z-index:990;height:32px;width:300px;display:none;opacity:0;flex-direction:row;align-items:center;gap:12px'>
                                            <p style='width:126px;height:100%' > <input onclick="clickAddEventForEdit(event)" oninput="editDate(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.date}'/> </p> 
                                            <p style='width:86px;height:100%'> <input onclick="clickAddEventForEdit(event)" oninput="editTime(event)" style='background:#FEFAF5;width:100%;height:100%;border:none;margin:auto' type="text" placeholder='${todoInf.time}'/> </p> 
                                            <div style='height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center'> 
                                                <i onclick="clickToDoEdit(event)" class="fa-solid fa-tags"></i>
                                                <div class="click-to-edit-list" style='padding: 5px;display:none;position:absolute;top:100%;max-height:100px;background:white;overflow:auto;width:160px'> 
                                                    
                                                </div>
                                            </div> 
                                            <i onclick="confirmChange(event)" onmouseover="this.style.color = 'red';this.style.transform = 'scale(1.5)'"  onmouseout="this.style.color = '#4D5761'; this.style.transform = 'scale(1)';" class="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                ` 
                                }
                            </div>
                        </div>
                    </div>
    `
}

function renderFilterContent(array){
    let button = document.querySelector('.toggleDisplay');
    array.forEach((item) => {
        if(item.content.length === 0 && !item.notAllowDel){
                array.splice(0,array.length,...array.filter(item => item.content.length > 0))
            }
        } )
    if(array.length === 0){
        return `
            <div style="width: 397px;height: 248px;margin: auto;display: flex;flex-direction: column;gap: 24px;align-items: center;">
        <img src="/LandingPage/LandingPage2/asset/Group 26810.png" alt="">
        <div style="display: flex;flex-direction: column;align-items: center;flex: 1;justify-content: space-between;">
            <p style="font-size: 24px;color: #4D5761;font-weight: 500;margin: 0;"> Tạo danh sách việc cần làm !</p>
        </div>
    </div>
        `
    }
    return `
    ${array.map((item,number) => {return `
        <div style='width:${button.getAttribute('data-status') === 'left'? '100%' : '30%'};height:auto;transition:  width 1s ease, height 1s ease;' class="content-body--${number+1} content-body--container">
            ${filterGroup(item)}
            <hr>
            <div style="display: flex;flex-direction: column;gap: 8px;">
            ${item.content.length === 0 ? `<div style="color:#EF6820;font-size: 20px;font-style: italic;margin: auto;display: flex;flex-direction: row;gap: 10px;align-items: center"><i class="fa-solid fa-exclamation"></i> &lt; Nhóm này đang trống, vui lòng thêm mới &gt; </div>` :
            item.content.map((itemm) => {return `
                ${( () => {
                    return filterContent(itemm)
                })()
        }
            `}).join('<hr>')
    }
            </div>
        </div>
    `}).join('')}
`
}

function filterDelete(itemm){
    let bigContainer = itemm.closest('.content-body--container')
    // // document.getElementById('content').style.flex = 'none'
    bigContainer.style.height = 'auto'
    let container = itemm.closest('.parent')
    container.style.height = (container.scrollHeight ) + 'px'
    container.style.transition = 'all ease 0.5s'
    container.style.opacity = '0'
    container.style.marginTop = '-15px'
    setTimeout(() =>container.style.height = '0' ,200)
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    // setTimeout(()=>{body.style.flexFlow = 'column wrap'},500)
    setTimeout(() => {
        previous.forEach((item) => {
            let deleteItem = item.content.find((itemm) => itemm.id === getID)
            let index = item.content.findIndex(item => item.id ===getID)
            let name = item.group
            if(deleteItem){
                item.content = item.content.filter((itemm) => itemm.id !== getID)
                pushRecycleBin(dataListToString,name,index,deleteItem)
            }
            // if(item.content.length === 0){
            //     bigContainer.style.opacity = '0'
            //     // previous = previous.filter(item => item.content.length > 0)
            //     previous.splice(0,previous.length,...previous.filter(item => item.content.length > 0))
            // }
        } )
    },200)
// 

// 
    filterMode = false
    setTimeout(() => {listFilter();filterMode = true},250)
    console.log('deleted!')
}
function filterDuplicate(item){
    let container = item.closest('.parent')
    let getClass = container.querySelector('.parent-options').className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedGroup = previous.find(item => item.content.find(itemm => itemm.id === getID))
    previous.forEach(itm => {
        let choosedItem = itm.content.find(itmm => itmm.id === getID)
        let index = itm.content.findIndex(itmm => itmm.id === getID)
        if(choosedItem) {
            let duplicatedItem = JSON.parse(JSON.stringify(choosedItem));
            duplicatedItem.id++
            choosedGroup.content.splice(index + 1,0,duplicatedItem)
        }
    })
    let number = 1
    previous.forEach(item =>item.content =  item.content.map((itm) => ({
        ...itm,
        id : number++
    })) )
    // dataCheck(renderNext7DaysContent(Next7DaysData))
    filterMode = false
    setTimeout(() => {listFilter();filterMode = true},250)
}
let star = document.getElementById('star')
let filterMode = true
let filteredStatus = true
function listFilter() {
    previous = currentTab
    if(currentTab && !tagsFilter) {
        console.log('filtered currentTab')
        filtered =
            currentTab.filter((item) => item.content.some(itm => itm.star === true))
                .map(itm =>
                ({
                    ...itm,
                    content: itm.content.filter(itmm => itmm.star === true)
                }))

    if(filterMode){
        if(star.classList.contains('fa-solid')) {
            star.classList.remove('fa-solid')
            star.classList.add('fa-regular');
            star.style.color = 'black'
            dataCheck(renderFilterContent(previous))
            filteredStatus = true
        }
        else  {
            star.classList.remove('fa-regular')
            star.classList.add('fa-solid');
            star.style.color = 'rgb(239, 104, 32)'
            dataCheck(renderFilterContent(filtered))
            filteredStatus = false
        }
    }
    else {
        if(filteredStatus){
            dataCheck(renderFilterContent(previous))
        }
        else {
            dataCheck(renderFilterContent(filtered))
        }
    }
    }
    else {
        console.log('tagsFilter case')
        tagsFilter = currentTab.map(item => ({
        ...item,
        content: item.content.filter(child =>
            child.tag.includes(tagTempoValue)
        )
        }))
        .filter(item => item.content.length > 0);
        filtered =
            tagsFilter.filter((item) => item.content.some(itm => itm.star === true))
                .map(itm =>
                ({
                    ...itm,
                    content: itm.content.filter(itmm => itmm.star === true)
                }))
        // if(star.classList.contains('fa-solid')) {
        //     star.classList.remove('fa-solid')
        //     star.classList.add('fa-regular');
        //     star.style.color = 'black'
        //     dataCheck(renderFilterContent(tagsFilter))
        // }
        // else  {
        //     star.classList.remove('fa-regular')
        //     star.classList.add('fa-solid');
        //     star.style.color = 'rgb(239, 104, 32)'
        //     dataCheck(renderFilterContent(filtered))
        // }
        if(filterMode){
        if(star.classList.contains('fa-solid')) {
            star.classList.remove('fa-solid')
            star.classList.add('fa-regular');
            star.style.color = 'black'
            dataCheck(renderFilterContent(tagsFilter))
            filteredStatus = true
        }
        else  {
            star.classList.remove('fa-regular')
            star.classList.add('fa-solid');
            star.style.color = 'rgb(239, 104, 32)'
            dataCheck(renderFilterContent(filtered))
            filteredStatus = false
        }
    }
    else {
        if(filteredStatus){
            dataCheck(renderFilterContent(tagsFilter))
        }
        else {
            dataCheck(renderFilterContent(filtered))
        }
    }
    }
}


// Phần hoàn thành
let finishList = []

function pushFinish(from,name,index,content) {
    finishList.unshift(
        {
            from: from,
            name :name,
            index:index,
            content:content,
        }
    )
}
function renderFinish(array){
    currentTab = null
    return `
<div class="content-finish" style="flex: 1;position: relative;display: flex;flex-direction:column;gap: 20px;color:#0D121C">
    <div class="finish-header" style="display: flex;flex-direction: row;justify-content:space-between;align-items: center;">
        <div style="display: flex;flex-direction: column;gap: 8px;width: 100%">
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100% ">
                <div style="display: flex;flex-direction: row;align-items:center;gap: 16px">
                    <h3> Hoàn thành </h3>
                </div>
                <p style="height: 32px;width:34px;justify-content: center;color: #EF6820;font-weight: 500;text-align: center;display: flex;align-items: center;border-radius: 8px;background: #FEF6EE">${array.length}</p>
            </div>
        </div>
    </div>
    <hr style="height: 1px; border: none;border-top: 2px solid #F38744 ">
    <div class="finish-content" style="color:#9DA4AE; display: flex;flex-direction: column;gap: 8px;margin-top: -8px; ">
        ${array.map((item,num) => {
        item.id = num 
        return `
        <div class = "finish-content-items num-${num}" onclick="displayBinModifier(this)" style="display: flex;flex-direction: column;gap: 8px;">
            <div style="display: flex;flex-direction: row;gap: 8px;padding: 8px;">
                <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                    <div style="display: flex;justify-content:space-between ;">
                        <div style="display: flex;flex-direction:row;gap:12px">
                            <img alt="..." onclick="undoFinish(this);stopPropa(event)" style="cursor: pointer;" src="${item.content.choosing? '../asset/Radio2.png' : '../asset/Radio.png' }" height="${item.content.choosing?'20' : '28'}" width="${item.content.choosing? '20' : '28'}"/>
                            <div style="display: flex;flex-direction:column">
                                <p style="font-weight: bold;margin-bottom: 4px">${item.from} - ${item.name} - ${item.content.title}</p>
                                <p style="font-size: 12px;color:#9DA4AE">${item.content.content}</p>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;gap: 8px;position: relative">
                            <i style="position: absolute;transition: all 0.5s ease;" class="star-cc fa-regular fa-star"></i>
                            <i onclick="stopPropa(event);binNavbar(this)" style="cursor: pointer;display: none;color: #121212" class="bin-content--modifier fa-solid fa-ellipsis"></i>
                            <div onclick="stopPropa(event)" style="cursor: pointer;display: none;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);width: 120px;position: absolute;flex-direction: column;border: 1px solid #F3F4F6;border-radius: 8px;top: 60%;left: -100px;background: white">
                                <p style="font-size: 14px;color: #0D121C;padding: 8px 12px"> <i style="margin-right: 5px" class="fa-solid fa-trash-can-arrow-up"></i> Khôi phục</p>
                                <p style="font-size: 14px;color: #0D121C;padding: 8px 12px"> <i style="margin-right: 5px" class="fa-solid fa-delete-left"></i> dọn dẹp</p>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;gap:8px">
                         ${item.content.tag.map(itm => `
                             <p style="padding: 4px 12px;font-size: 12px;color:#D2D6DB;background: #F5F5F5;border-radius: 8px">${itm}</p>
                         `).join('')}
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;cursor: pointer;">
                        <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                        <i style="color: #9DA4AE" class="fa-solid fa-calendar"></i>
                        <p style="color: #9DA4AE" class="date">${item.content.date} - ${item.content.time}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        }).join('<hr>')
    }
    </div>
</div>
    `
}

function undoFinish(item) {
    let container = item.closest('.finish-content-items')
    let getClass = container.className
    let getID = parseInt(getClass.match(/\d+/g).toString())
    let choosedObj = finishList.find(item => item.id === getID)
    let array = dataList[choosedObj.from]
    let findGroup = array.find(itm => itm.group === choosedObj.name )
    choosedObj.content.choosing = false
    item.setAttribute('src' , '../asset/Radio.png')
    item.style.width = '28px'
    item.style.height = '28px'
    container.style.opacity = '0'
    container.style.height = container.scrollHeight + 'px'
    container.style.marginTop = '-20px'
    setTimeout(() =>container.style.height = '0',100)
    if(findGroup) {
        findGroup.content.splice(choosedObj.index,0,choosedObj.content)
    }
    else {
        let value = {
            group: choosedObj.name,
            content : [choosedObj.content]
        }
        array.unshift(value)
    }
    finishList.splice(0,finishList.length,...finishList.filter(item => item.id !== getID))
    dataCheck(renderFinish(finishList))
}

// lưu các giá trị để làm dynamic key
let dataList = {
    'all' : data,
    'todayData' : todayData,
    'next3DaysData' : next3DaysData,
    'Next7DaysData' : Next7DaysData,
}

// xử lý dữ liệu để hiênr thị cho phần nhóm và thẻ
function renderClone(array) {
    let duplicate = []
    let temporary = []
    array.forEach(item => item.map(itm => temporary.push({ group: itm.group,counter:itm.content.length})) )
    let count
    temporary.forEach(itm => {
        let value = temporary.pop()
        count = value.counter
        if(temporary.some(itm => itm.group === value.group )){
            let tempArr = temporary.filter(itm => itm.group === value.group)
            duplicate.push({group:value.group,counter: tempArr.map(itm => (count += itm.counter))})
            temporary.splice(0,temporary.length,...temporary.filter(itm => itm.group !== value.group))
        }
    })
    return temporary.concat(duplicate)
}

// optimizing version để gom tất cả các dữ liệu và lọc những phần tử trùng nhau cộng dồn vào 1

// let duplicate = [];
// let cloneData = [data, todayData, next3DaysData, Next7DaysData];
// let temporary = [];
//
// function renderClone(array) {
//     // Lấy tất cả phần tử với group và counter
//     array.forEach(item => {
//         item.forEach(itm => {
//             temporary.push({ group: itm.group, counter: itm.content.length });
//         });
//     });
//
//     // Gom nhóm và cộng dồn counter theo group
//     const grouped = temporary.reduce((acc, curr) => {
//         if (!acc[curr.group]) {
//             acc[curr.group] = 0;
//         }
//         acc[curr.group] += curr.counter;
//         return acc;
//     }, {});
//
//     // Chuyển đổi thành mảng duplicate
//     duplicate = Object.entries(grouped).map(([group, counter]) => ({ group, counter }));
//
//     console.log(temporary, duplicate);
// }
//
// renderClone(cloneData);

//  Phần nhóm
function renderNavbarGroup (){
    let content = document.querySelector('.navbar-groups-list')
    if(!currentTab){content.innerHTML = null;return}
    content.innerHTML = `
        ${currentTab.map((itm,number) => `
                <div
                    onmouseout="this.style.background = 'white';this.style.transform = 'scale(1)';
                                let icon = this.querySelector('i')
                                 icon.style.width = '0'
                                " 
                    onmouseover="this.style.background = '#F9FAFB';this.style.transform = 'scale(1.05)';
                                 let icon = this.querySelector('i')
                                 icon.style.width = '18px'
                                 " 
                    class="groupList-items-num-${number} parent" 
                    style="border-radius: 4px;cursor: pointer;display: flex;flex-direction:row ;justify-content: space-between;padding: 4px 8px;height: 36px;align-items: center;border: none">
                    <p style='flex:1'>${itm.group}</p>
                    <div style="display: flex;flex-direction:row;justify-content: end;gap: 8px;align-items: center;overflow-y:hidden;overflow-x: hidden ">
                        <p>${itm.content.length}</p>
                        <i onclick="groupSectionHanle(this)" style="width: 0;font-size: 15px" class="fa-solid fa-ellipsis"></i>
                    </div>
                    
                </div>
                <div class='modifiers num-${number}' style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);margin-bottom:2px;border: 1px solid #F3F4F6;display:none;height: 84px;width:122px;flex-direction: column;border-radius: 8px;margin-left:auto;margin-right:2px">
                    <p onclick='groupsNameModifier(this)' onmouseover='this.style.background = "#EF6820"' onmouseleave='this.style.background = "white"' style="display:flex;flex-direction:row;justify-content:space-evenly;font-size:13px;align-items:center;height:36px;cursor: pointer;border-radius:8px;flex: 1;"><i class="fa-solid fa-pen"></i> Sửa tên</p>
                    <p onclick="groupOptionsDelete(this)" onmouseover='this.style.background = "#EF6820"' onmouseleave='this.style.background = "white"' style="display:flex;flex-direction:row;justify-content:space-evenly;font-size:13px;align-items:center;height:36px;cursor:pointer;border-radius:8px;flex: 1;"> <i class="fa-solid fa-trash"></i> Xóa nhóm</p>
                </div>
        `).join('')}
    `
}

function createGroup() {
    let input = document.querySelector('.navbar-groups input')
        input.style.display = 'block'
        // container.scrollTo({
        //     top: container.scrollHeight,
        //     behavior: 'smooth',
        // })
        input.style.transform = 'scale(0)'
        setTimeout(() =>{input.style.transform = 'scale(1)';input.focus()},100)
}

function groupSectionHanle(item) {
    let container = item.closest('.parent')
    let bar = container.nextElementSibling
    if(bar.style.display === 'none') {
        bar.style.transform = 'scale(0)'
        setTimeout(() => {
            bar.style.transform = 'scale(1)'
            bar.style.display = 'flex'
            bar.scrollIntoView({
                behavior: 'smooth',
            });
        },200)

    }
    else {
        bar.style.transform = 'scale(0)'
        setTimeout(() => {
            bar.style.display = 'none'
        },200)
    }
    setTimeout(() => window.addEventListener('click', (event) => {
        if(!container.contains(event.target)) {
            item.style.width = '0'
            bar.style.transform = 'scale(0)'
            setTimeout(() => {
            bar.style.display = 'none'
            },200)
            }
        },
        {once:true}),
        200)
}
let groupEditing
function groupsNameModifier(item){
    let container = item.closest('.modifiers')
    let getID = parseInt(container.className.match(/\d+/g).toString())
    let contain = document.querySelector(`.groupList-items-num-${getID}`)
    contain.style.border = '2px solid #F3F4F6'
    let input = contain.querySelector('p')
    groupEditing = input.innerText
    input.contentEditable = 'true'
    input.innerText = ''
    input.focus()
    input.style.background = '#EF682024'
    input.style.borderRadius = '3px'
    input.style.height = '20px'
    input.addEventListener('keydown', (e) => {
        let container = input.closest('.parent')
        let getIndex = parseInt(container.className.match(/\d+/g).toString())
        if(e.key === 'Enter' && input.innerText.trim()) {
            currentTab[getIndex].group = input.innerText
            input.contentEditable = 'false'
            input.blur()
            input.style.background = 'none'
            input.style.borderRadius = 'none'
            contain.style.border = 'none'
            input.style.height = '15px'
            renderForAddTodo()
            dataCheck(renderFilterContent(currentTab))
        }
        });
    setTimeout(() => {
    window.addEventListener('click',() => {
        groupsNameModifierHandeClick (input,contain)
    },{once:true})
    }
    ,20
    )
}

function groupsNameModifierHandeClick (input,contain) {
    let container = input.closest('.parent')
    let inputt = container.querySelector('p')
    inputt.innerText = groupEditing
    input.contentEditable = 'false'
    input.blur()
    input.style.background = 'none'
    input.style.borderRadius = 'none'
    contain.style.border = 'none'
    input.style.height = '15px'
    // let getIndex = parseInt(container.className.match(/\d+/g).toString())
    // if(input.innerText.trim() !== '' ){
    //     console.log('hê hê')
    //     currentTab[getIndex].group = input.innerText
    //     input.contentEditable = 'false'
    //     input.blur()
    //     input.style.background = 'none'
    //     input.style.borderRadius = 'none'
    //     contain.style.border = 'none'
    //     input.style.height = '15px'
    //     renderForAddTodo()
    // }
    // dataCheck(renderFilterContent(currentTab))
}

function groupOptionsDelete(item) {
    let container = item.closest('.modifiers')
    let getID = parseInt(container.className.match(/\d+/g).toString())
    currentTab.splice(getID,1)
    dataCheck(renderFilterContent(currentTab))
}
// Phần thẻ
// lưu tạm giá trị text của thẻ được ấn vào ở biến nayf
let tagTempoValue
function TagsHandler(){
    let temp = []
    let final = []
    if(currentTab) {
        currentTab.forEach(itm => itm.content.forEach(item => item.tag.flatMap(itm => temp.push(itm.trim()))))
        temp.forEach(
            itme => {
                let value = itme.trim()
                if(!final.includes(value)) {
                    final.push(value)
                }
            }
        )
    }
    return final
}
function renderTagLists() {
    let content = document.querySelector('.navbar-tags-list')
    if(!currentTab) {content.innerHTML=null;return}
    content.innerHTML = `
        ${TagsHandler().map((itm,num) => `
            ${itm.trim()? `<p style='${itm === tagTempoValue?'background: rgb(253, 234, 215)' : 'background :#F5F5F5' }' oninput="tagEditingFunc(this)" onclick="displayNavTags(this)" class="tagsList tags-num-${num}">${itm}</p>`: ``} 
            <div class="tags-modifiers tags-modifiers--num-${num}"  style="position: absolute;display: none;flex-direction: column;height: 84px;width: 122px;border-radius: 8px;border: 1px solid #F3F4F6;background: white">
                <p onclick="tagEditFunc(this)" style="flex: 1" >sửa</p>
                <p onclick="tagDelete(this)" style="flex: 1;" >xoá</p>
            </div>
        `).join('')}
    `
}

function creatTags() {
    let input = document.querySelector('.navbar-tags input')
    input.style.display = 'block'
    // container.scrollTo({
    //     top: container.scrollHeight,
    //     behavior: 'smooth',
    // })
    input.style.transform = 'scale(0)'
    setTimeout(() =>{input.style.transform = 'scale(1)';input.focus()},100)
}
// gỡ sự kiện window eventlistener

function displayNavTags(element)
{
    let div = element.nextElementSibling
    if(div.style.display === 'none'){
        if(element.style.background === 'rgb(253, 234, 215)') {
            div.style.transform = 'scale(1)'
            setTimeout(() =>{div.style.display = 'flex';
                div.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 500)
        }
        if(element.innerText.trim() !== ''){
            tagTempoValue = element.innerText
            tagsDelFunc(currentTab,tagTempoValue,'show')
        }
        let container = element.closest('.navbar-tags-list')
        let p = container.querySelectorAll('p')
        p.forEach(itm => itm.style.background = '#F5F5F5')
        element.style.background = 'rgb(253, 234, 215)'
        // renderTagLists()
    }
    const handler = tagsClickOutsideHandle(element, div);
    window.addEventListener('click', handler);
}
function tagsClickOutsideHandle(element,div) {
    function handler(e) {
        if (!element.contains(e.target) && !div.contains(e.target)) {
            if(element.innerText.trim() === '') {
                element.innerText = tagTempoValue
            }
            div.style.transform = 'scale(0)';
            // dataCheck(renderFilterContent(currentTab))
            element.style.background = '#F5F5F5'
            setTimeout(() => {div.style.display = 'none';},300)
            window.removeEventListener('click', handler);
        }
    }
    return handler;
}
//
function tagEditFunc(item) {
    let getIndex = parseInt(item.closest('.tags-modifiers').className.match(/\d+/g))
    let edit = document.querySelector(`.tags-num-${getIndex}`)
    let container = item.closest('.tags-modifiers')
    edit.contentEditable = 'true'
    edit.innerText = ''
    edit.focus()
    container.style.transform = 'scale(0)';
    setTimeout(() => {container.style.display = 'none';},300)
    let clickOutside = displayClickOutside(edit)
    window.addEventListener('click', clickOutside)
}
function tagEditingFunc(item) {
    if(item.innerText.trim() !== '' && !item.contains(event.target)){
        window.removeEventListener('click',window.clickOutSide)
    }
    const keydownHandler = e => {
        if (e.key !== 'Backspace') e.preventDefault();
    };
    const pasteHandler = e => {
        e.preventDefault();
    };
    if(!item.keydownHandle) item.keydownHandle = keydownHandler
    if(!item.pasteHandle) item.pasteHandle = pasteHandler
    if (item.innerText.length === 15) {
        item.addEventListener('keydown', item.keydownHandle);
        item.addEventListener('paste', item.pasteHandle);
    } else {
        item.removeEventListener('keydown', item.keydownHandle);
        item.removeEventListener('paste', item.pasteHandle);
    }

    item.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            // sửa ở đây
            if(item.innerText.trim()){
                tagsEditFunc(currentTab,tagTempoValue,item.innerText)
                renderTagLists()
                dataCheck(renderFilterContent(currentTab))
                renderForAddTodo()
                item.contentEditable = 'false'
                item.blur()
            }
            //
        }
    });
}
function tagDelete(item) {
    tagsDelFunc(currentTab,tagTempoValue)
    console.log(currentTab,tagTempoValue)
    renderTagLists()
    dataCheck(renderFilterContent(currentTab))
    renderForAddTodo()
}
// gỡ event listener
function displayClickOutside(item) {
    function handler(e) {
        if(item.innerText.trim() !== '' && !item.contains(event.target)){
            // sửa ở đây
            tagsEditFunc(currentTab,tagTempoValue,item.innerText)
            renderTagLists()
            content.innerHTML = renderFilterContent(tagsFilter)
            // dataCheck(renderFilterContent(currentTab))
            renderForAddTodo()
            //
            item.contentEditable = 'false'
            item.blur()
            window.removeEventListener('click', handler);
        }
    }
    return handler
}

//

function tagsEditFunc(array,originValue,newTagName) {
    let clone = []
    array.forEach(item => clone.push(item.content.map(itm => itm.tag))  )
    clone = clone.map(item => item.map((itm) => itm.map(
        (value,num) => {
            if(value.trim() === originValue){
                itm[num] = newTagName
    }
        }
        )
    ))
    return clone
}
// lưu biến chứa các thẻ lọc được user chọn, biến này không có tham chiếu tới dữ liệu gốc
let tagsFilter
function tagsDelFunc(array,value,action) {
    if(action === 'show') {
        tagsFilter = array.map(item => ({
        ...item,
        content: item.content.filter(child =>
            child.tag.includes(value)
        )
        }))
        .filter(item => item.content.length > 0);
        // tagsFilter = array.filter(itm =>  itm.content.some(itm => itm.tag.some(itm => itm === value)))
        // let filteredItem = tagsFilter.map(itm =>  itm.content.filter(itm => itm.tag.some(itm => itm === value)))
        // tagsFilter.forEach((itm,num) => itm.content = filteredItem[num])
        star.classList.remove('fa-solid')
            star.classList.add('fa-regular');
            star.style.color = 'black'
        content.innerHTML = renderFilterContent(tagsFilter)
    }
    else {
        array.forEach(itm => itm.content.splice(0,itm.content.length,...itm.content.filter(itm => itm.tag.every( itm => itm.trim() !== value))).filter(itm => itm.length > 0))
    }

}
function cancelTagFilter() {
    if(tagTempoValue || tagsFilter) {
        tagTempoValue = null
        tagsFilter = null
        dataCheck(renderFilterContent(currentTab))
    }
}
// setInterval(()=> console.log(previous),10)



// Phần thêm mới
function renderForAddTodo(){
if(currentTab){
// reset dữ liệu khi chuyển tab khác

//  Phần chọn nhóm
let caret = document.querySelector('.groups-choose').querySelector('.fa-caret-down')
let groupChoose = document.querySelector('.groups-choose')
caret.style.display = 'block'
groupChoose.style.pointerEvents = 'auto'

let group = document.querySelector('.groups-choose-navbar')
group.innerHTML = `
    ${currentTab.map(group =>  `
            <p onclick="choosedGroup(this)" data-isChoosed="false" style="border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;">${group.group} <span ><i class="fa-solid fa-check"></i></span></p>
        `).join('')}
    <div class="groups-choose-navbar-addGroup" style="position: relative;border: 2px solid #F3F4F6;border-radius: 8px;padding: 0;">
        <input onblur="focusOnGroups('true')" onfocus="focusOnGroups('false')" style="width: 100%;padding: 8px 20px 8px 8px;border: none;border-radius: 8px;outline: none;" type="text" placeholder="Thêm nhóm">
        <span onclick="addGroups()" style="display : none;transform: translate(-50%, -50%);position: absolute;top: 50%;right: 0;z-index: 9999;cursor: pointer;"><i class="fa-solid fa-plus"></i></span>
    </div>
`
// 
// Phần chọn thẻ
let tag = document.querySelector('.tag-display-options')
let filterTagsHandler = TagsHandler()
filterTagsHandler.splice(0,filterTagsHandler.length,...filterTagsHandler.filter(itm => itm.trim()))
tag.innerHTML = `
    ${filterTagsHandler.map(tags =>  `
            <p data-isChoosed="false" style="font-size:13px;border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;">${tags} <span ><i class="fa-solid fa-check"></i></span></p>
        `).join('')}
    <div class="tag-display-add" style="position: relative;border: 2px solid #F3F4F6;border-radius: 8px;padding: 0;">
        <input onfocusout="tagAdd('false')" onfocus="tagAdd('true')" style="width: 100%;padding: 8px 20px 8px 8px;border: none;border-radius: 8px;outline: none;" type="text" placeholder="Thêm thẻ">
        <span onclick="tagAddHandle()" style="display : none;transform: translate(-50%, -50%);position: absolute;top: 50%;right: 0;z-index: 9999;"><i class="fa-solid fa-plus"></i></span>
    </div>
`
}
}


function resetDataAddSection(){
    let popUpContent = document.querySelector('.popUp-add')
    popUpContent.innerHTML = `
    <div style="display: flex;flex-direction: column;gap: 8px;padding: 12px 20px">
        <div style="display: flex;flex-direction: row;justify-content: space-between;">
            <div  style="flex: 0.7;display: flex;flex-direction: column;gap: 3px;">
                <input maxlength="25" class="currentTab-title" type="text" placeholder="Thêm chủ đề ghi chú" style="border: none;outline: none;padding: 8px 0;font-weight: 500;font-size: 20px;">
                <input maxlength="100" class="currentTab-content" type="text" placeholder="Thêm mô tả" style="border: none;outline: none;padding: 8px 0;font-weight: 400;font-size: 15px;">
            </div>
            <i onclick="if (!this.getAttribute('ischoosed') || this.getAttribute('ischoosed') === 'false')
            {
                this.setAttribute('ischoosed', 'true');
                this.classList.remove('fa-regular')
                this.classList.add('fa-solid');
                this.style.color = 'rgb(239, 104, 32)'
            }
            else {
                this.setAttribute('ischoosed', 'false');
                this.classList.remove('fa-solid')
                this.classList.add('fa-regular');
                this.style.color = 'black'
            }
            "
            class="fa-regular fa-star currentTab-star">
            </i>
        </div>
        <div onclick="groupChoose(event)" class=" groups-choose" style="color: #4D5761;font-size: 13px;position: relative;height: 28px;">
            <div style="display: flex;flex-direction: row;padding: 8px 12px;width: fit-content;border-radius: 8px;" >
                <p class="currentTab-group" style="width: auto;overflow: hidden;max-width: 400px;"> Khác </p>
                <i style="margin-left: 12px;cursor: pointer" class="fa-solid fa-caret-down"></i>
            </div>
            <div class="groups-choose-navbar" style="display: none;position: absolute;top: 100%;background: white;border: 2px solid #F3F4F6;;border-radius: 8px;width: 207px;padding: 8px;flex-direction: column;gap: 4px;justify-content: center;z-index: 9999;">
                
            </div>
        </div>
        <div class="popUp-add-options" style="display: flex;flex-direction: row;align-items: center;gap: 10px;">
            <div onclick="addCalendarBtn(event)" class="options_num-1" style="cursor: pointer;position: relative;display: flex;">
                <i class="fa-solid fa-calendar "></i>
                <div style="display: flex;flex-direction: row;width: 100%;height: 100%;padding:0;gap: 8px;">
                    <p class="currentTab-day" style="display: none;font-weight: 480;color:#FF4405"></p>
                    <i style="display: none;align-self:center;color: #FF4405" class="fa-solid fa-xmark undo"></i>
                </div>
                <div style="display: none;position: absolute;border: 2px solid #F3F4F6;border-radius: 8px;" class="popUp-add-options-calendar__navbar">
                    <p onclick="setValue('.options_num-1','.options_num-1 i:first-of-type','.options_num-1 div:first-of-type>p',event)">Hôm nay</p>
                    <p onclick="setValue('.options_num-1','.options_num-1 i:first-of-type','.options_num-1 div:first-of-type>p',event)">Ngày mai</p>
                    <p onclick="setValue('.options_num-1','.options_num-1 i:first-of-type','.options_num-1 div:first-of-type>p',event)">Tuần này</p>
                    <p onclick="setValue('.options_num-1','.options_num-1 i:first-of-type','.options_num-1 div:first-of-type>p',event);calendarDisplay()" >Tuỳ chỉnh <i style="margin-left: 28px" class="fa-solid fa-arrow-right"></i> </p>
                </div>
            </div>
            <div onclick="timeDisplay(event)" class="options_num-2" style="cursor: pointer;position: relative;display: flex;border-radius: 8px">
                <i class="fa-solid fa-clock"></i>
                <div style="display: flex;flex-direction: row;width: 100%;height: 100%;padding:0;gap: 8px;">
                    <p class="currentTab-time" style="display: none;font-weight: 480;color:#FF4405"></p>
                    <i style="display: none;align-self:center;color: #FF4405" class="fa-solid fa-xmark undo2"></i>
                </div>
                <div data-status="deactive" class="calendar-display" style="z-index: 2;border: 2px solid #F3F4F6;border-radius: 8px;display: none;flex-direction: column;position: absolute;background: white;width: 296px;height: 320px;top: 100%;left: -150%;padding: 8px;overflow:hidden">
                    <div style="height: 36px;display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 22px 12px;background: #F5F5F5    ;border-radius: 8px">
                        <i onclick="previousMonth()" style="padding: 6px;background: white;border-radius: 8px" class="fa-solid fa-arrow-left"></i>
                        <p class="calendar-date">date here</p>
                        <i onclick="nextMonth()" style="padding: 6px;background: white;border-radius: 8px" class="fa-solid fa-arrow-right"></i>
                    </div>
                    <div style="flex: 1;padding: 0" class="options_num-2-navbar">
                        <table class="calendar_table" style="width: 100%;font-size: 12px;color: #9DA4AE;border-spacing: 10px">

                        </table>
                    </div>
                </div>
                <div  class="time-display" style="z-index: 1;border: 2px solid #F3F4F6;border-radius: 8px;display: none;flex-direction: column;position: absolute;background: white;width: 320px;height: 84px;top: 100%;left: -150%;padding: 12px;gap: 8px">
                    <p>Thời gian</p>
                    <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 0;gap: 8px";>
                        <select onchange="timeDisplay(event)" class="time-display_hour" style="width: 100%;padding: 8px;border: 1px solid #F3F4F6;outline: none;border-radius: 8px;appearance: none;text-align: center">
                            <option > --</option>
                            <option >01</option>
                            <option >02</option>
                            <option >03</option>
                            <option >04</option>
                            <option >05</option>
                            <option >06</option>
                            <option >07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option >15</option>
                            <option >16</option>
                            <option >17</option>
                            <option >18</option>
                            <option >19</option>
                            <option>20</option>
                            <option>21</option>
                            <option >22</option>
                            <option>23</option>
                            <option>24</option>
                        </select>
                        <p>:</p>
                        <select onchange="timeDisplay(event)" class="time-display_minute" style="width: 100%;padding: 8px;border: 1px solid #F3F4F6;outline: none;border-radius: 8px;appearance: none;text-align: center">
                            <option > -- </option>
                            <option >00</option>
                            <option >15</option>
                            <option >30</option>
                            <option >45</option>
                        </select>
                    </div>
                </div>
            </div>
            <div onclick="repeatDisplay(event)" class="options_num-3" style="cursor: pointer;position: relative;color: black;border-radius: 8px;">
                <i class="fa-solid fa-repeat currentTab-isRepeat"></i>
                <div class="repeat-display" style="display: none;width: 328px;height: 216px;position: absolute;padding: 12px;background: white;left:-50px;flex-direction: column;justify-content: left;gap: 4px;border: 2px solid #F3F4F6;border-radius: 8px;">
                    <p style="font-weight:500 ;font-size: 14px;"> Lặp lại</p>
                    <div class="repeat-display_navbar" onclick="repeatNav1(event)" style="position: relative;display: flex;flex-direction: row;padding: 10px 12px;width: 100%;height: 40px;border-radius:8px;background: white;justify-content: space-between;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                        <p class="">Không lặp lại</p>
                        <i class="fa-solid fa-caret-down"></i>
                        <div class="repeat-display_navbar-1" style="display: none;flex-direction: column;gap: 4px;padding: 8px;width: 100%;position: absolute;left: 0;top: 100%;border: 2px solid #F3F4F6;border-radius: 8px;background: white;height: 172px;">
                            <p style="border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;">Không lặp lại <span  ><i class="fa-solid fa-check check-1"></i></span></p>
                            <p style="border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;"> Hằng ngày <span ><i class="fa-solid fa-check check-2"></i></span></p>
                            <p style="border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;"> Ngày trong tuần <span ><i class="fa-solid fa-check check-3"></i></span></p>
                            <p style="border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;"> Hằng tháng <span ><i class="fa-solid fa-check check-4"></i></span></p>
                        </div>
                    </div>
                    <p style="font-weight:500 ;font-size: 14px;"> Kết thúc </p>
                    <div class="repeatCounter-container" style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;background: white;">
                        <img onclick="focusChange('.repeatCounter')" style="cursor: pointer;margin-right: 5px;" src="../asset/Radio.png" height="26" width="26"/>
                        <p style="flex: 1;font-size: 15px;"> Số lần lặp lại</p>
                        <input class="repeatCounter no-arrow" style="width: 37px;height: 40px;padding: 10px 10px;border: 1px solid #F3F4F6;outline: none;border-radius: 8px;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);" type="number">
                    </div>
                    <div class="repeat-calendarModify" style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;background: white;">
                        <img onclick="focusChange('.repeat-calendar-num-1')" style="cursor: pointer;margin-right: 5px;" src="../asset/Radio.png" height="26" width="26"/>
                        <p style="font-size: 15px;"> Vào ngày</p>
                        <div style="flex: 1;display: flex;flex-direction: row;justify-content: right;align-items: center;">
                            <i class="fa-solid fa-calendar-check"></i>
                            <div style="display: flex;flex-direction: row;padding: 8px 0 8px 8px">
                                <input onfocusout="calendarModify(event,this.value >= 0 && this.value <= 31)" oninput="calendarModify(event,this.value >= 0 && this.value <= 31);counter(event)" class="no-arrow repeat-calendar-num-1" style="width: 16px;border: none;outline:none" type="number" placeholder="--">
                                /
                                <input onfocusout="calendarModify(event,this.value >= 0 && this.value <= 12)" oninput="calendarModify(event,this.value >= 0 && this.value <= 12);counter(event)" class="no-arrow repeat-calendar-num-2" style="width: 16px;border: none;outline:none" type="number" placeholder="--">
                                /
                                <input max="9999" onclick="reset(event)" oninput="calendarModify(event,this.value >= 2000 && this.value < 9999);counter2(event,this.value >= 2000 && this.value < 9999)" class="no-arrow repeat-calendar-num-3" style="width: 30px;border: none;outline:none" type="number" placeholder="--">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div onclick="tagDisplay(event)" class="options_num-4" style="cursor: pointer;position: relative;border-radius: 8px;">
                <i class="fa-solid fa-tags"></i>
                <p class="currentTab-tag" style="display: none;height: 16px;width: 180px;white-space: nowrap;overflow: hidden;"> </p>
                <div class="tag-display-options" style="display: none;position: absolute;top: 100%;background: white;border: 2px solid #F3F4F6;;border-radius: 8px;width: 153px;padding: 8px;flex-direction: column;gap: 4px;justify-content: center;">
                    
                </div>
            </div>
        </div>
    </div>
    <hr style="color: #FFFFFF;border: 1px solid #F3F4F6;">
    <div style="display: flex;padding: 8px 16px;flex: 1;justify-content: flex-end;margin-right: 20px;">
        <button class="newTodoAdd" onclick="newTodoAdd()" onmouseover="this.style.background ='#EF6820';this.style.color = 'white'" onmouseout="this.style.background = '#F3F4F6';this.style.color = '#4D5761'" style="border: none;outline: none;border-radius: 8px;font-weight: 700;padding: 8px 14px;cursor: pointer">Tạo mới</button>
    </div>
    `
    // lấy lại phần tử DOM  
    calenNavbarMain = document.querySelector('.popUp-add-options-calendar__navbar')
    calendarMain = document.querySelector('.calendar-display')
    timeMain = document.querySelector('.time-display')
    repeatMain = document.querySelector('.repeat-display')
    tagMain = document.querySelector('.tag-display-options')
    groupsChoosing = document.querySelector('.groups-choose-navbar')
    optionsSizeReset()
}
// Các thẻ chứa dữ liệu để thêm vào nhóm khi ấn chức năng thêm mới
let newTodo = {
    title : document.querySelector('.currentTab-title'),
    content : document.querySelector('.currentTab-content'),
    star : document.querySelector('.currentTab-star'),
    group : document.querySelector('.currentTab-group'),
    day : document.querySelector('.currentTab-day'),
    time : document.querySelector('.currentTab-time'),
    isRepeat : document.querySelector('.currentTab-isRepeat'),
    tag : document.querySelector('.currentTab-tag')
}
// Tìm hàm render với đúng data của tab hiện tại
let findTabRenderFunction = {
    'all' : () => dataCheck(renderContent(data)),
    'todayData' : () => dataCheck(renderTodayContent(todayData)),
    'next3DaysData' : () => dataCheck(renderNext3DaysContent(next3DaysData)),
    'Next7DaysData' : () => dataCheck(renderNext7DaysContent(Next7DaysData)),
}
function newTodoAdd(){
    // gán lại các giá trị cho DOM mới 
    newTodo = {
    title : document.querySelector('.currentTab-title'),
    content : document.querySelector('.currentTab-content'),
    star : document.querySelector('.currentTab-star'),
    group : document.querySelector('.currentTab-group'),
    day : document.querySelector('.currentTab-day'),
    time : document.querySelector('.currentTab-time'),
    isRepeat : document.querySelector('.currentTab-isRepeat'),
    tag : document.querySelector('.currentTab-tag')
}

    let isValid = true
    // lọc dữ liệu
    if(!newTodo.group.innerText?.trim()) {
        isValid = false;
    }
    if(!newTodo.title.value?.trim()){
        isValid = false;
    }
    if(!newTodo.content.value?.trim()) {
        isValid = false;
    }
    if(!newTodo.day.innerText?.trim()) {
        isValid = false;
    }
    if(!newTodo.time.innerText?.trim()){
        isValid = false;
    }
    // 

    if(!isValid){
        return
    }
    let newValue = {
        group:newTodo.group.innerText.trim(),
        notAllowDel:false,
        content: [
            {
                choosing: false,
                star: newTodo.star.getAttribute('ischoosed') ===  'true',
                title : newTodo.title.value.trim(),
                content : newTodo.content.value.trim(),
                tag : newTodo.tag.innerText.split(','),
                repeat: newTodo.isRepeat.style.color === '#EF6820',
                date : newTodo.day.innerText.trim(),
                time: newTodo.time.innerText.trim(),
            }
        ]
    }
    // thêm vào currentTab và render lại dữ liệu
    if(currentTab) {
        let findGroup = dataList[dataListToString].find(itm => itm.group.trim() === newValue.group.trim())
        if(findGroup){
            findGroup.content.unshift(newValue.content[0])
            findTabRenderFunction[dataListToString]()
            resetDataAddSection()
            setTimeout(()=>renderForAddTodo(),1000)
        }
        else {
            dataList[dataListToString].unshift(newValue)
            findTabRenderFunction[dataListToString]()
            resetDataAddSection()
            setTimeout(()=>renderForAddTodo(),1000)
        }
        // nếu user đang dùng filter, hiển thị danh sách filtered
        let star = document.getElementById('star')
        if(star.classList.contains('fa-solid')) {
            filterMode = false
            setTimeout(() => {listFilter();filterMode = true},10)
            setTimeout(()=> {dataCheck(renderFilterContent(filtered));filteredStatus = false},20)
        }
        //
        // reset lại các biến tạm
        tempData = []
        isTagDupl = []
        isGroupDupl = []
    }
}


//  Phần tìm kiếm
function addSearchForm(){
    let searchForm = document.querySelector('.search-popUp-container')
    let overlay = document.querySelector('.blur-overlay')
    let input = searchForm.querySelector('input')
    if(searchForm.style.display === 'none'){
    searchForm.style.opacity = '0'
    searchForm.style.display = 'flex'
    overlay.style.display = 'block'
     setTimeout(() => {
        searchForm.style.opacity = '1';
        input.focus()
        ;
    }, 50);
}
    document._outsideClick = (e) => {
        if(!searchForm.contains(e.target)){
            searchForm.style.opacity = '0'
            overlay.style.display = 'none'
            setTimeout(() => searchForm.style.display = 'none',500)
            document.removeEventListener('click', document._outsideClick)
            document._outsideClick = null
            console.log('triggering')
        }
        else if (searchForm.style.display === 'none') {
            document.removeEventListener('click',document._outsideClick)
        }
    }
    setTimeout( () => {
        document.addEventListener('click' , document._outsideClick)
    },200)
    if(input.value.trim() && !searchLog.includes(input.value.trim())){
        searchLog.unshift(input.value.trim())
    }
    input.value = ''
    searchingInput()
}
// Lưu lịch sử tìm kiếm ở searchLog
let searchLog = []
// Lưu mảng tìm kiếm đượcở searchList và để làm ưu tiên tìm kiếm, ví dụ tìm group rồi từ đó gõ thêm giá trị thif tìm tiếp ở trong title tương tự với content
let searchList
function searchingInput () {
    let log = document.querySelector('.search-log')
    let logContent = log.querySelector('.search-log-content')
    let list = document.querySelector('.search-list')
    let searchForm = document.querySelector('.search-popUp-container')
    let input = searchForm.querySelector('input')
    // Hiển thị lịch sử tìm kiếm
    if(!input.value.trim() || input.value.length === 0) {
        log.style.height = 'auto'
        log.style.opacity = '1'
        list.style.height = '0'
        // hiển thị lịch sử tìm kiếm từ seachLog ở đây
        logContent.innerHTML = `
            ${searchLog.length === 0 ? 
                `
                <p style="display: flex;flex-direction: row;align-items: center;justify-content: center;height: 30px;width:100%;margin:auto"> &lt;nội dung tìm kiếm trống&gt; </p>
                ` 
                : `
                ${searchLog.map((content,num) => `
                <p onclick="searchLogFunc(event)" class="search-log-list-num-${num} search-log-content-item" style="cursor: pointer;color: #4D5761;gap: 8px;max-width: 180px;padding: 6px 12px;border-radius: 8px;height: 32px;background: #F5F5F5;display: flex;align-items: center;justify-content: space-evenly"> 
                    <span style="overflow: hidden;text-overflow: ellipsis;">${content}</span> 
                    <i onmouseover="this.style.color= 'red';this.style.transform = 'scale(1.3)'" onmouseout="this.style.color = '#4D5761';this.style.transform = 'scale(1)'" onclick="searchLogItemDel(event)" class="fa-solid fa-xmark"></i>
                </p>
                `).join('')}
                `}
            
        `
    }
    else {
        log.style.height = '0'
        log.style.opacity = '0'
        list.style.height = 'auto'
        // Hiển thị kết quả tìm kiếm ở đây
        searchList = searchFilter(input.value)
        list.innerHTML = `
            ${searchList ? `
                ${searchList.map((item,num) => 
                `
                <div onclick="clickToFind(event)" class="search-list-items search-list-num-${num}" onmouseover="this.style.background = '#E5E7EB'" onmouseout="this.style.background = 'white'" style="cursor: pointer;height: fit-content;width: 100%;background: white;margin-bottom: 12px;border-radius: 8px;border: 1px solid #F3F4F6;">
                     <div style="display: flex;flex-direction: row;gap: 8px;">
                         <img src="../asset/Radio.png" height="28" width="28"/>
                         <div style="flex: 1;display: flex;flex-direction: column;gap: 8px">
                             <div style="display: flex;justify-content:space-between ;">
                                 <div>
                                     <p style="font-weight: bold;margin-bottom: 4px">${item.from} ${item.group} ${item.content.title}</p>
                                     <p style="font-size: 12px;color:#9DA4AE">${item.content.content}</p>
                                 </div>
                             </div>
                             <div style="display: flex;flex-direction: row;align-items: center;">
                                ${item.content.tag.length === 0 ? `` : `
                                ${item.content.tag.map(itm => `
                                           <p style="padding: 4px 12px;font-size: 12px;color: #4D5761">${itm}</p>
                                    `).join('')}
                                `}
                             </div>
                             <div style="display: flex;flex-direction: row;align-items: center;gap: 8px;font-size: 14px;">
                                 <i style="color: #9DA4AE" class="fa-solid fa-repeat"></i>
                                 <i style="color: #9DA4AE"  class="fa-solid fa-calendar"></i>
                                 <p style="color: #9DA4AE" >${item.content.date} - ${item.content.time}</p>
                             </div>
                         </div>
                     </div>
                </div>
                `).join('')}
            ` : `
                    <div style="height: 68px;width: 181px;background: white;margin: auto;border-radius: 8px;display: flex;align-items: center;justify-content: center">
                        Không tìm thấy giá trị
                    </div>
                `}
        `
        // 
        // khi ấn enter thì lưu value vào searchLog sau đó hiển thị
        input._saveToSearchLog = (e) => {
            if(e.key === 'Enter' && input.value.trim() && !searchLog.includes(input.value.trim())) {
            searchLog.unshift(input.value)
            }
            else {
                input.removeEventListener('keydown',input._saveToSearchLog)
            }
        }
        input.addEventListener('keydown',input._saveToSearchLog)
        // 

    }
}
// set 2 biến tạm để lưu giá trị tìm được , 1 biến lưu trữ những giá trị tìm được trước khi không tìm thấy giá trị nào nếu người dùng không xóa , 1 biến lưu giá trị value lúc tìm được
let tempoArray 
let tempoString
function searchFilter(stringg){
    let cloneData = [data,todayData,next3DaysData,Next7DaysData]
    // dùng map đảo ngược thứ tự key - value của dataList tạo từ trc
    let reverseDataList = new Map()
    for(let [key,value] of Object.entries(dataList)){
        reverseDataList.set(value,key)
    }
    // 
    let newClone = cloneData.map(itm=>
        itm.flatMap(item => ({
            ...item,
            from: reverseDataList.get(itm)
        }))
    ).flatMap(itm => itm)
    // Tìm kiếm trong newClone theo tên nhóm
    let string = formatString(stringg).toLowerCase().replace(/\s+/g, '')
    // let stringg = 'Nhóm 1'
    let findGroup = newClone.filter(itm => formatString(itm.group.toLowerCase().replace(/\s+/g, '')).includes(string))
    // xử lý lại dữ liệu của findgroup thành newGroups:
    let newFindGroup
    let newGroups = []
    newFindGroup =  findGroup.flatMap(itm => itm.content.map(item => ({
        ...item,
        group:itm.group,
        from:itm.from,
    }
    )))
    newFindGroup.forEach((item,num) => {
        let newValue = {
        content:{
            ...item,
        },
        group:item.group,
        from: item.from,
        }
        delete newValue.content.group
        delete newValue.content.from
        newGroups.push(newValue)
    })
    // 
    if(newGroups.length > 0) {
        tempoArray = newGroups
        tempoString = stringg
        return newGroups }
    // 
    // nếu k tìm được theo nhóm, thì chuyển qua tìm theo title
    let findTitle = []
    newClone.forEach(itm => {
        itm.content.forEach(item =>{
            tempItemValue = formatString(item.title.toLowerCase().replace(/\s+/g, '') )
            if(tempItemValue.includes(string)){
                let founded = {
                    group:itm.group,
                    content:item,
                    from: itm.from,
                }
                findTitle.push(founded)
            }
        })
    })
    if (findTitle.length > 0) {return findTitle}
    // // nếu k tìm được theo nhóm nữa thì chuyển tiếp qua tìm theo content
    let findText = []
    newClone.forEach(itm => {
        itm.content.forEach(item =>{
            tempItemValue = formatString(item.content.toLowerCase().replace(/\s+/g, '') )
            if(tempItemValue.includes(string)){
                let founded = {
                    group:itm.group,
                    content:item,
                    from: itm.from,
                }
                findText.push(founded)
            }
        })
    })
    if(findText.length > 0) {return findText}
    // nếu tìm được group mà người dùng nhập tiếp thì tiếp tục tìm ở kết quả của newgroups sau đó mới trả về newgrous
    if(stringg.includes(tempoString)) {
        let cloneString = stringg.replace(tempoString, "*")
        let tempoFilter = cloneString.split("*")[1]
        let firstArray = tempoArray.filter(item => {
                tempItemValue = formatString(item.content.title.toLowerCase().replace(/\s+/g, '') )
                if(tempItemValue.includes(formatString(tempoFilter).toLowerCase().replace(/\s+/g, ''))){
                    return true
                }
        } )
        if (firstArray.length >0 ){return firstArray} 
        let secondArray = tempoArray.filter(item => {
                tempItemValue = formatString(item.content.content.toLowerCase().replace(/\s+/g, '') )
                if(tempItemValue.includes(formatString(tempoFilter).toLowerCase().replace(/\s+/g, ''))){
                    return true
                }
        } )
        if(secondArray.length > 0) {return secondArray}
    }
    else {
        tempoString = null
        tempoArray = null
    }
}

// formate lại dạng dữ liệu có dấu
function formatString(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

// chức năng cho searchlog
function searchLogFunc(e) {
    let input = document.querySelector('.search-input')
    input.value = e.target.closest('.search-log-content-item').querySelector('span').innerText
    input.focus()
    searchingInput()
}

function searchLogItemDel(e){
    let getIndex =  parseInt(e.target.closest('.search-log-content-item').className.match(/\d+/g).toString())
    e.stopPropagation()
    searchLog.splice(getIndex,1)
    searchingInput()
}
function searchLogItemsDelAll (){
    searchLog.splice(0,searchLog.length)
    searchingInput()
}

let runningList = {
    'todayData' : () => {loadContent('./pages/today.js');dataCheck(renderTodayContent(todayData),todayData,'todayData')},
    'all' : () => {loadContent('all.html');dataCheck(renderContent(data),data,'all')},
    'next3DaysData' : () => {loadContent('./pages/Next3Days.html');dataCheck(renderNext3DaysContent(next3DaysData),next3DaysData,'next3DaysData')},
    'Next7DaysData' : () => {loadContent('./pages/Next7Days.html');dataCheck(renderNext7DaysContent(Next7DaysData),Next7DaysData,'Next7DaysData')}
}
let searchToggle
function clickToFind(e) {
    if(searchToggle) {return}
    let searchContainer = document.querySelector('.search-popUp-container')
    let getIndex = parseInt(e.currentTarget.className.match(/\d+/g).toString())
    let overlay = document.querySelector('.blur-overlay')
    if(searchList[getIndex]){
        // đóng tab tìm kiếm và mark thẻ tìm kiếm
        setTimeout(() => {
        searchContainer.style.transition = 'all ease 0.6s'
        searchContainer.style.opacity = '0'
        overlay.style.display = 'none'
        setTimeout(() => searchContainer.style.display = 'none',600)
        },600)

        // 
        let item = searchList[getIndex]
        setTimeout(() => {
            let getElement = document.querySelector(`.dupDel-${item.content.id}`);

            let getContain = getElement?.closest('.parent') || ``
            if(getContain) {
                getContain.scrollIntoView({behavior:'smooth',block: 'center'})
                getContain.style.transition = 'all ease 1s'
                getContain.style.transform = 'scale(1.1)'
                getContain.style.border = '2px solid #EF6820'
                getContain.style.background = '#FDEAD7'
                getContain.style.borderRadius = '8px'
                setTimeout(() => {
                    getContain.style.background = 'white'
                    getContain.style.transform = 'scale(1)';
                    getContain.style.border = 'none'},6000);
            }
            console.log(item);
            // 
        },1100)
        runningList[item.from]()
    // reset lại thanh sideBar
    for (let i = 0; i < 7; i++) {
            if(document.getElementsByClassName("navbar-options-num")[i].id.trim() === item.from) {
                document.getElementsByClassName("navbar-options-num")[i].setAttribute('isChecked', 'true')
                document.getElementsByClassName("navbar-options-num")[i].style.background = '#FDEAD7'
                document.getElementsByClassName("navbar-options-num")[i].style.color = '#EF6820'
                continue
            }
            document.getElementsByClassName("navbar-options-num")[i].setAttribute('isChecked', 'false')
            document.getElementsByClassName("navbar-options-num")[i].style.background = 'white'
            document.getElementsByClassName("navbar-options-num")[i].style.color = '#4D5761'
        }

    }
    document.removeEventListener('click', document._outsideClick)
    searchToggle = true
    setTimeout(() => searchToggle = false,2000)
}

// Phần click to edit
function clickToDoEdit(e){
    let container = e.currentTarget.closest('.click-to-edit')
    let getID = parseInt(container.className.match(/\d+/g).toString())
    let findTab = currentTab.find(itm =>  itm.content.find(item => item.id === getID) ).content.find(itm => itm.id === getID)
    let findTrulyItem = document.querySelector(`.click-to-edit-num-${getID}`)
    let item = container.querySelector('.click-to-edit-list')
    // let trueItem = findTrulyItem.querySelector('.click-to-edit-list')
    // dùng set() để tối ưu nếu dữ liệu lớn O(1)
    let tagsOrigin = new Set(findTab.tag)
    if(item.style.display === 'none'){
        // reset lại tất cả item đang hiện
        document.querySelectorAll('.click-to-edit-list').forEach(itm => {document.removeEventListener('click',itm._outsideClick);itm.style.display = 'none'})
        //
        item.style.display = 'block'
        item._outsideClick = (n) => {
            if(!item.contains(n.target) ) {
                item.style.display = 'none'
                findTrulyItem.removeAttribute('onEditing')
                document.removeEventListener('click', item._outsideClick)
            }
        }
    //     thêm evenlisten
        setTimeout(() => {
            document.addEventListener('click', item._outsideClick);
        }, 20);
    }
    else {
        item.style.display = 'none'
    }


    if(container.getAttribute('onEditing') === 'true') {return}
    let filterTagsHandler = TagsHandler()
    filterTagsHandler.splice(0,filterTagsHandler.length,...filterTagsHandler.filter(itm => itm.trim()))
    item.innerHTML = `
    ${filterTagsHandler.map(tags =>  `
        ${tagsOrigin.has(tags)? 
        `
            <p onclick="editTag(event)" data-isChoosed="true" style="margin-bottom: 8px;background: rgb(253, 234, 215);font-size:13px;border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;">${tags} </p>
        ` :
        `
            <p onclick="editTag(event)" data-isChoosed="false" style="margin-bottom: 8px;font-size:13px;border-radius: 8px;padding: 8px;display: flex;flex-direction: row;justify-content: space-between;">${tags} </p>
        `}
        `).join('')}
    `
}
function editTag(e) {
    let container = e.currentTarget.closest('.click-to-edit')

    container.setAttribute('onEditing', 'true')

    if(e.currentTarget.getAttribute('data-isChoosed') === 'true') {
        e.currentTarget.setAttribute('data-isChoosed', 'false')
        e.currentTarget.style.background = 'white'
        // findTab.tag.splice(e.currentTarget.innerText,1)
    }
    else {
        e.currentTarget.setAttribute('data-isChoosed', 'true')
        e.currentTarget.style.background = 'rgb(253, 234, 215)'
        // findTab.tag.push(e.currentTarget.innerText)
    }
    // onEditing = true
}

function confirmChange(e) {
    let container = e.currentTarget.closest('.click-to-edit')
    let item = container.querySelector('.click-to-edit-list')
    let getID = parseInt(container.className.match(/\d+/g).toString())
    let findTab = currentTab.find(itm =>  itm.content.find(item => item.id === getID) ).content.find(itm => itm.id === getID)
    // phần sửa lại thẻ
    console.log(currentTab)
    findTab.tag.splice(0, findTab.tag.length)
    item.querySelectorAll('p').forEach(itm => {
            if (itm.getAttribute('data-isChoosed') === 'true') {
                let value = TagsHandler().find(itmm => itmm.trim() === itm.innerText.trim())
                if(value) {findTab.tag.push(value);console.log(findTab.tag)}
                else {findTab.tag.push(itm.innerText.trim()); console.log(findTab.tag)}
                console.log(value)
            }
        }
    )

    // Phần sửa ngày
    let inputDate = container.querySelectorAll('input')[0].value
    if(inputDate.length === 10){
        findTab.date = inputDate
    }
    // 
    // Phần sửa giờ
    let inputTime = container.querySelectorAll('input')[1].value
    if(inputTime.length === 5){
        findTab.time = inputTime
    }
    //
    // if(filtered) {
    //     dataCheck(renderFilterContent(filtered))
    // }
    let star = document.getElementById('star')
    if(star.classList.contains('fa-solid')){
        dataCheck(renderFilterContent(filtered))
    }
    else {
        dataCheck(renderFilterContent(currentTab))
    }
}

//định dạng input
function editDate(e) {
    let container = e.currentTarget.closest('.click-to-edit')
    let inputDate = container.querySelectorAll('input')[0]
    let inputTime = container.querySelectorAll('input')[1]
    if(inputDate.value.trim().length === 0){
        inputTime.value = ''
    }    
    // 
    let value = e.currentTarget.value
    if(value.length > 10) {e.currentTarget.value = value.slice(0,10) ;return }
    if(value.length === 2) {
        let daysValid = value.slice(0,2) < 31 && value.slice(0,2) > 0 && !value.match(/\D/);
        if(daysValid) {
            value += '/'
        }
        else {
            value = ''
            e.currentTarget.value = value
        }
    }
    else if(value.length === 5) {
        let monthValid = Number(value.slice(3,5)) < 13 && Number(value.slice(3,5)) > 0 && !value.slice(3,5).match(/\D/) ;
        if(monthValid) {
            value += '/'
        }
        else {
            value = value.slice(0,3)
            e.currentTarget.value = value
        }
    }
    else if (value.length === 10) {
        let yearValid = Number(value.slice(6,10)) < 10000 && Number(value.slice(6,10)) > 1000 && !value.slice(6,10).match(/\D/);
        if(!yearValid) {
            value = value.slice(0,6)
            e.currentTarget.value = value
        }
    }

    if(value.length > 2){
        if(value.charAt(2) !== '/'){
            value = ''
            e.currentTarget.value = value
            console.log('case 1')
        }
    }
    if(value.length > 6) {
        if(value.charAt(2) !== '/' || value.charAt(5) !== '/'){
            value = value.slice(0,3)
            e.currentTarget.value = value
            console.log('case 2')
        }
    }

    e.currentTarget.addEventListener('keydown', function (event) {
        backspaceFuncForEditing( event);
    }, { once: true }); 
    e.currentTarget.value = value
    // 
}

function backspaceFuncForEditing(e) {
    if(e.key === 'Backspace'){
    let value = e.currentTarget.value;
    if(value.length > 6){
        value = value.slice(0,6)
        e.currentTarget.value = value
    }
    else if(value.length >= 4){
        value = value.slice(0,3)
        e.currentTarget.value = value

    }
    else if (value.length < 4) {
        value = ''
        e.currentTarget.value = value
    }
    // 
    let container = e.currentTarget.closest('.click-to-edit')
    let inputDate = container.querySelectorAll('input')[0]
    let inputTime = container.querySelectorAll('input')[1]
    if(inputDate.value.trim().length === 0){
        inputTime.value = ''
    }    
    }
}



function editTime(e){
    let container = e.currentTarget.closest('.click-to-edit')
    let inputDate = container.querySelectorAll('input')[0]
    let inputTime = container.querySelectorAll('input')[1]
    if(inputDate.value.trim().length === 0){
        inputTime.value = ''
    }
    // 
    let value = e.currentTarget.value
    e.currentTarget.addEventListener('keydown', function (event) {
        backspaceFuncForEditing(event);
    }, { once: true }); 
    if(value.length > 2) {
        let minutesValue = value.slice(3,5) < 60 && value.slice(3,5) >= 0 && !value.slice(3,5).match(/\D/) && value.charAt(2) === ':';
        if(minutesValue ) {
            e.currentTarget.value = value.slice(0,5) ;return
        }
        else{
            value = value.slice(0,3)
        }
    }
    else if(value.length >= 2) {
        let timeValid = value.slice(0,2) < 25 && value.slice(0,2) > 0 && !value.match(/\D/);
        if(value.length === 2 && timeValid){
            value += ':'
        }
        else {
            value = ''
        }
    }
    e.currentTarget.value = value
}

function clickAddEventForEdit(e){
    e.currentTarget.addEventListener('paste', function (event) {
    event.preventDefault();
    });
    let container = e.currentTarget.closest('.click-to-edit')
    let inputDate = container.querySelectorAll('input')[0]
    let inputTime = container.querySelectorAll('input')[1]
    if(inputDate.value.trim().length === 0){
        inputTime.value = ''
    }
}

// Phần add theo nhóm cụ thể
// toggle để reset lại tên nhóm
let isNeedToReset

function addSpeciGroup (e) {
    let getIndex = parseInt(e.currentTarget.closest('.content-body--container').className.match(/\d+/g).toString())
    if(currentTab ) {
        isNeedToReset = false;
        let findGroup = currentTab[getIndex-1].group
        let currentTabGroup = document.querySelector('.currentTab-group')
        let group = document.querySelector('.groups-choose-navbar')
        let caret = document.querySelector('.groups-choose').querySelector('.fa-caret-down')
        let groupChoose = document.querySelector('.groups-choose')
        caret.style.display = 'none'
        group.style.display = 'none'
        groupChoose.style.pointerEvents = 'none'
        group.innerHTML = null
        currentTabGroup.innerHTML = findGroup
        addBtn()
        isNeedToReset = true
    }
}
// Phần load hết 1 lượt nội dung sau khi DOM chạy
window.addEventListener('load', () => {
    dataCheck(renderContent(data),data,'all');
    dataCheck(renderNext7DaysContent(Next7DaysData),Next7DaysData,'Next7DaysData');
    dataCheck(renderNext3DaysContent(next3DaysData),next3DaysData,'next3DaysData');
    dataCheck(renderTodayContent(todayData),todayData,'todayData');
    for (let i = 0; i < 7; i++) {
            document.getElementsByClassName("navbar-options-num")[i].setAttribute('isChecked', 'false')
            document.getElementsByClassName("navbar-options-num")[i].style.background = 'white'
            document.getElementsByClassName("navbar-options-num")[i].style.color = '#4D5761'
            document.getElementsByClassName("navbar-options-num")[0].setAttribute('isChecked', 'true')
            document.getElementsByClassName("navbar-options-num")[0].style.background = '#FDEAD7'
            document.getElementsByClassName("navbar-options-num")[0].style.color = '#EF6820'
        }
})
// phần test
const overlayy = document.getElementById("test-overlayy");
const mainContent = document.querySelector(".test-content");

let startY = 0;
let currentY = 0;
let dragging = false;
const minSwipeUpDistance = 120; 


overlayy.addEventListener("mousedown", (e) => {
  startY = e.clientY;
  dragging = true;
  overlayy.style.transition = "none";
  e.preventDefault(); 
});


window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  currentY = e.clientY;
  const deltaY = currentY - startY;

  if (deltaY < 0) {
    overlayy.style.transform = `translateY(${deltaY}px)`;
  }
});

window.addEventListener("mouseup", () => {
  if (!dragging) return;
  dragging = false;

  const totalDeltaY = currentY - startY;

  if (totalDeltaY < -minSwipeUpDistance) {

    overlayy.style.transition = "transform 0.4s ease";
    overlayy.style.transform = "translateY(-100%)";
    mainContent.classList.add("test-revealed");
  } else {

    overlayy.style.transition = "transform 0.3s ease";
    overlayy.style.transform = "translateY(0)";
  }

  startY = 0;
  currentY = 0;
});

