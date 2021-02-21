import "./style.css";
import Header from './js/components/header';
import Form from './js/components/form';
import Popup from './js/components/popup'
import { getNews, signUp, signIn, getMarkingArticles } from './js/utils/functions';

if (window.location.toString().indexOf('about')>0){
    const header = new Header();
    header.render({isLoggedIn: true, userName:localStorage.username});
    document.getElementById('owner').innerHTML=localStorage.username;
    getMarkingArticles()
}
else{
    const popupBlock = document.querySelector('.popup');
    const popup = new Popup(popupBlock);

    const header = new Header(popup);
    header.render({isLoggedIn: false, userName:''});

    const loginForm = new Form('form[name="login"]');
    loginForm.setEventListeners((e)=>{signIn(e,popup,header)})

    const signupForm = new Form('form[name="signup"]');
    signupForm.setEventListeners((e)=>{signUp(e,popup)})


    getNews('*');
    const searchForm = new Form('form.search__form');
    searchForm.setEventListeners((e)=>{console.log(e); getNews(e.query)})
}