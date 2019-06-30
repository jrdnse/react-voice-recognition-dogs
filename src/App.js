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
    browserSupportsSpeechRecognition,
    startListening,
    finalTranscript,
    listening,
    resetTranscript
  } = props;

  const [imgSrc, setImgSrc] = useState('');
  const [breedName, setBreedName] = useState('');

  useEffect(() => {
    const subBreeds = [
      'bulldog',
      'bullterrier',
      'cattledog',
      'collie',
      'corgi',
      'dane',
      'deerhound',
      'elkhound',
      'frise',
      'greyhound',
      'hound',
      'mastiff',
      'mountain',
      'pinscher',
      'pointer',
      'poodle',
      'retriever',
      'ridgeback',
      'schnauzer',
      'setter',
      'sheepdog',
      'spaniel',
      'springer',
      'terrier',
      'wolfhound'
    ];

    let reqUrl;
    let breed;

    if (!listening && finalTranscript !== '') {
      breed = finalTranscript.toLowerCase().split(' ');
      if (subBreeds.includes(breed[1])) {
        reqUrl = `https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images/random`;
      } else {
        breed = finalTranscript.toLowerCase();
        reqUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
      }

      setBreedName(finalTranscript);

      axios
        .get(reqUrl)
        .then(res => setImgSrc(res.data.message))
        .then(resetTranscript());
    }
  }, [listening, finalTranscript, resetTranscript]);

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
          {imgSrc ? <img alt="dog" src={imgSrc} /> : ''}
        </Col>
      </Row>
    </Container>
  );
}

export default SpeechRecognition(options)(App);

App.propTypes = {
  finalTranscript: PropTypes.string,
  listening: PropTypes.bool,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  resetTranscript: PropTypes.func
};
