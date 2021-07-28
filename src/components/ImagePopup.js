function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.card.isOpen ? 'popup_opened' : false}`}>
      <div className="popup__container popup__container_type_image">
        <img className="popup__photo" src={props.card.element.link} alt={props.card.element.name} />
        <h2 className="popup__photo-title">{props.card.element.name}</h2>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
 )
}

export default ImagePopup;