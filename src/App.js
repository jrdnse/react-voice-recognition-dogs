/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SpeechRecognition from 'react-speech-recognition';
import axios from 'axios';
import './App.css';

const options = {
  autoStart: false,
  continuous: false
};

function App(props) {
  const {
    transcript,
    browserSupportsSpeechRecognition,
    startListening,
    finalTranscript,
    listening,
    resetTranscript
  } = props;

  const [url, setUrl] = useState('');
  const [breedName, setBreedName] = useState('');

  useEffect(() => {
    if (!listening && finalTranscript !== '') {
      const breed = finalTranscript.toLowerCase();
      setBreedName(breed);

      axios
        .get(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => setUrl(res.data.message))
        .then(resetTranscript());
    }
  });

  if (!browserSupportsSpeechRecognition) {
    alert('your browser does not support the Web Speech API');
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <Button type="button" onClick={startListening}>
            Listen
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h1>Show me a picture of a {breedName}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <img alt="dog" src={url} />
        </Col>
      </Row>
    </Container>
  );
}

export default SpeechRecognition(options)(App);

App.propTypes = {
  transcript: PropTypes.string,
  finalTranscript: PropTypes.string,
  listening: PropTypes.bool,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  resetTranscript: PropTypes.func
};
