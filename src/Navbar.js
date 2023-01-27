import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarTopper = ({ connect, connected }) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">JToken Exchange</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link
              className="text-white pb-1"
              href="https://jackwillis517.github.io/JacksWebsite/index.html"
            >
              My Portfolio
            </Nav.Link>
          </Nav>
          <Nav>
            {!connected ? (
              <Button onClick={connect}>Connect to Metamask</Button>
            ) : (
              <p className="pt-1 text-green-600">Connected to MetaMask</p>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTopper;
