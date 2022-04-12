import "bulma/css/bulma.min.css"
import { Container, Columns} from 'react-bulma-components'

import SignUpPage from './pages/SignUpPage'
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Container breakpoint={"fluid"}>
      {window.location.pathname === "/" && <HomePage />}
      {window.location.pathname === "/signup" && (
        <Columns.Column>
          <SignUpPage />
        </Columns.Column>
      )}
    </Container>
  );
}

export default App;
