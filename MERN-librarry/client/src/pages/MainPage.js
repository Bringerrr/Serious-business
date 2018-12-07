import React from 'react';
import {Container} from 'reactstrap';
import './MainPage.css'

import Reviews from "../components/Reviews"

class MainPage extends React.Component {

    state = {
        modal: false,
        isLoading: true
    };

    render() {
        return (
            <Container>
              <h3>Recent reviews</h3>
                <Reviews 
                  filter={"main"} // values: main, individ
                />
            </Container>
        );
    }
}

export default MainPage;