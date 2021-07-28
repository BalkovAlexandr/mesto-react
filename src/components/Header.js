import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__center">
        <img className="logo" src={logo} alt="логотип" />
    </header>
  )
}

export default Header;