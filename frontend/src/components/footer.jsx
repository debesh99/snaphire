const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start mt-auto">
      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright: 
        <a className="text-body fw-bold ms-1" href="https://snaphire.com/">
          Snaphire.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;