/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SpeechRecognition from 'react-speech-recognition';
import axios from 'axios';
import { Offline, Online } from 'react-detect-offline';
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
    resetTranscript,
    recognition
  } = props;

  const [imgSrc, setImgSrc] = useState('');
  const [breedName, setBreedName] = useState('');
  const [error, setError] = useState(false);

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
  
    recognition.lang = 'en-US';
    
    if (!listening && finalTranscript !== '') {
      breed = finalTranscript.toLowerCase().split(' ');
      if (subBreeds.includes(breed[1])) {
        reqUrl = `https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images/random`;
      } else {
        reqUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
      }

      setBreedName(finalTranscript);

      const fetchData = async () => {
        try {
          const res = await axios(reqUrl);
          setImgSrc(res.data.message);
        } catch (err) {
          setError(true);
        }
        resetTranscript();
      };

      fetchData();
    }
  }, [listening, finalTranscript, resetTranscript]);

  return (
    <React.Fragment>
      {browserSupportsSpeechRecognition ? (
        <React.Fragment>
          <Online>
            <Container>
              <Row className="justify-content-md-center">
                <Col className="text-center">
                  <Button
                    size="lg"
                    type="button"
                    onClick={() => {
                      setBreedName('');
                      setError(false);
                      setImgSrc('');
                      startListening();
                    }}
                  >
                    Say a breed
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col className="text-center">
                  {error ? (
                    <h1>
                      The breed &lsquo;{breedName}&lsquo; could not be found.
                    </h1>
                  ) : (
                    <h1>
                      Show me a picture of a <br />
                      {breedName}
                    </h1>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  {imgSrc ? <img alt={breedName} src={imgSrc} /> : ''}
                </Col>
              </Row>
            </Container>
          </Online>
          <Offline>
            <h1
              style={{
                fontSize: '72px',
                color: '#dc3545',
                textAlign: 'center'
              }}
            >
              The app requires Internet access to work.
            </h1>
          </Offline>
        </React.Fragment>
      ) : (
        <h1 style={{ fontSize: '72px', color: '#dc3545', textAlign: 'center' }}>
          Your browser does not support the Web Speech API.
        </h1>
      )}
    </React.Fragment>
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
