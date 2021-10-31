import React from 'react';
import Header from './Header';
import Main from './Main';
import Api from "../utils/Api";
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import { register, authorize, getContent } from '../utils/apiAuth';
import ProtectedRoute from './ProtectedRoute';
import AddPlacePopup from './AddPlacePopup';
import { UserInfoContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
    const [regError, setRegError] = React.useState(false);
    const [cardIdDelete, setCardIdDelete] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, title: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
    const [userData, setUserData] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('');
    const history = useHistory();
    const api = new Api({
        baseUrl: 'https://api.wownick.nomoredomains.work',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    React.useEffect(() => {
            if(localStorage.getItem('jwt')) {
                const jwt = localStorage.getItem('jwt');
                setToken(jwt);
                getContent(jwt).then((data) => {
                    setUserData(data.email);
                    setCurrentUser(data);
                    setLoggedIn(true);
                    history.push('/');
                })
                api.getInitialCards().then((res) => {
                    setCards(Array.from(res));
                })
                .catch((err) => {
                    console.log(err);
                })
            }
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card.card.cardId, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card.card.cardId ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete() {
        setIsLoading(true);
        api.deleteCard(cardIdDelete).then(() => {
            setCards((state) => state.filter((c) => c._id !== cardIdDelete));
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleUpdateUser(name, description) {
        setIsLoading(true);
        api.profileUpdate(name, description).then((userInfo) => {
            setCurrentUser(userInfo);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleUpdateAvatar(link, resetForm) {
        setIsLoading(true);
        api.profileAvatarUpdate(link).then((userInfo) => {
            setCurrentUser(userInfo);
            closeAllPopups();
            resetForm();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleAddPlaceSubmit(name, link, resetForm) {
        setIsLoading(true);
        api.addCard(name, link).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
            resetForm();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleOnRegister(password,email) {
        register(password,email).then(() => {
            history.push('/sign-in');
            setRegError(false);
        })
        .catch((err) => {
            console.log(err);
            setRegError(true);
        })
        .finally(() => {
            setIsInfoTooltipPopupOpen(true);
        });
    }

    function handleonAuthorize(password,email) {
        authorize(password,email).then((data) => {
            localStorage.setItem('jwt', data.token);
            setToken(data.token);
            setLoggedIn(true);
            history.push('/');
            setUserData(email);
            getContent(data.token).then((res) => {
                setCurrentUser(res);
            });
        })
        .catch((err) => {
            console.log(err);
            setRegError(true);
            setIsInfoTooltipPopupOpen(true);
        })
    }

    function handleOnSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
        setCurrentUser({});
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleMobileMenuOpen() {
        isMobileMenuOpen ? setIsMobileMenuOpen(false) : setIsMobileMenuOpen(true);
    }

    function handleDeleteCardClick(cardId) {
        setCardIdDelete(cardId);
        setIsDeleteCardPopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard({ isOpen: true, title: props.card.name, link: props.card.link });
    }

    function closeAllPopups() {
        isInfoTooltipPopupOpen ? setIsInfoTooltipPopupOpen(false) : isDeleteCardPopupOpen ? setIsDeleteCardPopupOpen(false) : isEditProfilePopupOpen ? setIsEditProfilePopupOpen(false) : isAddPlacePopupOpen ? setIsAddPlacePopupOpen(false) : isEditAvatarPopupOpen ? setIsEditAvatarPopupOpen(false) : setSelectedCard({ isOpen: false });
    }

    return (
        <UserInfoContext.Provider value={currentUser}>
            <div className="page">
                <Header eMail={userData} loggedIn={loggedIn} onSignOut = {handleOnSignOut} onMobileMenuOpen={handleMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen}/>
                <Switch>
                    <Route path="/sign-in">
                    {loggedIn ? <Redirect to="/" /> : <Login onAuthorize = {handleonAuthorize}/>}  
                    </Route>
                    <Route path="/sign-up">
                    {loggedIn ? <Redirect to="/" /> : <Register onRegister = {handleOnRegister} />}
                    </Route>
                    <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteCardPopup={handleDeleteCardClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike}>
                    </ProtectedRoute>
                </Switch>
                {loggedIn && <Footer />}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onLoading={isLoading} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onLoading={isLoading} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onLoading={isLoading} />

                <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} onLoading={isLoading} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} onError = {regError}/>

            </div>
        </UserInfoContext.Provider>
    )
}

export default App;