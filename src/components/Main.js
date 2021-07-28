import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <main className="container">
        <section className="profile page__center">
          <div className="profile__content">
            <div className="profile__pic">
              <img src={userAvatar} alt="аватар" className="profile__avatar" />
              <button className="profile__change-btn" type="button" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__row">
                <h1 className="profile__title">{userName}</h1>
                <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements page__center">
        {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick}/>)
          )}
        </section>
    </main>
  )
}

export default Main;