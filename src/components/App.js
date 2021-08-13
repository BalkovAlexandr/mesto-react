import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AppPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import api from '../utils/api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({
    isOpen: false,
    element: {},
  });
  const [renderSave, setRenderSave] = React.useState(false);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, element: card });
  }

  function handleDeleteCardClick(card) {
    setSelectedCardDelete({ isOpen: true, element: card });
  }

  function handleUpdateUser(userInfo) {
    setRenderSave(true);
    api
      .updateUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setRenderSave(true);
    api
      .setNewAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    setRenderSave(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function handleCardLike(card) {
    console.log(card);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    setRenderSave(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? false : true
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderSave(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setSelectedCardDelete({ ...selectedCardDelete, isOpen: false });
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <AppPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <DeletePlacePopup
          deleteCard={selectedCardDelete}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onDeleteCard={handleCardDelete}
          isRender={renderSave}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
