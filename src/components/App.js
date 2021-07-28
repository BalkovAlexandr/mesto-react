import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});

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
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({...selectedCard, isOpen: false});
  }


  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
      <PopupWithForm
      title='Редактировать профиль'
      name='edit' 
      btnName='Сохранить'
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}>
        <input id="name-input" type="text" placeholder="Имя" className="popup__input popup__input_text_name" name="name" minLength="2" maxLength="40" required />
        <span id="name-input-error" className="popup__input-error"></span>
        <input id="job-input" type="text" placeholder="О себе" className="popup__input popup__input_text_job" name="about" minLength="2" maxLength="200" required />
        <span id="job-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
      title='Новое место'
      name='add-card' 
      btnName='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}>
        <input id="card-name-input" type="text" placeholder="Название" className="popup__input popup__input_add-card_name" name="name" minLength="2" maxLength="30" required />
        <span id="card-name-input-error" className="popup__input-error"></span>
        <input id="card-link-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_add-card_link" name="link" required />
        <span id="card-link-input-error" className="popup__input-error"></span>
      </PopupWithForm>

     

      <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      btnName='Да'>
      </PopupWithForm>

      <PopupWithForm
      title='Обновить аватар'
      name='change-avatar' 
      btnName='Сохранить'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}>
        <input id="change-avatar-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_change-avatar_link" name="link" required />
        <span id="change-avatar-input-error" className="popup__input-error"></span>
      </PopupWithForm>

   </div>
  );
}

export default App;
