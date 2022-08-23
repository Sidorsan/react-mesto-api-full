let date = new Date();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__content">© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
