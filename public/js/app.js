// ------------------------------- sidebar option script-----------------------------
const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    if (window.location.pathname.includes(item.getAttribute('data-page'))) {
        li.classList.add('active');
    }
    item.addEventListener('click', () => {
        sideLinks.forEach(el => el.parentElement.classList.remove('active'));
        li.classList.add('active');
    });
});

// ------------------------------------- user id toggle -------------------------------------
const mail_box = document.getElementById('mail_box');
const user_icon = document.getElementById('user_icon');
user_icon.addEventListener('click', ()=>{
    mail_box.classList.toggle('mail');
    mail_box.classList.toggle('flex');
})

// ---------------------------------sidebar menu toggle -------------------------------------
const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

//  ------------------------------------- search button ------------------------
searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

// ---------------------------------------- theme toggle -------------------------------------
const toggler = document.getElementById('theme-toggle');
const isNightMode = localStorage.getItem('dark') === 'true';
if (isNightMode) {
    document.body.classList.add('dark');
}

toggler.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Save night mode state to local storage
    const isNightModeNow = document.body.classList.contains('dark');
    localStorage.setItem('dark', isNightModeNow);
});
// ----------------------------------------cards dots btn -------------------------------------
const dotBtn = (idName,cardid,dotid) =>{
  const dotCls = document.getElementById(`${idName}`);
  dotCls.addEventListener('click' ,()=> {
    document.getElementById(`${cardid}`).classList.toggle('blur');
    document.getElementById(`${dotid}`).classList.toggle('dot-open');
  })
}

// ------------------------------------ Room creat scripts ---------------------------------
const room_Add = document.querySelector('.add-room');
const dash_main = document.getElementById('dash-main');
room_Add.addEventListener('click',()=>{
  dash_main.classList.toggle('add_room_form');
  document.getElementById('add_room_form').classList.toggle('dot-open');
})

