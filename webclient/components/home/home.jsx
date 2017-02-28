import React from 'react';
import {Link} from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Row, Col, Visible} from 'react-grid-system';

const styles = {
    title: {
        width:'100%',
        height: 400,
        margin: 0,
        background: '#009688',
        fontFamily: 'Georgia',
        fontWeight: 'normal'
    },
    h1:{
      fontSize:200,
      margin:0,
      textAlign:'center',
      fontWeight: 'normal'
    },
    p: {
        marginTop: 0,
        textAlign:'justify'
    },
    link:{
      color: 'white',
      textDecoration: 'none'
    },
    container:{
      marginTop:0,
      marginLeft: 50,
      marginRight: 50,
      fontFamily: 'sans-serif'
    }
};

export default class Home extends React.Component {

    displayTitle = () => {
        return (
            <div style={styles.title}>
              <Col lg={12} md={12} sm={12} xs={12}>
                    <Link to={'/welcome'} style={styles.link}>
                        <h1 style={styles.h1}>O</h1>
                        <h1 style={{fontSize:80, margin:0, textAlign:'center'}}>Oxygen 2.0</h1>
                    </Link>
              </Col>
            </div>
        );
    }

    displayCapabilities=()=>{
      return(
        <div style={styles.container}>
          <Row md={12} lg={12} sm={12} xs={12}>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Content Suggestion</h3>
              <p style={styles.p}>Suggests content for specified purpose and knowledge level.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Indexing</h3>
              <p style={styles.p}>Indexes the content to its usage based on purpose and also based on ontology.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Build and train ontology</h3>
              <p style={styles.p}>Build and train the ontology of a particular domain using Ontology Trainer.</p>
            </Col>
          </Row>
          <br/>
          <Row md={12} lg={12} sm={12}>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Visualize ontology</h3>
              <p style={styles.p}>View the ontology or the structure of a particular domain an it's corresponding resources.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Auto Sourcing</h3>
              <p style={styles.p}>Documents of a particular domain are sourced automatically when that domain is added.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Highly Scalable</h3>
              <p style={styles.p}>Oxygen is capable of handling high data rate and also huge number of web documents.</p>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Focussed Crawling</h3>
              <p style={styles.p}>Captures the meaning of web documents by extracting the semantic importance of the words in them.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Feed URLs manually</h3>
              <p style={styles.p}>Manual add URLs of the documents that you wish to add.</p>
            </Col>
            <Col md={4} lg={4} sm={12} xs={12}>
              <h3>Export data to RDF</h3>
              <p style={styles.p}>Easily export data to RDF, which is the widely used data schema.</p>
            </Col>
          </Row>
        </div>
      );
    }

    render() {
        return (
            <div>
                {this.displayTitle()}
                {this.displayCapabilities()}
            </div>
        );
    }
}